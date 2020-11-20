---
title: Lifecycle Manager Architecture
weight: 0
---
#  Overview
Telco Network Cloud Orchestration (TNC-O) software application is deployed as separated distinct component sets which can be considered in two groups;

* Core TNC-O consisting of a number of microservices
* Dependencies: Foundation functionality consisting of industry standard third party implementations
  * Message Bus
  * Data Persistence
  * Authentication Server

# TNC-O Core Microservices
The TNC-O microservices are namely:

* **User Interface**
  * Host for TNC-O User Interface.
* **API Gateway**
  * A gateway for the full set of published TNC-O APIs used by the TNC-O User Interface and available for use by any number of configured Client applications. It supports full management of the set of Network Services governed by TNC-O
* **Service Registry**
  * The first instantiated TNC-O service, The Service Registry is responsible for making per service configuration available to each TNC-O Service (instance) as it is instantiated
* **Intent Engine**
  * Core TNC-O service, the Intent Engine is responsible for deriving the set of lifecycle transitions on each deployed resource to transition the Network Service from its current state to an intended/desired state in real-time and optimally orchestrating their execution leveraging opportunities for concurrency while reflecting transition dependencies.
* **Process Repository**
  * Helper service for the Intent engine supporting its High Availability operation for stateful operations
* **Component Catalogue**
  * A Data Presentation service for the set of defined NS, VNF and VNFCs
* **Graph Network Service Topology**
  * A Graph of deployed Network Services and their constituent components to the leaf VNFC level
* **Deployment Topology**
  * Service maintaining a view of deployment environments and their capability in support of Deployment Policy enforcement (affinity & pinning support)
* **Behavioral Scenario Execution Engine**
  * Test and certification service. Allowing managed, in situ scenarios to be executed against individual Network Services and the collection of specific metrics while the test is in play
* **TNC-O Policy Enforcement**
  * Integrity (Heal) and Scaling (Horizontal) Metric Monitor and Policy execution. This is responsible for enforcing the policy across the set of all VNFCs under management
* **Resource Manager**
  * TNC-O supports the binding of multiple _Resource Managers_ but comes with an expandable resoruce manager already integrated. In operation, the resource manager is issued with individual Lifecycle transition instructions by the Intent Engine. It is responsible for performing infrastructure provisioning and lifecycle transitions at the individual VNFC level. It utilizes modularized Infrastructure Manager specific drivers to allow it to communicate with a number of Infrastructure Managers.
    * Resource Drivers
      * One logical Driver per NFVI/VIM (e.g OpenStack, Kubernetes)
      * Scaled set of Lifecycle deployment worker nodes


![TNC-O Software Architecture](/images/architecture/lm-software-architecture.png "TNC-O Software Architecture")

# Deployment Model
TNC-O Core application is realized by a number of microservices deployed on Kubernetes environment. Each microservice has a specific role/function within the TNC-O application and communicate with each other via RESTful APIs and through a Kafka message bus.

 Each TNC-O microservice is realized as a Kubernetes service and implemented as a set of service instances which are reachable via a load balancer. Every service operates in a fully active instance set. That is, all service instances within the set are fully operational and capable of servicing any request made of it concurrent to its peers within the service.

 A TNC-O instance is deployed in full in a single Data Center. The colocation of the set of microservices that make up a TNC-O instance to a single Data Center is for efficiency and to reduce latency in inter microservice communication

 TNC-O installation assumes an existing Kubernetes cluster with a sufficient number of nodes to deploy the services on. Distribution of Kubernetes nodes on virtual machines and eventually on physical resources in a data center to secure resilience against various infrastructure failures is managed by Kubernetes and layers under it.

# High Availability
Features of Kubernetes are leveraged to provide High Availability of TNC-O. High Availability is realized by managing a set of service instances for each logical service. By default TNC-O HA configuration defaults to 3 instances per service. Although, the actual number of instances needs to factor in the load and the expectation. 

 This is based on a simple case of:

* HA = R + L, where:
  * R: The number of required redundant instances. That is the number of failed instances the system must cater for without the ability to cater for the current load.
  * L: The number of required instances for the system to maintain operation.

 High Availability for TNC-O is configurable on a per service (service set) basis for all services in TNC-O. Each individual TNC-O Microservice is configured to be deployed with the following Kubernetes parameters:
* minReplicas
* maxReplicas
* Replicas

Of these minReplicas and maxReplicas are used to manage the number of instances per service. Replicas is used to identify how many are created on deployment of TNC-O. This will represent the number of instances that are required to support the HA requirement of minReplicas.

Within a Service Set, the set of service instances should ideally be distribution across the set of available Kubernetes nodes. This provides resilience to the loss of a node will result in the loss of not more than one instance within a given service set. This is managed using a preferredDuringScheduling request in the configuration. This allows the system to maintain the number of instances in a set even when the number of worker nodes is insufficient to maintain one service instance per worker node. This may occur if there is the loss of a node or if scaling results in the need to ‘double-up’ due to the size of the service set exceeding the number of available nodes.

maxReplicas can be used to cap a particular service at a level. This prevents run away and the risk of an individual service scaling to a level that results in the exhaustion of underlying resources to the detriment of other services and their ability to scale.

# Solution Architecture
Figure below illustrates the positioning of TNC-O with other main components involved in service development and orchestration.

![TNC-O Solution Architecture](/images/architecture/lm-solution-architecture.png "TNC-O Solution Architecture")

The main responsibilities of TNC-O is to enable modeling of network services (NS) and drive them through their lifecycles according to requests it receives. TNC-O integrates on its northbound interface with Order management tools to take in orders to deploy, maintain or decommission service instances.

Incoming requests are resolved to required actions, broken down to VNF and eventually to VNFC level lifecycle transitions to be executed. Finally, the resource level requests are passed to responsible VIMs, SDN Controllers, VNF Managers and VNFs to fulfill their responsibilities. 

Integration to OSS enables among other things closed loop monitoring of service health and load, and access to resource inventory.

TNC-O provides also seamless integration to CI/CD tools and processes to ensure automation of service development process and testing. TNC-O comes with a CI/CD hub providing pre-integrated CI/CD toolset and framework to be used as a reference implementation of CI/CD pipeline.

Centralized user and log management can also be integrated through corresponding interfaces.

