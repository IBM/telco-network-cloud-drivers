---
title: End Users
weight: 60
---
# End Users of Telco Network Cloud Orchestration (TNCO)

The types of users for TNCO can be divided into a set of roles based on their main responsibility:

* VNF Engineering
* Network Service Design
* Installation and Administration
* Operations 


The main use cases of the user roles are described below.

![Users of TNCO](/images/users/user-roles.png "Users of TNCO")

# VNF Engineering

The VNF Engineer is a VNF subject matter expert with responsibility for the creation and/or onboarding of third party VNF software through the creation of an operational package that can be managed by TNCO.
The VNF Developer creates VNF functional tests and behaviour scenarios

![VNF Developer](/images/users/vnf-developer.png "VNF Developer")


# Network Service Designer

* The Service Engineer is responsible for realizing a network service from a documented network service design and the set of VNFs which it is composed from.
* The Service Engineer translates service designs from other SMEs into a Network Service design.
* The Service Engineer implements the Network Service design by connecting Network Service and VNF packages to a location based network configuration.
* The Service Engineer validates that network service packages and all their included third party VNFs behave as expected. 
* The Service Engineer brings network service and VNF packages through a pre-production verification process and publishes the packages for production use when appropriate.

![Service Engineer](/images/users/service-engineer.png "Service Engineer")

# Operations

* Operations manages the life of service instances within production environments.
* Operations is responsible for executing new or planned changes to service instances.
* Operations is responsible for diagnosing and resolving reported errors or anomalies.

![Operations](/images/users/operations.png "Operations")

# Installer and Administrator

* The Administrator configures and administers TNCO, tailoring the system to manage their environment.
* The Administrator models the infrastructure universe that TNCO will be deploying to, modeling placement groups and available infrastructure features.    
* The Administrator configures pre-production environments that can run and test network service designs.
* The Administrator onboards Resource drivers and external resource managers that are required to run a network service.



