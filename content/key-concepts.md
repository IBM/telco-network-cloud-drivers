---
title: Key Concepts
weight: 30
---
# Objectives

This section introduces key concepts that are useful to understand how Telco Network Cloud Orchestration (TNCO) works and the key drivers behind of the design.

![Key Concepts](/images/key-concepts/key-concepts.png "Key Concepts")

# Prerequisites

It is assumed that the reader has basic understanding of concepts around virtualization, NFV, and DevOps.

To learn about NFV basic concepts read: NFV Basics guide (Coming Soon)

# Unified Lifecycle Model
Standard lifecycle model is a key enabling factor for intent based automation. In order to drive automation, TNCO adopted a standardized lifecycle model which mandates all the underlying artifacts (Network Services and VNFs) look the same to TNCO. Each artifact of a Network Service will be expected to go through the same lifecycle with defined lifecycle transitions as shown below.

![Unified Lifecycle Model](/images/key-concepts/unified-lifecycle-model.png "Unified Lifecycle Model")

Each artifact in a Network Service is optimally stepped through this lifecycle concurrently with others accounting for the declaratively identified dependencies. For example, on installation each artifact will be moved to the ‘Installed’ state together before they are moved to the Inactive state. Only the lowest level artifacts (VNFC) have transition steps defined that will be performed as the Network Service progresses through the lifecycle.

# Intent Based Automation
Intent Based Automation is comparable to a satellite navigation system. In order to go from A to B, you only need to enter the destination and the Sat Nav will figure out the best way to get there. You don’t need to manually program each turn. If there is a roadblock or a traffic jam, the engine will figure out the best alternative route without you having to manually re-program the route.

TNCO works in a similar way. Rather than programming all individual lifecycles for all possible lifecycle scenarios such as upgrade and migrate, the engine automatically generates and executes all lifecycles for VNF and Network Services.

The Intent Engine (one of the TNCO core microservices) in the heart of TNCO has the responsibility for driving Network Service (NS) instances through their lifecycles according to intent requests it receives. With support from other TNCO services, like catalog and topology, intent engine resolves the necessary network service level actions, breaks them down to VNF and eventually to VNFC level lifecycle transitions, and figures out the correct order to execute the steps. The exact sequence of execution steps depends on the model of the network service, the current state of the service, and the requested target state and shape of the service. Finally, the Intent Engine pushes the corresponding requests to responsible resource managers to complete through TNCO's southbound APIs.

Also, the detailed execution plans are stored by TNCO to enable real-time monitoring of the progress of currently active intents as well as browsing the intent history for a specific network service instance. The following is a screenshot illustrating an intent execution on the TNCO GUI.

![Intent Execution Flow](/images/key-concepts/intent-execution.png "Intent Execution Flow")

Intents can be requested through a set of API endpoints on the TNCO northbound API. Requests can be triggered by an external northbound system, by TNCO itself for policy driven intents (such as auto-healing or scaling for example) or they can be manually requested through the TNCO User Interface which then calls the corresponding API end point.

# Behaviour Driven Testing
TNCO has in-built Behaviour Driven Testing capability functioning as an automated test framework for VNF and Network Service (NS) testing. While [Intent Based Automation](/key-concepts/#intent-based-automation "Intent Based Automation") automates the production lifecycle of your Network Services and associated resources, Behaviour Driven Testing, together with [CI/CD Hub](/key-concepts/#ci-cd-hub "CI/CD Hub Introduction"), helps you to automate your service development processes. Automated Behaviour Driven Testing reduces manual effort and errors in production. 

In development and pre-production phase, TNCO's Behaviour Driven Testing can automatically spin up test environments, Network Service under test, and additional test VNFs such as probes and traffic generators, and run through full test scenario of all lifecycle states.

While services are deployed in production environment, Ready for Service testing can be invoked automatically so that the Network Service is first tested in full, before being released to the customer.

Below screenshot shows a sample view of behaviour driven test scenario designer where testing sequence can defined by adding and configuring the individual steps.

![Behaviour Driven Testing](/images/key-concepts/behaviour-driven-testing.png "Behaviour Driven Testing")

Ones designed, the test scenarios will be part of the VNF- or Network Service Package. Test scenarios  can be either run directly from TNCO’s user interface or triggered through its APIs enabling full automation and integration to CI/CD pipelines. [Setting up CI/CD Process](/user-guides/cicd/getting-started).

# CI/CD Hub
Cloud DevOps best practices and principles are at the heart of the TNCO solution. To scale any Cloud based networking program, a unified operations and engineering model should be combined with a set of automation tools that can simplify and automate the complexities of an end-to-end VNF or Network Service lifecycle.

![NFV DevOps](/images/user-guides/cicd/overview/overview.png "NFV DevOps")

The TNCO CI/CD tools and processes are designed to simplify and automate the following DevOps tasks:

- **Onboard VNFs and design Network Services**: Quickly integrate and package the lifecycle actions required to operate a VNF or any virtual or physical network appliance. 
- **Behaviour Testing in pre-production**: Deploy VNFs to pre-production environments and easily script complex operational behaviour tests to ensure the onboarded VNF behaves as expected in all "day 1" or "day 2" lifecycle tasks.
- **Deploy to production**: Once fully tested, auto deploy to production environments. 
- **Monitor and Change**: Monitor and sense environmental or VNF state and auto scale, heal or move components of the network service.  
- **Report and Resolve issues**: Errors in lifecycle actions or VNF software found in production are reported and trigger an upgrade process that rebuilds a new version of the VNF. 

To learn more about CI/CD Hub and applying DevOps processes on Network Service and VNF lifecycle management read: [Introduction to CI/CD Hub](/user-guides/cicd/introduction).

