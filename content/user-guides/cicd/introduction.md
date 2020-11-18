---
title: Introduction
weight: 10
---

## Pre-requisites

The following links introduce terms used through out this section:

- [Key TNCO concepts](/key-concepts) introduce the Telco Network Cloud Orchestration (TNCO) programming model used to model VNFs and Network Services.

- [Assembly](/reference/descriptor-specification/assembly-descriptor) and [resource](/reference/descriptor-specification/resource-descriptor) specifications give detailed descriptions of how to model lifecycles in TNCO.

## Introduction

Cloud DevOps best practices and principles are at the heart of the TNCO solution. To scale any Cloud based networking program, a unified operations and engineering model is combined with a set of automation tools that can simplify and automate the complexities of an end-to-end VNF or Network Service lifecycle.

![NFV DevOps](/images/user-guides/cicd/overview/overview.png "NFV DevOps")

The TNCO CI/CD tools and processes are designed to simplify and automate the following DevOps tasks:

- **Onboard VNFs and design Network Services**: Quickly integrate and package the lifecycle actions required to operate a VNF or any virtual or physical network appliance.
- **Behaviour Testing in pre-production**: Deploy VNFs to pre-production environments and easily script complex operational behaviour tests to ensure the onboarded VNF behaves as expected in all "day 1" or "day 2" lifecycle tasks.
- **Deploy to production**: Once fully tested, auto deploy to production environments.
- **Monitor and Change**: Monitor and sense environmental or VNF state and auto scale, heal or move components of the network service.
- **Report and Resolve issues**: Errors in lifecycle actions or VNF software found in production are reported and trigger an upgrade process that rebuilds a new version of the VNF.

