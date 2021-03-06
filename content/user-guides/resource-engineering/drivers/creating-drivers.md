---
title: Creating Resource Drivers
weight: 50
---

# Introduction

You may create your own resource driver to support integration with virtual infrastructure and to complete transitions and operations with different scripting mechanisms. The driver must fulfill resource driver APIs and be capable of accepting HTTP requests and returning responses asynchronously on Kafka. 

The programming language used to create the driver is at the discretion of the user. The [SOL 003 Lifecycle Driver](https://github.com/IBM/sol003-lifecycle-driver) is a good example of writing a driver with Java.

The [Ignition Framework](https://github.com/IBM/ignition) has been created to help developers quickly build drivers in Python. It provides boilerplate code for handling API requests and sending asynchronous Kafka responses. This enables developers to focus on the real functionality of their driver by providing implementations of an interface per API to act on the target request. Read through the [documentation on creating a driver](https://github.com/IBM/ignition/blob/master/docs/user-guide/creating-a-driver.md) to learn how to get started.

The Resource Driver API is specified (in OpenAPI format) in the [Ignition Framework](https://github.com/IBM/ignition/blob/master/ignition/openapi/resource-driver.yaml). Copy the definition and paste it into the [Swagger Editor](https://editor.swagger.io/) to view a pretty version of it.

# Resource Infrastructure and Operation (Lifecycle) Requests

On a transition or operation request, Brent will send the following to the resource driver:

- the contents of the driver lifecycle scripts directory in the package, for the given lifecycle type (e.g. if the "Install" lifecycle driver type is "ansible" then the "Lifecycle/ansible" directory is sent, similarly if the "Create" lifecycle driver type is "openstack" then "Lifecycle/openstack" with the Openstack infrastructure template is sent)
- the name of the transition/operation to execute e.g. Create, Start, Stop, operationA, etc.
- all values set on the properties of the Resource descriptor
- additional system properties including the intended Resource ID and name
- the deployment location the Resource instance is to be deployed to

The following diagram shows the interactions between Brent and drivers ![Execute transition sequence](/images/user-guides/resource-engineering/brent/ExecuteTransitionSequence-v2_2.png "Execute transition sequence")

The driver will assign the request an ID and return this to Brent so it may be used to track the completion of the request. If a `Create` transition is requested, the IDs of relevant infrastructure objects will be generated by the resource driver handling the infrastructure type and included in `associatedTopology` property of the Resource. Once the lifecycle script has executed successfully, the driver should also return any outputs of the scripts.

If any of the outputs have the same name as a property passed in, then Brent overwrites the existing value with the value of the output. The descriptor property values are passed back up to TNC-O, making any new values viewable on the instance. Any non-descriptor properties are kept by Brent for the next request. 

The structure of resource package driver subdirectories under the `Lifecycle` directory is defined not by Brent but by the resource driver.

## Execute 

The `/execute` operation is used to execute any lifecycle transition or operation requests for a Resource. The request will include:

- BASE64-encoded zip of the contents of the Lifecycle/[driver type] folder.
- the name of the transition/operation to execute
- system properties such as the fue Resource instance ID and name
- property values, including all of the values for properties on the descriptor and details for infrastructure objects in `associatedTopology`
- the deployment location the Resource is assigned to

The operation is expected to be potentially long running. To cater for this, the API states it should return an immediate response with an identifier for the request. [Ignition](https://github.com/IBM/ignition) will handle these aspects of request handling, or at least provide APIs that handle/managed it for you.

On completion, the driver is expected to produce a message on the `lm_vnfc_lifecycle_execution_events` Kafka topic with the request identifier and details of the success or failure of the operation. Brent is constantly monitoring this topic for messages and will use the earlier returned request identifier to determine the operation each message relates to. For a full definition of the expected message format see [Asynchronous Message Format](#asynchronous-message-format)

## Find Reference Infrastructure

Assemblies designed in Telco Network Cloud Orchestration (TNC-O) are allowed to have external references to Resources which may or may not have been created by Brent. These Resources should be discovered by Brent, using a name and deployment location. Once the Resource has been found, operations can be executed on it.
Resource Driver API `/references/find` is designed for Brent to discover infrastructures previously created on a TNC-O deployment location, to be referenced as a resource associated topology.

On a find reference request, Brent will send the following to the resource driver:

- BASE64-encoded zip of the contents of the Lifecycle/[driver type] folder (for example contents may be files in TOSCA discovery templates if defined as such by your resource driver)
- instanceName - the name of the target infrastructure to be found (this can be used by the driver as input to the template)
- name, type, and properties of the deployment location that the Resource instance is in 

If the driver can find the infrastructure required, then it should return a resource ID managing the infrastructure and infrastructure ID as associatedTopology for that resource, along with outputs from the discovery template. If any of outputs have the same name as a property on the Resource descriptor, then Brent sets the instance value with the value of the output. The descriptor property values are passed back up to TNC-O, making the new value viewable on the instance.

Any outputs that do not have the same name as a descriptor property are kept by Brent so they are still usable in any lifecycle scripts. 

The operation is expected to return immediately with a result. If the infrastructure could not be found then the response should be empty, rather than throwing an error.

The types of infrastructure that may be found with this operation is at the discretion of the driver implementation and the infrastructure type of the deployment location.

# Asynchronous Message Format

Messages on Kafka for resource lifecycle operations should be of the following format:

```
{
    "requestId": "<identifier of the request>",
    "status": "<IN_PROGRESS, COMPLETE or FAILED>,
    "failureDetails": {
        "failureCode": "<RESOURCE_ALREADY_EXISTS, RESOURCE_NOT_FOUND, INFRASTRUCTURE_ERROR, INSUFFICIENT_CAPACITY or INTERNAL_ERROR>",
        "description": "<error message>"
    },
    "outputs": {
        "outputPropertyIfExists": "outputValue"
    },
    "associatedTopology": {<infrastructure (e.g Kubernetes, Openstack) objects associated with the resource>}
}
```
