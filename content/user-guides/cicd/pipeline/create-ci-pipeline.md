---
title: Create CI Pipeline
weight: 70
---

## Objectives

Create a continuous integration (CI) pipeline that will automatically build and test VNF or Network Service packages when changes are detected in Git projects. This CI pipeline will be triggered when there is a check-in to the master branch of the VNF or Network Service git project. 

### Pre-requisites

* All VNF and Network Services packages the VNF or Network Service project under development depends on for both testing and when it is released.

## Introduction

The CI pipeline will perform the following tasks:

1. Checkout the Git project to run for the VNF or Network Service project.
2. Upload all software images from Nexus to the target test environment.
3. Push all dependent VNF or Network Service packages to the target environment.
4. Push the project under development into the target environment
5. Run all included behaviour tests
6. If all tests pass: 
   1. A new package is created for the project in nexus. The version of the package is the same as the version in the descriptor of the VNF or Network Service under test.
   2. The project in git will be updated with the latest the version number

The package is then available for use in other projects.

## Create the Pipeline script

The following is an example Jenkins pipeline script that executes the steps in the previous section. The target Telco Network Cloud Orchestration (TNC-O) environment in the case below is called **testing**. 

Create a pipeline file name 'Jenkinsfile' at the top-level of your VNF or Network Service project. 

```
def descriptor = 'UNKNOWN'
def version = 'UNKNOWN'


pipeline{
    agent { label 'lmctl' }
    environment {
        ORGANISATION = 'marketplace'
        TEST_ENV = 'testing'
        GOGS_HOST = "${CICDHUB_GOGS_SERVICE_HOST}:${CICDHUB_GOGS_SERVICE_PORT_GOGS_HTTP}"
        NEXUS_URL = "http://${NEXUS_SVC_NODEPORT_SERVICE_HOST}:${NEXUS_SVC_NODEPORT_SERVICE_PORT_NEXUS_HTTP}"
    }    
    stages{
        stage('Onboard VNF and NS Project Dependencies'){
            steps{
                script 
                {
                    onboard_dependencies("test.deps")
                    
                    onboard_dependencies("release.deps")
                    
                } 	
            }
        }
        stage("Onboard Project"){
            steps{
                script{ 
                    /* get the descriptor name from the top-level assembly, that will be the package name */
                    descriptor = get_descriptor()
                    sh("echo ${descriptor}")
                    /* get version from top-level assembly. this is the version number to use for packaging */   
                    version =  get_version()
                    sh("echo ${version}")

                    /* Push the project into the test environment */
                    sh("lmctl project push ${TEST_ENV}" )
                }               
            }
        }

        stage('Behaviour Tests'){
            steps{
                sh "lmctl project test ${TEST_ENV}"
            }
        }

        stage('Version Project'){
            steps{

                version_project("${descriptor}", "${version}")
            }    
        }
        stage('Package'){
            steps{
                /* 
                  we have a new snapshot for this version, delete the old one and upload the new
                */
                withCredentials([usernamePassword(credentialsId: 'nexus-id', passwordVariable: 'NEXUS_PASSWORD', usernameVariable: 'NEXUS_USERNAME')]) {
                    sh "curl -X DELETE -v -u ${NEXUS_USERNAME}:${NEXUS_PASSWORD} ${NEXUS_URL}/repository/raw/packages/${descriptor}/${descriptor}-${version}-SNAPSHOT.tgz"
                    sh "curl -v -u ${NEXUS_USERNAME}:${NEXUS_PASSWORD} --upload-file ./_lmctl/_build/${descriptor}-${version}.tgz ${NEXUS_URL}/repository/raw/packages/${descriptor}/${descriptor}-${version}-SNAPSHOT.tgz"              
                }
            }
        }
    }
}

def get_descriptor()
{
    return sh(returnStdout: true, script:  "grep -E ^name:[[:space:]].*::.*::.* ${WORKSPACE}/Descriptor/assembly.yml |cut -d ':' -f4").trim()
}

def get_version()
{
    return sh(returnStdout: true, script:  "grep -E ^name:[[:space:]].*::.*::.* ${WORKSPACE}/Descriptor/assembly.yml |cut -d ':' -f6").trim()
}

def version_project(descriptor, version)
{
    /*
      Delete the tag if it exists already, we want to move it.
      Then tag this commit
    */
    withCredentials([usernamePassword(credentialsId: 'gogs-id', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
        sh("git config --global user.email 'jenkins@cicdhub.com'")
        sh("git config --global user.name 'Jenkins'")
        sh("git tag -d ${version} |true")
        sh("git push http://${GIT_USERNAME}:${GIT_PASSWORD}@${GOGS_HOST}/${ORGANISATION}/${descriptor} --delete ${version} |true")
        sh("git push ${GIT_URL} --delete ${version} |true")
        sh("git tag -a ${version} -m 'Jenkins' ${GIT_COMMIT} |true")
        sh("git push http://${GIT_USERNAME}:${GIT_PASSWORD}@${GOGS_HOST}/${ORGANISATION}/${descriptor} --tags")
    }    
}

def onboard_dependencies(dependency_filename)
{
    def n /* name of package */
    def v /* version of package */
    
    if (fileExists("${WORKSPACE}/${dependency_filename}")) 
    {
      def packages = readFile("${WORKSPACE}/${dependency_filename}").split('\n')
      for (int i = 0; i < packages.size(); ++i) {
        n = packages[i].split('-')[0].trim()
        v = packages[i].split('-')[1].trim()
        /*
          try to get a released package (without -SNAPSHOT suffix)
          if not try get a SNAPSHOT
        */
        
        if (package_exists("raw", "packages/${n}/${n}-${v}.tgz") == "0")
        {
            sh("wget ${NEXUS_URL}/repository/raw/packages/${n}/${n}-${v}.tgz")
            sh("lmctl pkg push ${n}-${v}.tgz ${TEST_ENV}")
            echo "onboarded  ${n}-${v}.tgz "               
        }
        else
        {
            sh("wget ${NEXUS_URL}/repository/raw/packages/${n}/${n}-${v}-SNAPSHOT.tgz")
            sh("lmctl pkg push ${n}-${v}-SNAPSHOT.tgz ${TEST_ENV}")
            echo "onboarded  ${n}-${v}-SNAPSHOT.tgz"                
        }
        
                                    
      }
    }
    
}

def package_exists(repo, package_name)
{
    response = sh(  returnStdout: true, 
                    script: "curl -X GET \"${NEXUS_URL}/service/rest/v1/search?repository=${repo}&name=${package_name}\""
                )
    echo "response: ${response}"
    status = sh( returnStatus: true,
                script: "echo \"${response}\" | grep ${package_name}")
    echo "status: ${status}"
    return "${status}"
}
```