The [CI/CD Hub](https://github.com/accanto-systems/lm-cicdhub) wraps the core TNCO automation capabilities with tools that support the "day 0" VNF onboarding and testing processes and also the "day 2" VNF change management tasks.

The CI/CD Hub provides a set of tools that manage VNF and Network Services artifacts across the following NFV orchestration systems:

- **TNCO NFVO**: Packages of assembly descriptors and behaviour tests for network service versions are packaged and deployed to TNCO instances .
- **TNCO Generic VNFM**: Software Images, resource descriptors, lifecycle scripts and behaviour tests that wrap a VNF or PNF are packaged and deployed to TNCO and its resource managers.
- **3rd Party VNFMs**: External VNF artifacts are packaged and deployed to 3rd party VNFMs.
- **Virtual Infrastructure Managers**: VNF component software image versions are deployed to VIMs.

![CI/CD Solution](/images/user-guides/cicd/overview/architecture.png "Solution")

The picture above shows a complete TNCO CI/CD Environment. TNCO design tools create VNF/Network Service descriptors and behaviour test scripts, using a Git repository as their source version control. Supplemental artifacts such as VIM software images are stored in a general repository such as Nexus.

Versions of VNF and Network Service packages are taken from these repositories and built and tested in development and pre-production environments. A CI server, such as Jenkins, pulls TNCO artifacts from Git and deploys to TNCO build slaves, the CI server also pushes software images to the appropriate development or pre-production VIMs attached to the TNCO build slaves. Any included behaviour tests in the VNF or Network Service project are run by the CI server to validate this versions expected behaviour.

On successful completion of VNF or Network Service behaviour tests, the CI server uses TNCO tools to package a version of a binary VNF and Network Service package and stores it in the general repository.

The CI/CD Hub provides a set of open source software components that play the Git source control, general repository and CI server roles as defined above. The CI/CD Hub is a reference implementation intended to demonstrate how to implement a TNCO CI/CD pipeline, it is not a supported product. The CI/CD Hub can be used to run a production pipeline, or you can swap components out and use the tool of your choice, but the CI/CD Hub project is intended for demonstration purposes only.

The CI/CD Hub reference implementation provides installer scripts to stand up and attach the following software tools to your TNCO design and build slaves.

- **Git**: A lightweight [Gogs Git repository](https://gogs.io/) is installed as the descriptor and behaviour script source control server
- **Nexus**: [Nexus general repository](https://www.sonatype.com/nexus-repository-sonatype) is installed to provide a general image and package repository.
- **Jenkins**: [Jenkins CI Server](https://jenkins.io/) is installed to automate the package build and release processes.

A basic getting started guide and instructions how to run a "hello world" demo is also installed to the Gogs server. You can learn more about the CI/CD Hub software [here](/user-guides/cicd/software).

As stated above, development and build slave TNCO instances need to be in place and attached to the CI/CD Hub as appropriate, please follow TNCO installation guide and additional configuration detailed in the CI/CD Hub guide to "connect" TNCO instances:

- **TNCO Design Tools**: TNCO instances for designing descriptors combined with the [LMCTL command line tool](/reference/lmctl) push/pull VNF or Network Service projects to the CI/CD Hub Git repository.

* **TNCO Build Slaves**: TNCO instances can be configured to use the CI/CD Hub shared services, e.g. OpenLDAP and managed by the Jenkins CI Server to auto deploy, test and package VNFs or Network Services.

## VNF and Network Service Packages

The CI/CD Hub extends "standard" Cloud software toolchains with the [LMCTL tool](/reference/lmctl) that manages TNCO packages.

![VNF & NS packages](/images/user-guides/cicd/overview/packages.png "VNF & NS Packages")

The following packages need to be managed by the TNCO CI/CD process and tools:

- **Network Service Package**: Network service descriptors that organize VNFs are combined with behaviour tests.
- **Native VNF Packages**: VNF artifacts designed and built to be run in the TNCO VNFM.
- **Foreign VNF Packages**: VNF artifacts designed and built to be run on a 3rd party VNFM.

### Package Contents

VNF and Network Service packages can be versioned and distributed to TNCO environments. TNCO command line tools aid in the creation and management of these binary NFV packages.

The sections below give an overview of the types of packages included in the CI/CD process.

#### VNF Package

A VNF package can contain the following artifacts:

- **VNF Descriptor**: This assembly descriptor declares properties and values, organizes any children VNFCs and defines operations and policies.
- **VNFC resource descriptors**: This resource descriptor declares properties, supported lifecycle actions and any metrics produced by the VNFC
- **VNFC Lifecycle scripts**: Depending on the resource manager used to execute lifecycle actions, appropriate scripts or software is provided that "run" each supported lifecycle action.
- **VNF Behaviour tests**: TNCO behaviour tests are included that run the VNF and its VNFCs through a set of functional tests.

#### Network Service Package

A typical Network Service package will contain the following artifacts:

- **Network Service Descriptor**: This assembly descriptor declares properties and values, organizes any children VNFs and defines operations and policies
- **Network Service Behaviour tests**: TNCO behaviour tests are included that run the Network Service and its VNFs through a set of performance and operational interoperability tests.

### Package lifecycle

Network Service and VNF Packages have a simple state model.

- **Development**: VNF or Network Service engineers are in the early stages of package development and perform their own local testing.
- **Pre-Production/Test**: Packages are ready for exhaustive testing triggering a "build".
- **Production**: Packages have passed all exhaustive testing and have been deemed ready for production.

![Package Lifecycle](/images/user-guides/cicd/overview/packagelifecycle.png "Package Lifecycle")

The CI/CD methodology and process can handle packages in these various states appropriately. As seen above, Network Service package development are dependent on VNFs being in pre-production state or higher.

![Environments](/images/user-guides/cicd/overview/environments.png "Environments")

The picture above shows the types of environments and supplemental packages in a typical package workflow.

Onboarding/development tasks typically use shared local TNCO and virtual VIM environments to perform the initial creation of VNF or Network Service packages. In addition the engineer will typically create his/her own unit test style VNF packages that are used to test the target VNF or Network Service package behaviour is operationally correct.

In the pre-production/test stage, packages are moved to environment representative of the production environment. TNCO and VIM environments are typically dedicated to running performance and interoperability tests. The environments are owned by the automated pipeline.

Once fully tested, packages are available to be deployed to the Production environment.

### Test Packages

Behaviour testing a VNF or Network Service requires a set of Test VNFs be developed that run functional tests or generate and monitor traffic. Test VNF package lifecycles are identical to the VNFs under test, binary packages with versions are run through the same CI/CD process.

![Test Packages](/images/user-guides/cicd/overview/testpackages.png "Test Packages")

In addition to the Test VNF package that performs the actual test, a set of behaviour scripts are included with the test package that run a series of tests and evaluate of the behaviour reported by one of more test VNFs is as expected.

See [behaviour testing](/user-guides/behaviour-testing/overview) for more details

### VNF CI/CD Process

This sections lays out the VNF package lifecycle workflow.

![VNF Process](/images/user-guides/cicd/overview/vnfpipeline.png "VNF Process")

- **Load Images**: Upload one or more VNFC software appliance images to the general repository.
- **Create VNFC Lifecycle**: For each VNFC in the VNF, create a resource lifecycle and include the scripts or software that implement the standard lifecycle actions.
- **Create/Load VNF Package**: For native packages, create a new package version. For foreign packages load a version.
- **Create Test Packages**: Create the test packages that will test VNF behaviour.
- **Create or clean environment**: Create or clean a development or pre-production environment.
- **Load VNF package version**: Load the VNF under test into the target environment.
- **Load versions of test packages**: Load dependent test packages
- **Run test packages and store**: Run behaviour test and store the results.
- **Progress package to next state/stage**: On success create a binary package with a date and a version.

### Network Service CI/CD Process

This sections lays out the Network Service package workflow.

![Network Service Process](/images/user-guides/cicd/overview/servicepipeline.png "Network Service Process")

- **Design network service**: Design network service, including one of more VNF descriptors.
- **Create package version**: Create a network service package version.
- **Create Test packages**: Include test packages and behaviour tests that will evaluate the network service behaviour.
- **Create or clean environment**: Clean or create a development or pre-production environment.
- **Load dependent VNF packages**: Load the network service and all of its dependent VNF packages to the target environment.
- **Load version of test packages**: Load the test packages required to run behaviour scripts to the target environment.
- **Run Tests and store package on success**: Run network service behaviour tests and store the results.
- **Move package to next state/stage**: On success, create a dated version of the network service and store in the general repository.

## Next Steps and further reading

To get started with a new project see [getting started guide](/user-guides/cicd/getting-started).

To learn more about the CI/CD Hub software, read the [software overview section](/user-guides/cicd/software)
