---
title: Processes
weight: 0
---

This section covers the APIs used to view processes running against Assembly instances during their life.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Check Process

Check the status of a process

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/processes/{id}  |
| **HTTP Method**  | GET                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| id                      | ID of the process | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |
 
### Body

| **Field**        | **Description**                                              | 
| ---------------- | ------------------------------------------------------------ | 
| id               | Unique identifier for the process                  | 
| assemblyId       | Unique identifier for the Assembly being used by the process |
| assemblyName     | Name of the Assembly being used by the process     |
| assemblyType     | Name of the Assembly Type                          |
| lifecycleAction  | The Lifecycle action  being performed by the process        |
| intent           | Definition of the lifecycle change that the process shall perform/has performed. The properties within this entry will therefore vary for each different Intent |
| intentType       | The type of lifecycle change will be/has been performed by the process (CreateAssembly, DeleteAssembly, ChangeAssemblyState, HealAssembly, ScaleInAssembly, ScaleOutAssembly, HealAssembly, UpgradeAssembly) |
| status           | Current state of the process. (Planned, Pending, In Progress, Completed, Cancelled, Failed |
| statusReason | Reason for the status (e.g. a reason for failure) |
| startTime        | Time the process started expressed in ISO 1806 format. This time is taken from the server on which TNCO is running. If the process is yet to start then this property will not be present |
| endTime          | Time the process finished expressed in ISO 1806 format. This time is taken from the server on which TNCO is running. If the process has not completed or been cancelled, then this property will not be present |
| assemblyProperties | Properties passed in with the request |
| context          | Any additional contextual parameters required by the process (typically empty) |
| previousInstance | The state of the Assembly instance that the Process shall start with |
| desiredInstance  | The desired state of the Assembly instance that the Process shall migrate the Assembly to using the executionPlan | 
| executionPlan    | The definition of the process and the list of tasks the process shall execute to achieve the required lifecycle change |
 
Example: 

```
{
​    "id" : "1b9c6e04-1cce-4cb6-8c30-ffda960964ec",
​    "assemblyId" : "fd262ceb-9cdc-480a-aba4-691ba50febd6",
​    "assemblyName" : "BasicTestAssembly",
​    "assemblyType" : "assembly::t_bta_noStopStart::1.0",
​    "lifecycleAction" : "Heal",
​    "intent" : {
​        "assemblyName" : "BasicTestAssembly",
​        ...
​    },
​    "intentType" : "HealAssembly",
​    "status" : "Completed",
​    "startTime" : "2018-08-08T16:29:23.218+01:00",
​    "endTime" : "2018-08-08T16:29:23.714+01:00",
​    "context" : {},
​    "previousInstance" : { ... },
​    "desiredInstance" : { ... },
​    "executionPlan" : { ... }
}
```

The content of some of the above fields has been shortened and replaced with ellipses as it will vary greatly depending on the exact lifecycle change required.

# Search for a Process

Return a list of processes based on a set of query parameters. The Query parameters are supplied as URL parameters.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/processes?{query-params} |
| **Content-Type** | application/json         |
| **HTTP Method**  | GET                     |

### Query Parameters

| **Field**       | **Description**                                              | **Mandatory** |
| --------------- | ------------------------------------------------------------ | ------------- |
| assemblyId      | The unique id of the Assembly being used by the process(es). | No            |
| assemblyName    | Name of the Assembly being used by the process(es). This is case sensitive. The “*” wildcard characters is supported anywhere within the text string and matches any number of characters | No            |
| assemblyType    | The Type of Assembly. This is case sensitive and must be an exact match. No wildcards are supported | No            |
| startDateTime   | The time the process must have started after, expressed in ISO 1806 format | No            |
| endDateTime     | The time the process must have ended before, expressed in ISO 1806 format | No            |
| processStatuses | A comma-separated list of process states, at least one of which the process must be in | No            |
| intentTypes     | A comma-separated list of Intent Types, at least one of which the process must be using | No            |
| limit           | The maximum number of matching processes to be returned by this query. If this is not supplied then all matching processes will be returned | No            |

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |

### Body

The body includes a single list of matching processes, each with the following fields: 

| **Field**        | **Description**                                              | 
| ---------------- | ------------------------------------------------------------ | 
| id               | Unique identifier for the process                  | 
| assemblyId       | Unique identifier for the Assembly being used by the process |
| assemblyName     | Name of the Assembly being used by the process     |
| assemblyType     | Name of the Assembly Type                          |
| lifecycleAction  | The Lifecycle action  being performed by the process        |
| intent           | Definition of the lifecycle change that the process shall perform/has performed. The properties within this entry will therefore vary for each different Intent |
| intentType       | The type of lifecycle change will be/has been performed by the process (CreateAssembly, DeleteAssembly, ChangeAssemblyState, HealAssembly, ScaleInAssembly, ScaleOutAssembly, HealAssembly, UpgradeAssembly) |
| status           | Current state of the process. (Planned, Pending, In Progress, Completed, Cancelled, Failed |
| statusReason | Reason for the status (e.g. a reason for failure) |
| startTime        | Time the process started expressed in ISO 1806 format. This time is taken from the server on which TNCO is running. If the process is yet to start then this property will not be present |
| endTime          | Time the process finished expressed in ISO 1806 format. This time is taken from the server on which TNCO is running. If the process has not completed or been cancelled, then this property will not be present |
| assemblyProperties | Properties passed in with the request |
| context          | Any additional contextual parameters required by the process (typically empty) |
| previousInstance | The state of the Assembly instance that the Process shall start with |
| desiredInstance  | The desired state of the Assembly instance that the Process shall migrate the Assembly to using the executionPlan | 
| executionPlan    | The definition of the process and the list of tasks the process shall execute to achieve the required lifecycle change |
 
Example: 

```
[
    {
    ​    "id" : "1b9c6e04-1cce-4cb6-8c30-ffda960964ec",
    ​    "assemblyId" : "fd262ceb-9cdc-480a-aba4-691ba50febd6",
    ​    "assemblyName" : "BasicTestAssembly",
    ​    "assemblyType" : "assembly::t_bta_noStopStart::1.0",
    ​    "lifecycleAction" : "Heal",
    ​    "intent" : {
    ​        "assemblyName" : "BasicTestAssembly",
    ​        ...
    ​    },
    ​    "intentType" : "HealAssembly",
    ​    "status" : "Completed",
    ​    "startTime" : "2018-08-08T16:29:23.218+01:00",
    ​    "endTime" : "2018-08-08T16:29:23.714+01:00",
    ​    "context" : {},
    ​    "previousInstance" : { ... },
    ​    "desiredInstance" : { ... },
    ​    "executionPlan" : { ... }
    },
    ...
]
```