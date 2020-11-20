---
title: Create New Project
weight: 50
---

## Objectives

Create a new VNF or Network Service project that will hold all of its descriptor, test and lifecycle script artifacts.

### Pre-requisites

* Access to a CI/CD Hub and a development environment with a Lifecycle Manager and VIM
* Design details of the new VNF or Network Service.

* VNFCs or VNFs it will contain (name and version)
* Software Images associated with each VNFC. (There may be multiple images for each target VIM type, e.g. OpenStack or k8s)

## Set-up a new local project

For a sample set of network service and virtual network function examples: [Marketplace](https://github.com/accanto-systems/marketplace)

To create a new project, a directory containing the package structure will be crated first on your local machine. For convenience the local directory structure can be created with the LMCTL command line tool and filled in later with the VNF or Network Service artifacts.

{{%note %}}
NOTE: The project name should NOT  contain '-' as a separator in the name (this is not a restriction on Telco Network Cloud Orchestration (TNC-O), but simplifies pipeline automation later)
{{%/note %}}

To create a new VNF run the following **LMCTL** command: 
```
$ lmctl project create --name <<YOUR_VNF>> --version 0.1 --servicetype VNF --vnfc <<VNFC1>> --vnfc <<VNFC2>> <<YOUR_VNF_DIR>>
```

Replace <<YOUR_VNF>> and <<YOUR_VNF_DIR>> with the name of your new project and the name of the directory you want to create with the package structure in it. For each VNFC contained within your VNF, keep adding --vnfc <<VNFC_NAME>> options, and their structure will be templated into the new package directory. 

To create a new Network Service run the following **LMCTL** command:

```
$ lmctl project create --name <<YOUR_NS>> --version 0.1 --servicetype NS <<YOUR_NS_DIR>>
```
A Network Service package directory structure with the name <<YOUR_NS>> will be created in the directory <<YOUR_NS_DIR>>.

{{%note %}}
NOTE: The following steps are workarounds. The project descriptor needs a description property to be valid, and some extra directories for the Behaviour tests (replace myvnf with your project name):
{{%/note %}}

```
$ echo "description: Brief description" >> ./<<YOUR_VNF_DIR>>/Descriptor/assembly.yml
$ mkdir -p <<YOUR_VNF_DIR>>/Behaviour/Tests
$ mkdir -p <<YOUR_VNF_DIR>>/Behaviour/Templates
```

If you are creating a VNF and assuming you are using the [Ansible RM](https://github.com/IBM/osslm-ansible-resource-manager), each VNFC contained in the newly created VNF project will need to have the following base structure to capture each VNFCs ansible lifecycle scripts:

```
  VNFCs
  ├── <<VNFC1>>
      ├── descriptor
      │   └── <<VNFC1>>.yml
      ├── lifecycle
      │   ├── Configure.yml
      │   ├── Install.yml
      │   ├── Integrity.yml
      │   ├── Start.yml
      │   ├── Stop.yml
      │   └── Unistall.yml
      └── Meta-Inf
          └── manifest.MF
```
Download the following bash script and run it with the name, version and location of your project directory. It will then create the structure above with minimal content 

```
#!/usr/bin/env bash
name="$1"
version="$2"
location_dir="$3"

#  Create Directories
cd ${location_dir}
mkdir -p ${name}/descriptor
mkdir -p ${name}/lifecycle
mkdir -p ${name}/Meta-Inf

# Create manifest file
echo "name: ${name}
version: ${version}
resource-manager: ansible" > ${name}/Meta-Inf/manifest.MF

# Create miminal descriptor
echo "name: resource::${name}::${version}
description: ${name} vnfc" > ${name}/descriptor/${name}.yml

# Create (empty) lifecycle playbooks
echo "---" > ${name}/lifecycle/Install.yml
echo "---" > ${name}/lifecycle/Unistall.yml
echo "---" > ${name}/lifecycle/Configure.yml
echo "---" > ${name}/lifecycle/Start.yml
echo "---" > ${name}/lifecycle/Stop.yml
echo "---" > ${name}/lifecycle/Integrity.yml
```
The above steps do not have to be performed for a Network Service package.

## Commit the package

Next step is to create a local git project and commit the changes you have made. You can run the following commands on you local machine to do this. 

```
$ cd <<YOUR_VNF>>
$ git init
$ echo "_lmctl"  > .gitignore
$ git add .
$ git commit -m 'initial project'
```

## Create the project on Git Server (Gogs) 

To share your project and to attach it to the CI Server, you need to push it to Gogs. 

  * log in to Gogs
  * Create "+ New Repository" with the same name as your local project (e.g. <<YOUR_VNF>>)
  * Select the organization (e.g.  'marketplace')
  * Note the commands that Gogs gives you for 'Push an existing repository from the command line' and use them in the next step.

Push project to Gogs, on your local machine:

```
$ git remote add origin http://<GOGS ADDRESS>/<<YOUR_VNF>>.git
$ git push -u origin master  
```
Create git develop branch

```
$ git checkout -b develop
```
In Gogs, go to the project you have just created and select settings and collaboration. **Add New Collaborator** for _**Jenkins**_ and any user you wish to be able the make changes to the new project.

You are now ready to start developing and testing your new project.

