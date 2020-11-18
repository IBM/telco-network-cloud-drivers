---
title: Getting Started
weight: 20
---

## Objective

This section describes how to setup your own Telco Network Cloud Orchestration (TNCO) CI/CD process and tools using the CI/CD Hub.

### Pre-requisites

You must have installed the [CI/CD Hub software](https://github.com/accanto-systems/lm-cicdhub) and attach one or more ALMs. A detailed description of the CI/CD Hub software can be found [here](/reference/cicdhub-software).

### TNCO CI/CD Process and Tasks

Once the CI/CD Hub is up and running, perform the following tasks to configure it to the needs of your team.

- [Configure CI/CD Hub](/user-guides/cicd/configure-cicd-hub): Configure CI/CD Hub software components and create users etc.
- [Install Local LMCTL](/reference/lmctl): Install TNCO command line tool for local development

The image below describes the common tasks required to run a CI/CD process for a Network Service or VNF project.

![CI/CD Project Tasks](/images/user-guides/cicd/gettingstarted/projecttasks.png "Project Tasks")

The first set of tasks to create a new project are typically performed in a local TNCO _"Development"_ environment.

- [Create a new Project](/user-guides/cicd/developing-a-project/create-new-vnf-project): Setup new local project structure and git repository.
- [Upload images](/user-guides/cicd/developing-a-project/upload-images): Load any VNF software images to CI/CD Hub repository.
- [Develop Package](/user-guides/cicd/developing-a-project/developing-new-vnf): Implement the package artifacts.
- [Add tests](/user-guides/cicd/developing-a-project/add-tests-to-package): Add tests to ensure expected operational behaviour.

Pipeline tasks below are required to automate the population of pre-production TNCO slaves, running behaviour tests and generating versions of binary packages.

- [Create CI Pipeline](/user-guides/cicd/pipeline/create-ci-pipeline): Trigger build and deployment process from your project source.
- [Create CD Pipeline](/user-guides/cicd/pipeline/create-release-pipeline): Automate release process from pre-production to production environments

Package versions need to be continually updated, a typical update task is described below.

- [Update Package Version](/user-guides/cicd/developing-a-project/update-package): Manage new versions of released packages.
