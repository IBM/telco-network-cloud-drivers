---
title: How to Design a Network Service
weight: 10
---

There are a number of tasks involved in designing a Network Service (NS). In order to understand what a network service is, we first need to look at what it consists of. 

## What is a Network Service?

A Network Service, is a collection of VNF and/or PNF that will be used by Agile Lifecycle Manager (ALM) to instantiate either a complete end-to-end service for a customer or, a significant portion of a customer’s service.  A network service (NS) is created by using a ALM Assembly Descriptor. The descriptor will compose and reference other Network Services, VNF or PNF. Generally, the Network Service will not refer directly to VNFC.


![Anatomy of a NS](/images/user-guides/network-service-design/how-to-design-a-network-service/anatomy.png "Anatomy of a NS")

Component | Sub-component | Description
 --- | ---| --- 
Network Service | Network Service Descriptor (Assembly) | A Network Service Descriptor (Assembly) is a yam file that describes the properties and composition of the Network Service. 
    | Service behaviour test scenarios| scripts that are used to test NS functionality and are created during the design phase.
    | VNF | A VNF provides a single function within a Network Service. A Network Service may consist of one or multiple VNFs.
    

## Tasks to develop a Network Service
To develop a Network Service, there are multiple steps that are outlined in the picture below:
![Steps to develop a VNF](/images/user-guides/network-service-design/how-to-design-a-network-service/service-design-process.png "Steps to develop a VNF")


## Tools to develop a Network Service
To develop a NS, there are multiple tools that are used to allow people to collaborate on creating, testing, maintaining and automating the development of Network Services.

### CI/CD Hub
The Continuous Integration / Continuous Delivery Hub, or CI/CD Hub, provides a set of standards, tools and automation patterns designed to simplify and accelerate the network service continuous integration and deployment journey. The CI/CD Hub includes a source code repository, image repository and an automation server.

More information about the tools in the CI/CD Hub can be found [here](/user-guides/cicd/introduction) .

### ALM environment
Designing a NS is done through the Designer section of ALM. This is typically done on a local or dedicated development environment. The Designer has a graphical User Interface with which you can drag and drop VNF and other elements, establish relationships, modify properties, etc.

### LMCTL
LMCTL is a command line tool that allows you to create, pull, push and test Network Service projects to a ALM environment. LMCTL is also used by the automation server to issue these commands and execute the automated pipeline. The LMCTL tool can be installed from the CI/CD Hub.







