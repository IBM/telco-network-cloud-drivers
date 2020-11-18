---
title: Releasing a package
weight: 90
---

## Objectives

Release a VNF or Network Service package that has been confirmed ready for production use to a production environment

### Pre-requisites

* The VNF or Network Service package is available in the Nexus general repository and marked ready for production deployment.

## Introduction

When a package has been developed and its been agreed that it has been fully tested by its stakeholders, it can be released.

Releasing a VNF or Network Service package is done by triggering the **Release pipeline** job manually in Jenkins and giving the version of the package to deploy.

If successful, the package will be deployed into the Production environment along with all packages it depends on for release. Also the package will be available in nexus for other projects to use in production.

 