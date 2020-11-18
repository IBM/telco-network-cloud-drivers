---
title: CI/CD Hub Software Overview
weight: 0
---

## CI/CD Hub

The CI/CD Hub is a reference deployment of a best practice suite of Continuous Integration and Continuous Delivery (CI/CD) tools. These collectively providing an infrastructure for Assembly and Resource package and descriptor development, release and distribution management. It leverages common, open source, third party tools augmenting Agile Lifecycle Manager (ALM) specific tools to enable an integration with one or more ALM instances as part of a holistic CI/CD environment. This spans multiple environments such as Dev, Preprod/staging and Production but it is not limited to these.

The integration of ALM with a CI/CD process does such as CI/CD Hub neither productizes nor mandates the set of third party tools it deploys. Indeed the CI/CD Hub does not provide these tools, rather it simplifies there installation. The selection of these tools does not prohibit any or all of their functions being realized using a number of other commercial or open source tools. Nor does their inclusion constitute an endorsement.

Maintenance of the environment post installation falls outside the scope of the CI/CD Hub, excluding the set of ALM specific tools (e.g LMCTL)

At the core of CI/CD process for ALM are 6 components:

  * Source Version Control Server
  * Artifact Repository 
  * Build Automation Server
  * LDAP Authentication & Authorization Server
  * ALM command line tools
  * A local, designer/developer git repository 

The CI/CD Hub realize these using the following;

  * [GOGs](https://gogs.io)
  * [Nexus](https://www.sonatype.com/nexus-repository-sonatype)
  * [Jenkins](https://jenkins.io)
  * [OpenLDAP](https://www.openldap.org)
  * [LMCTL](https://pypi.org/project/lmctl)


Collectively, these constitute a CI/CD environment. With the exception of [LMCTL](https://pypi.org/project/lmctl/2.0.4), the remainder are third part tools.

An additional requirement exists for Designers/developers to have local [git](https://git-scm.com) which is installed on a Developers local machine. THis differs from the remainder which are all deployed in a CI/CD server. As such it falls outside the remit of the CI/CD Hub. 

![CI/CD Hub Overview](/images/user-guides/cicd/software/overview.png "CICDHub Overview")

## Administration & Installation
### Prerequisites

The CI/CD Hub suite of tools are by default installed on a single server by the provided scripts. This should be provisioned with sufficient resources to fulfill the projected demand on the system. Of particular importance is the amount of storage

For the destination server, the server hosting the CI/CD Hub, the following system requirements exist

* A suitable Ubuntu Linux server on which to install the CI/CD Hub
  * Hardware
    * Storage
      * Min 2TB disk space ( Actual amount will be a function of the data that will be stored in in GOGs and Nexus)
    * Memory
      * Min 12GB RAM (a test install will work with as little as 4GB but it will not support many users)
    * Compute
      * Min 4 cores
  * OS
    * Ubuntu 16.0.4 or later is currently the only supported OS
  
* Computer from which an install of the CI/CD Hub is being performed (the host machine)
  * Hardware
     * No specific hardware requirement are identified. It is only used during the install and any reasonably spec
  * Software
    * Ansible
    * Python
    * sshpass (conditional)

Additional dependencies may also exist. The readMe.md and bhsaidfugidsfg of you specific CI/CD Hub installer should be consulted for fuller details.

### Components

The CI/CD Hub realized the core components with the following;

#### OpenLDAP -- LDAP Authentication & Authorization Server
An open source LDAP server. Each ALM instance needs to be configured with an LDAP server so that UI and API users can be authenticated and to identify the RBAC roles associated with that user. In an environment with multiple ALM deployments it is beneficial to have a single LDAP server where users are defined and their individual roles for each ALM environment are defined. This reduces the cost of administrating users. 

#### GOGs -- Source Version Control Server
A lightweight self hosting Git service, source code repository equivalent to GitHub. Within the CI/CD Hub it is used as a common managed repository CI/CD source repository for Assembly and Resource projects. Common, refers to the fact that it is not associated with any one ALM instance, rather it is the . It is important to understand that this is not a persistence layer for ALM itself. Gogs is intended as the source of truth for packages and descriptor that can be shared from this central location across all ALM instances.

#### Nexus -- Artifact Repository
An open source repository manager. Nexus is used to store static artifacts such as images for Resources and where binary Assembly Packages packages are stored for use in other projects or deployment into production environments.

#### Jenkins -- Build Automation Server
An open source Automation/build server  that automates the CI/CD pipeline tasks. You will create jobs for NS and VNF project in jenkins.

#### LMCTL -- ALM command line tools
A ALM specific tool used to integrate ALM with the CI/CD Hub. It is used to support both the movement of data both from the CI/CD Hub to ALM and vice a versa. Allowing the managed design and  deployment of Assemblies, Resources to one of a number of registered ALMs. 

### Installation if the CI/CD Hub
#### How to obtain the CI/CD Hub
The [CI/CD Hub](https://github.com/accanto-systems/lm-cicdhub) is available on [GitHub](https://github.com/accanto-systems/lm-cicdhub) from where it can be downloaded. Once downloaded, it can be unbundled and run on a suitable environment.

#### Installation Instructions
The CI/CD Hub installation is achieved by following the instructions in [Install Instructions](/installation/cicdhub/cicd-hub-start/) and using the [CI/CD Hub](https://github.com/accanto-systems/lm-cicdhub) download

You will need the url and admin credentials to log into each of the CI/CD Hub components:

  * Git Server (Gogs)
  * artifact Repo (Nexus)
  * CI Server (jenkins)
  * Dev Env (ALM and VIM)
  
## Third-Party Tools
As can be seen, the CI/CD Hub deploys a number of third party tools to construct a CI/CD environment. Each of these tools are owned and published by third party companies.

### Licencing
Each of the third party tools deployed with the CI/CD Hub installer is subject to its own licencing. The versions installed by the CI/CD Hub installer are all open source and subject to one or more of the following licenses at the time of writing;

* GNU General Public License version 2.0
* Apache License Version 2.0,
* MIT License
* sonotype oss licence

### Support
The CI/CD Hub does not productize these third party tools. Rather it simplifies there installation. The selection of these tools does not prohibit any or all of their functions being realized using a number of other commercial or open source tools. Nor does their inclusion constitute an endorsement. 

### Maintenance

The CI/CD Hub installer is provided to facilitate the a rapid and consistent deployment of a CI/CD environment. 

{{%note %}}
NOTE: once installed the onus is on the hosting company to maintain the set of tools, keeping them patch current and secure.
{{%/note %}}

The ALM team will, on a best effort basis maintain the CI/CD Hub on GitHub and we encourage the wider community to contribute to the project to both maintain and evolve the set of deployment scripts. 


### Backup and restore of repository content
Gogs, Nexus and the OpenLDAP instance have persistent store. These should be backed up in accordance with the backup policy of your organization. Each tool provides a mechanism for backing up their contents which is documented in the official documentation for the individual products. These should be consulted and incorporate into your restore procedures as appropriate.

  * [GOGs](https://gogs.io)
  * [Nexus](https://www.sonatype.com/nexus-repository-sonatype)
  * [Jenkins](https://jenkins.io)
  * [OpenLDAP](https://www.openldap.org)
  
#### Restore
As for backup, the restore procedure for individual products within the CI/CD Hub suite of tools is documented by each tools official documentation. These should be consulted and incorporate into your restore procedures as appropriate.