Add the file to your local git repository and push to Gogs, by running the following commands.

```
$ git add .
$ git commit -m "added Jenkins file"
$ git push
```

## Configure the pipeline in Jenkins

The newly created pipeline needs to be added to Jenkins and configured to auto-trigger when changes are detected in Gogs. First we add the pipeline from our VNF or Network Service project to Jenkins, by running the following steps. 

1. In the Jenkins home page select 'New Item'
3. Enter the name of the VNF (or Network Service), Select 'Pipeline' and press 'OK'
4. Check 'discard old builds' and 'Do not allow concurrent builds'
5. Gogs Webhook: Use Gogs secret set to 'gogs'
6. Pipeline Definition, select 'Pipeline script from SCM'
7. SCM: Git
8. Add the repository URL of your project from Gogs.
9. Credentials drop list select 'jenkins'
10. Script Path, set the name of your Jenkinsfile (if different)
11. Save

## Configure Gogs Webhook

Gogs Webhooks must be configured to trigger Jenkins to run the pipeline file configured earlier. To do this run the following tasks.

1. Login in to Gogs 
2. Browse to your project and select 'settings' then 'Webhooks'
3. Select 'Add Webhook' - 'Gogs'
4. Enter 'Payload URL'. this will be of the form ```http://<jenkins_host>:<jenkins_port>/gogs-webhook/?job=<your jenkins job name>```
5. Secret enter 'gogs'
6. Leave all other defaults and press 'Add Webhook'
7. Select the 'pencil' edit but on your new Webhook. At the bottom of the section, Press 'Test Delivery' If this succeeds in Gogs, then go to your project in Jenkins. You should see a job has been started.

## Configure your project dependencies

The pipeline jobs in Jenkins needs some additional information to know what packages must be loaded to run any tests (e.g. test VNFs or Network Services) if using the example pipeline scripts.

For packages only needed to support testing create a file named **test.deps** containing a list of the package names and versions separated by a space on each line of the file. 

{{%note %}}
NOTE: Do not add the '-SNAPSHOT' extension. This file must be named 'test.deps'
{{%/note %}}

Below is an example **test.deps** file containing some dependent VNF packages required for running the complete VNF or Network Service and its behaviour tests:
```
traffic_generator 1.0
traffic_probe 1.1
```
The pipeline job will push traffic_generator-1.0-SNAPSHOT.tgz and traffic_probe-1.1.tgz into the 'testing' environment.

For packages that the project depends on when released (e.g. VNFs or other Network Services contained in a Network Service design) create another file named **release.deps** with the list of dependent ```<name> <version>``` packages. This may be a subset of the packages in **test.deps** files since it will not include any packages needed only for testing.

Both files must be updated as your dependencies (including versions) change.



