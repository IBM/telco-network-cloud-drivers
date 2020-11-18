---
title: CI/CD Pipeline demonstration
weight: 120
---

# Objectives

This working demonstration showcases Agile Lifecycle Manager (ALM) automated CI/CD capabilities. The demo will show the following

- Automated triggering of Network Service or VNF build from a Git project source change.
- Creation of a pre-production environment and all VNF or test dependencies required to run the updated Network Service.
- Automated behaviour testing of the updated Network Service
- On success the network service binary package is built with an appropriate version number and stored in Nexus

## Pre-requisites

- [Have read the CI/CD Hub Introduction](/user-guides/cicd/introduction)
- [Working CI/CD Hub and ALM environment](/installation/installation/)
- [Install local LMCTL](/reference/lmctl)
- [Working Docker Environment to run VNFs](https://github.com/accanto-systems/docker-environment)

# Installing the Demo

1. Clone the Agile Lifecycle Manager (ALM) demo artifacts from GitHub to your local machine

2. On your local machine run the following commands:

```
mkdir cicd-demo
cd cicd-demo
git clone https://github.com/accanto-systems/marketplace
```

3. Copy the following script to your local machine and run it in the **cicd-demo** directory. This will load all required demo packages into nexus to prepare your environment to run the rest of the demonstration. Make sure to change **<<YOUR NEXUS ADDRESS>>** and user/password credentials in the script to point to your CI/CD Hub environment.

```
#!/usr/bin/env bash
NEXUS_URL="http://<<YOUR NEXUS ADDRESS>>:8002/repository/raw/packages"
NEXUS_CREDENTIALS="<<USER:PASSWORD>>"
TEST_ENV=test


function build {
	name=${1}
	version=${2}
	type=${3}
	cd ./marketplace/${type}/${name}
	lmctl project build
	cp ./_lmctl/_build/${name}-${version}.tgz ../../../packages
	cd ../../..
}

function upload {
	name=${1}
	version=${2}
	package=${name}-${version}.tgz
	echo uploading ${package}-${version} package to nexus and push to ALM environment named ${TEST_ENV}
	curl -v -u ${NEXUS_CREDENTIALS} --upload-file ./packages/${package} ${NEXUS_URL}/${name}/${package}

}

function set_up {
	build $1 $2 $3
	upload $1 $2
}

function create_ns_project {
	source="./marketplace/network-services/voice-service"
	target="./voice-service"

	mkdir -p ./packages
	mkdir -p ${target}

	cp -r ${source}/Behaviour ${target}
	cp -r ${source}/Descriptor ${target}
	cp ${source}/lmproject.yml ${target}
	cp ${source}/.gitignore ${target}
}

create_ns_project

set_up chaos-monkey 1.0 vnfs
set_up network 1.0 vnfs
set_up ip-pbx 1.0 vnfs
set_up sip-performance 1.0 vnfs
set_up sip-traffic-manager 1.0 vnfs
set_up voice-load-generator 1.0 network-services
set_up voice-overlay-networks 1.0 network-services
set_up voip-gateway 1.0 vnfs

```

4. Run the script in your **cicd-demo** directory:

```
  chmod +x ./setup_demo.sh
  ./setup_demo.sh
```

5. The script will create a voice-service directory which is the start of the network service the demonstration is based upon. Run the following commands to create a new local git project.

```
  cd ./voice-service
  git init
  git add .
  git commit -m 'initial project'
```

6. Create a new project for this voice service on the CI/CD Hub Git Server (Gogs), by performing the following tasks

   - Go to Gogs UI
   - log in as an admin user
   - create "+ New Repository" named the same as your local project (e.g. "voice-service")
   - select the organization (for this demo, you should use: 'marketplace')
   - Note the commands that Gogs gives you for 'Push an existing repository from the command line' and use them in the next step.
   - Push project to Gogs from your local machine:

```
  git remote add origin http://<YOUR_GOGS_ADDRESS>:8001/marketplace/voice-service.git
  git push -u origin master
```

7. Create a git develop branch

```
  git checkout -b develop
```
   - On Gogs UI, go to the project, select settings and collaboration
   - 'Add New Collaborator' for the Jenkins user and any user you wish to be able the make changes.

8. Set up the CI Pipeline for Jenkins by following the [create CI pipeline](/user-guides/cicd/pipeline/create-ci-pipeline) instructions. The pipeline uses dependency files to determine what packages are used by the project. For this demo, create the following test.deps and release.deps file in your ./voice-service project directory:

   - ./voice-service/test.deps:
```
network 1.0
ip-pbx 1.0
sip-performance 1.0
sip-traffic-manager 1.0
voice-overlay-networks 1.0
voice-load-generator 1.0
voip-gateway 1.0
```
   - ./voice-service/release.deps:
```
network 1.0
ip-pbx 1.0
voice-overlay-networks 1.0
voip-gateway 1.0
```

9. Set up Release and Deployment Pipeline in Jenkins:

10. Follow the [create Release and deployment pipeline](/user-guides/cicd/pipeline/create-release-pipeline) instructions to create a pipeline that will make the voice-service project a released package that can be used in production.

# Run Demo Scenario

![Demo Scenario](/images/demos/cicd/scenario.png "Demo scenario")

You should now be ready to run the demo. Installing the demo has:

- Created a network service project called 'voice-service' in git on a branch called 'develop'
- Uploaded VNF and NS packages used by 'voice-service' to nexus
- Created a Jenkins pipeline job to build, test and package 'voice-service' when there there is a git push to the 'master' branch.
- Created a Jenkins pipeline job to build a release package for 'voice-service' and push to production environments

## Demo Steps

### Look at environment before CI pipeline triggered

1. Log into the pre-production/test ALM UI and see there are no designs, ALM is 'clean' and ready to test
2. Log into Nexus and browse to raw/packages. You will see the dependent VNF and Network Service packages, but there is no 'voice-service' package.
3. Log into Gogs and browse to marketplace/voice-service. Note there are no 'releases' yet.

### Trigger the CI Pipeline

1. Make a change to your voice service project. Open ./voice-service/Descriptor/assembly.yml in an editor and change the second line 'description: Voice Service' to 'description: Scalable Voice Service'
2. Save the change and commit change to git:

```
git checkout develop
git add .
git commit -m 'updated voice service description'
```

3. You have now made changes, tested them locally in your dev environment. Now you want submit your changes so others can use or test 'voice-service'. You need to merge on the master branch:

```
git checkout master
git merge --no-ff develop -m 'validate version'
git push
```

4. Monitor pipeline automation
	- Log into Jenkins dashboard, you will see the voice-service job has been triggered. Click on the job and you will see the process stepping through the stages.
	- Log into ALM UI and see the designs appear, 'including assembly::voice-service::1.0'
	- When the pipeline gets to the testing step in Jenkins, go back to ALM's UI and open the assembly::voice-service::1.0 design, then the 'Behaviour Testing' tab at the bottom of the screen. Open the 'Results' and you will see the testing in progress.
	- When the test completes, the pipeline will build the binary package for 'voice-service' and upload it to nexus. On the nexus UI, look in raw/packages/voice-service. You will the voice-service-1.0-SNAPSHOT.tgz. In Gogs browse to the project and you will see there is now a '1.0' release.

5. Clean up after demo (ready to run demo again)
	- On ALM UI, delete all assemblies from the Assembly Designer.
	- Log into Nexus as admin and delete raw/packages/voice-service
