---
title: Architecture
weight: 40
---

# Objectives
Introduce Telco Network Cloud Orchestration (TNC-O) software architecture

# Software Architecture
TNC-O software is deployed as separated distinct component sets which can be considered in two groups;

- Core TNC-O consisting of a number of microservices
- Dependencies: Foundation functionality consisting of industry standard third party implementations
  - Message Bus
  - Data Persistence
  - Authentication Server

![TNC-O Software Architecture](/images/architecture/lm-software-architecture.png "TNC-O Software Architecture")

TNC-O Core application is realized by a number of microservices deployed on Kubernetes environment. Each microservice has a specific role/function within TNC-O application and communicate with each other via RESTful APIs and through a Kafka message bus.

Each TNC-O microservice is realized as a Kubernetes service and implemented as a set of service instances which are reachable via a load balancer. Every service operates in a fully active instance set. That is, all service instances within the set are fully operational and capable of servicing any request made of it concurrent to its peers within the service.

# Solution Architecture

The main responsibilities of TNC-O is to enable modeling of network services (NS) and drive them through their lifecycles according to requests it receives. TNC-O integrates on its northbound interface with Order management tools to take in orders to deploy, maintain or decommission service instances.

Figure below illustrates the positioning of TNC-O with other main components involved in service development and orchestration.

![TNC-O Solution Architecture](/images/architecture/lm-solution-architecture.png "TNC-O Solution Architecture")

More detailed description of TNCO architecture can be found in [TNCO Architecture](/reference/stratoss-lm-software-architecture)
