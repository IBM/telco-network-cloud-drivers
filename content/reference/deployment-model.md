---
title: Deployment Model
weight: 0
---

# Introduction

This section introduces the deployment architecture and main configuration options for Telco Network Cloud Orchestration (TNC-O) for a typical CI/CD configuration. It is expected that multiple ALMs will be deployed to automate the various tasks for each stage of the CI/CD process. Each set of LMs are coordinated around a repository of artifacts representing the external resources under management. The picture below shows a typical deployment. [See here for more information on a typical TNC-O CI/CD process.](/user-guides/cicd/introduction)

![Logical Deployment Architecture](/images/reference/deployment-model/deployment-overview.png "TNC-O Logical Deployment Architecture")

The following logical functions are typically deployed together to deliver a complete CI/CD pipeline:

- **CI/CD Hub:** This provides a set of source code, image and package repositories required to develop and publish all resource and assembly artifacts. Combining the repositories with a CI server and [TNC-O command line tools](/reference/lmctl) automates the end to end pipeline.
- **Development TNC-O Environment:** A lightweight flavour of TNC-O can be deployed on a laptop or standalone server. This is designed to accelerate early resource onboarding and development. This flavour is not for production use.
- **Test TNC-O Environment:** The default flavour of TNC-O deploys a single set of micro service instances, typically used as a build slave or test environment.
- **Production TNC-O Environment:** HA configuration of TNC-O is provided to deploy multiple micro service instances high performance and availability scenarios.
- **External LDAP:** All TNC-O instances can be configured to use the same LDAP server, whether it is the OpenLDAP instance provided with the CI/CD Hub an existing LDAP server.

Each TNC-O environment will also require a working [Resource Manager](/reference/resource-manager/interface-architecture).

# Development and Production

_Production_ TNC-O environments must be installed to an existing kubernetes cluster using Helm. However _Development_ TNC-O environments can either be deployed to an existing kubernetes cluster or using an [Allinone](https://github.com/accanto-systems/lm-allinone) installer a fully working lightweight deployment can be deployed on a minimal linux server or virtual machine.

![Logical Deployment Architecture](/images/reference/deployment-model/dev-or-prod.png "Development and Production deployments")

The Allinone TNC-O deployments can be run on a standalone server or a laptop and can interact with a CI/CD Hub to do early resource development.

# Deploying across multiple clusters

The TNC-O environments required to deliver a complete CI/CD pipeline can be deployed to a single kubernetes cluster or individual TNC-O environments can be deployed to separate kubernetes clusters.

![Multiple Clusters](/images/reference/deployment-model/clusters.png "Multiple Clusters")

If deploying more than one TNC-O environment to the same kubernetes cluster, consideration must be take for namespace and port conflicts. Also it is recommended a reverse proxy or a domain name server is used in front of the kubernetes clusters to access each individual TNC-O instance.

# Cluster storage configuration

For production deployments a kubernetes storage class can be provided or the default will be used. For Development Allinone deployments, no storage class is required. A development Allnone environment ties down the kubernetes version and common options to make the footprint as small as possible.

![Storage](/images/reference/deployment-model/storage.png "TNC-O Storage configuration")

# How to design your Lifecycle Manager Deployment

When designing your deployment there are a number of things that need to be taken into consideration. Some will be specific to your environment and to corporate policies, as such they may not be covered. Others are more universal and we will consider them here.

Typically an TNC-O deployment will have the following environments:

- Design -- One or more design environments
- Preproduction/Staging -- One or more test environments
- Production -- The destination for released descriptors

Binding the individual TNC-O Deployment Environments is the CI/CD Hub. This provides a common, secure, resilient and managed repository for all the artifacts of projects from which they can be deployed as required.

A typical deployment will have all three environments;

![deploymentEnvs](/images/reference/deployment-model/deploymentEnvs.png "TNC-O deploymentEnvs")

### Use of namespaces

Namespaces can be a useful tool to allow the use of a single cluster to be used to support the deployment of multiple TNC-O environments while maintaining isolation.
This can potentially allow

In some cases customers chose to have a single TNC-O env on the production cluster to ensure full isolation and the provision of the maximum set of cluster resources to the production instance.

### LMCTL

LMCTL is typically present on a Jenkins slave to aid the CI/CD environment. However in the case of a designer where they are working from a local version control repository (git) then the designer will likely have their own LMCTL installed on the local machine for deployment to their development/design environment. This removes the burden of maintaining the full set of environments within the CI/CD Hub which can be somewhat onerous when an ephemeral design env model is adopted.

## Design

When engineers are designing resource and assembly descriptors and packages they will need to have access to an TNC-O instance where they can perform testing. For individual designers the TNC-O environment will ideally need to be connected to a deployment location on which the descriptors can be tested.

The advantage of having multiple environments is that designers are able to debug assembly packages and perform destructive testing isolated from other users.

It is possible to spin up a design environment for specific cases and by connecting it to the CI/CD environment publish the results to make it available to other users. This has the advantage of allowing a user to have a repeatable, clean environment in which design and testing is performed. The cost of the TNC-O design deployment is relatively low. The higher cost is likely to be in having an environment to which resources can be deployed during this phase.

At the higher end of cost is where each developer has their own deployment location. This provides the most isolation. However typically this is not required and individual developer/designer tenancies/projects in a shared VIM is sufficient allow developers to remain isolated.

The number of design environments required is a function of how many designers an organization has have and the nature of their work and is likely change over time potentially scaling down after the first phase of TNC-O adoption.

A design environment will typically be a small allinone deployment. This is particularly true if an organization chooses to provide designers

It is imperative that in cases where unique ephemeral environments are used for individual designers that a CI/CD Hub be deployed as a shared resilient repository across

## Pre-production/ Staging

The pre-production environment which can be used for a number of functions

    - Performance of consistent/certification testing as part of the CI/CD process
    - Production behaviour is reproduced
    - What if testing

In the use cases for TNC-O a mirror of production can be difficult to attain. While the deployment of TNC-O itself can be mirrored without issue the number and type of deployment locations/VIMs can be a prohibitive and impractical cost in many of not most applications.

A pre-production environment may be either a full replica of Production or a scaled down version. It will be fully functional but may for example omit High Availability and the capacity of a production environment.

## Production

Production is the final environment this should be commensurate with the projected near to medium timescale requirements of the specific deployment. The number of assembler's and their complexity both in terms of the number of resources and ultimately the projected number of TNC-O transactions it will perform will determine how large it should be.

A production environment should leverage the High Availability (HA) in TNC-O. This will typically mean over provisioning the number of instances deployed for each TNC-O service.

## Resource Managers

The [Resource Manager](/installation/resource-manager/rm-overview/) (RM) acts as an intermediary between TNC-O and the individual VIMs supporting the infrastructure in which TNC-O managed resources are deployed. A resource manager may only service a single TNC-O instance. That is; An RM should be deployed with access to the Kafka instance used by TNC-O and Elastic Search filebeat is configured to pull the set of logs for its TNC-O environs. Therefore care must be taken to ensure valid pairing. Failure to do so can result in anomalous behaviour.

At least one RM must be deployed and [onboarded/registered](/reference/resource-manager/attach-to-lm) with TNC-O for any assembly design or instantiation to function.

## Sizing Guidelines

[Sizing Guidelines](/reference/sizing-guidelines)
