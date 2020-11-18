---
title: Add Tests to Package
weight: 100
---

## Objectives

This section shows how to add VNF functional behaviour tests or Network Service performance and interoperability test artifacts to your project structure in the CI/CD Hub.

### Pre-requisites

- Development VIM and [CI/CD Hub and TNCO](/user-guides/cicd/getting-started) up and running
- [LMCTL setup on your local machine](/reference/lmctl) with a profile configured for the above development environment
- VNF design documenting how test scenarios are expected to be run and the metrics and behaviour from all participating VNFs that constitute a successful test run.
- VNF design includes the additional VNF or Network Service test package versions required to actually run the test software itself (e.g. traffic generators and/or probes etc) and the test software images.

## Push your project to Lifecycle Manager

If you have not already done so, make sure the project you are working on is loaded to your development environment. This will be required to use the Telco Network Cloud Orchestration (TNCO) tools to design behaviour tests.

```
$ git clone <YOUR PROJECT FROM GOGS>
$ cd <YOUR PROJECT DIR>
$ lmctl project push dev
```

## Load test software images

The first step is to check the VIM in your development environment and load any test software images required to run the test software. These images should be stored in the Nexus general repository.

## Load dependent packages

Check TNCO in your development environment and load any extra VNF or Network Service packages required from the Nexus general repository.

For each extra package:

```
$ wget http://<nexus ip address and port>>/repository/raw/<package name>/<package-name>-<package-version>.tgz

$ lmctl pkg push <pakage-name>-<package-version>.tgz dev
```

## Create Behaviour Tests

Log into the development TNCO and [design and run the new VNF behaviour tests](/user-guides/cicd/developing-a-project/developing-new-vnf/#creating-behaviour-tests). When the tests are performing as expected it is time to export the tests into your project and commit back to Gogs.

## Export Tests and Commit

On your local machine, run the following commands to retrieve the behaviour tests designed in the previous step.

```
$ cd <YOUR PROJECT DIR>
$ lmctl project pull dev
```

Now, run the following commands to commit your changes to the Gogs git repository.

```
$ git add .
$ git commit -m 'Additional Behaviour Tests Added'
$ git push origin master develop
```

## Moving from Development to Test

Once you are satisfied the VNF is behaving as expected and your tests are validating that this is the case, the next step is to promote your project from development to test. Merging your changes with the master branch will trigger a CI pipeline which will run a series of additional tests that validate your package is ready for others to use.

To merge your changes with the master branch, you need to run the following commands on you local machine:

```
$ git checkout master
$ git merge --no-ff develop -m 'validate version'
$ git push
```
