---
title: Executions
weight: 0
---

This section details the APIs for executing Scenarios and viewing the results.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Execute Scenario

Execute a Scenario, creating an execution record to view the outcome. 

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/executions |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Headers

| **Field**         | **Description**                                                 | **Mandatory** |
| ----------------- | --------------------------------------------------------------- | ------------- |
| Authorization     | Executing user's authorization token | Yes, if LM is secure otherwise; no |

### Body

| **Field**         | **Description**                                                 | **Mandatory** |
| ----------------- | --------------------------------------------------------------- | ------------- |
| scenarioId        | ID of the Scenario to execute | Yes |
| assemblyId       | ID of the assembly instance, if the Scenario requires a reference to an existing Assembly | Yes, if an Assembly actor in the Scenario is marked as "provided" otherwise; no. Only need one of `assemblyId` or `assemblyName` |
| assemblyName       | Name of the assembly instance, if the Scenario requires a reference to an existing Assembly | Yes, if an Assembly actor in the Scenario is marked as "provided" otherwise; no. Only need one of `assemblyId` or `assemblyName` |

Example:

```
{
​  "scenarioId": "8e266bc5-e613-4b0d-9ae0-50db6454b026"
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 201 (Created) |
 
### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to created resource |

# Remove Execution

Removes record of an Execution. This does not cancel the Execution if it is running.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/executions/{executionId} |
| **HTTP Method**  | DELETE                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| executionId          | ID of the Execution | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 204 (No Content) |

# Get all Executions

Retrieve all Executions by Scenario or Project (so all Scenarios in that Project) 

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/executions?scenarioId={scenarioId}&projectId={projectId} |
| **HTTP Method**  | GET                     |

### Query Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| scenarioId          | ID of the Scenario to retrieve all Executions of | Yes (if projectId is not set)         | 
| projectId          | ID of the Project to retrieve all Executions from all Scenarios within it | Yes (if scenarioId is not set)         | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |
 
### Body

The body will contain a single list of Execution summaries. Each entry will have the following fields:

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | ID assigned to the Execution |
| name              | Name assigned to the Execution |
| scenarioId        | ID of the Scenario being executed |
| createdAt         | Date and time the Execution was requested |
| lastModifiedAt    | Date and time the Execution instance was last modified | 
| startedAt         | Date and time the Execution begun |
| finishedAt        | Date and time the Execution completed (may be empty if the Execution is currently running) |
| status            | Current execution status (PASS, IN_PROGRESS, ABORTED, FAIL, PENDING) |
| scenarioSummary   | Summary of the Scenario being executed |

The `scenarioSummary` contains:

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| name          | Name of the Scenario | 
| description          | Description of the Scenario |

Example:

```
[
  {
​    "id": "7c132ad3-f126-2c1d-7fe1-42ac6234e145",
​    "name": "EX-01-03-19-15-27-43",
​    "createdAt": "2019-03-01T15:37:43.705Z",
​    "lastModifiedAt": "2019-03-01T15:37:43.705Z",
​    "startedAt": "2019-03-01T15:37:43.705Z",
​    "finishedAt": "2019-03-01T15:37:43.705Z",
​    "scenarioId": "8e266bc5-e613-4b0d-9ae0-50db6454b026",
​    "scenarioSummary": {
​      "description": "Test scenario",
​      "name": "Test Scenario"
​    },
​    "status": "PASS"
  }
]
```

# Get Execution

Get the current status of an Execution 

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/executions/{executionId} |
| **HTTP Method**  | GET                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| executionId          | ID of the Execution | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |

### Body

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | ID assigned to the Execution |
| name              | Name assigned to the Execution |
| scenarioId        | ID of the Scenario being executed |
| createdAt         | Date and time the Execution was requested |
| lastModifiedAt    | Date and time the Execution instance was last modified | 
| startedAt         | Date and time the Execution started (may be empty if the Execution has not yet started) |
| finishedAt        | Date and time the Execution completed (may be empty if the Execution has not yet completed) |
| status            | Current execution status (PASS, IN_PROGRESS, ABORTED, FAIL, PENDING) |
| scenarioSummary   | Summary of the Scenario being executed |
| stageReports      | A list of reports for each Stage in the execution |
| registeredAssemblies | Details any Assemblies created or referenced as part of the Execution |
| registeredMetrics | List of IDs for any Metrics recorded during the Execution |
| error | Details of an error if one has occurred |

The `scenarioSummary` contains:

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| name          | Name of the Scenario | 
| description          | Description of the Scenario |

Each `stageReport` entry contains:

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| name          | Name of the Stage | 
| steps          | List of reports for each step |

Each `stepReport` entry contains:

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| status          | Status of the step execution (PASS, IN_PROGRESS, ABORTED, FAIL, PENDING) | 
| startTime          | Date and time the step execution started (may be empty if the step has not yet started) |
| endTime          | Date and time the step execution completed (may be empty if the step has not yet completed) |
| stepDisplayName          | Display name of the step being executed |
| stepType | Type of step (PRECONDITION, ACTION, EXPECTATION) |
| slices | List of sentences detailing the action the steps takes | 
| error | Message detailing an error if one has occurred |

Each `registeredAssemblies` entry contains:

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| assemblyName          | Name of the Assembly instance | 
| assemblyId          | ID of the Assembly instance |
| assemblyDescriptorName          | Name of the descriptor for this Assembly instance |
| installed | Boolean set to true if the Assembly was installed as part of this Scenario Execution |
| uninstalled | Boolean set to true if the Assembly was uninstalled as part of this Scenario Execution |

Example:

```
{
  "id": "7c132ad3-f126-2c1d-7fe1-42ac6234e145",
  "name": "EX-01-03-19-15-27-43",
  "createdAt": "2019-03-01T16:03:54.278Z",
  "lastModifiedAt": "2019-03-01T16:03:54.278Z",
  "finishedAt": "2019-03-01T16:03:54.278Z",
  "startedAt": "2019-03-01T16:03:54.278Z",
  "status": "PASS"
  "error": null,
  "scenarioId": "8e266bc5-e613-4b0d-9ae0-50db6454b026",
  "scenarioSummary": {
​    "description": "Test scenario",
​    "name": "Test Scenario"
  },
  "registeredAssemblies": [
​    {
​      "assemblyDescriptorName": "TestInstance",
​      "assemblyId": "7a243de5-a324-3c1a-8af1-40ac1256a136",
​      "assemblyName": "TestInstance",
​      "installed": true,
​      "uninstalled": true
​    }
  ],
  "registeredMetrics": [
    "6f122fa4-a219-2a2f-7be5-81bd2346b010"
  ],
  "stageReports": [
​    {
​      "name": "Test Stage",
​      "status": "PASS",
​      "steps": [
​        {
​          "endTime": "2019-03-01T16:03:54.278Z",
​          "error": "string",
​          "slices": [
​            "I change the state of an assembly called TestInstance to Inactive"
​          ],
​          "startTime": "2019-03-01T16:03:54.278Z",
​          "status": "PASS",
​          "stepDisplayName": "Change Assembly State",
​          "stepType": "ACTION"
​        }
​      ]
​    }
  ]
}
```

# Get Execution Progress Summary

Get a summarized version of the current status of an Execution

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/executions/{executionId}/progress |
| **HTTP Method**  | GET                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| executionId          | ID of the Execution | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |

### Body

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | ID assigned to the Execution |
| name              | Name assigned to the Execution |
| startedAt         | Date and time the Execution started (may be empty if the Execution has not yet started) |
| finishedAt        | Date and time the Execution completed (may be empty if the Execution has not yet completed) |
| status            | Current execution status (PASS, IN_PROGRESS, ABORTED, FAIL, PENDING) |
| stageReports      | A list of reports for each Stage in the execution |
| registeredAssemblies | Details any Assemblies created or referenced as part of the Execution |
| registeredMetrics | List of IDs for any Metrics recorded during the Execution |
| error | Details of an error if one has occurred |

Each `stageReport` entry contains:

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| name          | Name of the Stage | 
| steps          | List of reports for each step |

Each `stepReport` entry contains:

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| status          | Status of the step execution (PASS, IN_PROGRESS, ABORTED, FAIL, PENDING) | 
| startTime          | Date and time the step execution started (may be empty if the step has not yet started) |
| endTime          | Date and time the step execution completed (may be empty if the step has not yet completed) |
| stepDisplayName          | Display name of the step being executed |
| stepType | Type of step (PRECONDITION, ACTION, EXPECTATION) |
| slices | List of sentences detailing the action the steps takes | 
| error | Message detailing an error if one has occurred |

Each `registeredAssemblies` entry contains:

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| assemblyName          | Name of the Assembly instance | 
| assemblyId          | ID of the Assembly instance |
| assemblyDescriptorName          | Name of the descriptor for this Assembly instance |
| installed | Boolean set to true if the Assembly was installed as part of this Scenario Execution |
| uninstalled | Boolean set to true if the Assembly was uninstalled as part of this Scenario Execution |

# Get all Execution Metrics

Get all of the Metrics recorded during an Execution of a Scenario. Metrics are only recorded if a step has been executed which starts recording.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/executions/{executionId}/metrics |
| **HTTP Method**  | GET                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| executionId          | ID of the Execution | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |

### Body

A list of a Metrics, each entry containing: 

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | ID of the Metric (unique within the context of the Execution) |
| name              | Name of the Metric |
| executionId         | ID of the Execution this Metric belongs to |
| metricThresholds        | List of any thresholds set on this Metric. Only included if a step defining a Metric has been executed in a Scenario |
| data            | Key/value pairs of any values recorded, keyed by their timestamp |

Example: 

```
[
  {
​    "data": {
      "1572260858613": "5",
      "1572260865985": "7"
​    },
​    "executionId": "7c132ad3-f126-2c1d-7fe1-42ac6234e145",
​    "id": "6f122fa4-a219-2a2f-7be5-81bd2346b010",
​    "metricThresholds": [
​      {
​        "endTime": 1572260865985,
​        "startTime": 1572260858613,
​        "type": "less than",
​        "value": 10
​      }
​    ],
​    "name": "Example Metric"
  }
]
```

# Get Execution Metric

Get a single Metrics recorded during an Execution of a Scenario. Metrics are only recorded if a step has been executed which starts recording.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/executions/{executionId}/metrics/{metricId} |
| **HTTP Method**  | GET                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| executionId          | ID of the Execution | Yes          | 
| metricId | ID of the Metric | Yes |

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |

### Body

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | ID of the Metric (unique within the context of the Execution) |
| name              | Name of the Metric |
| executionId         | ID of the Execution this Metric belongs to |
| metricThresholds        | List of any thresholds set on this Metric. Only included if a step defining a Metric has been executed in a Scenario |
| data            | Key/value pairs of any values recorded, keyed by their timestamp |

Example: 

```
{
​    "data": {
    "1572260858613": "5",
    "1572260865985": "7"
​    },
​    "executionId": "7c132ad3-f126-2c1d-7fe1-42ac6234e145",
​    "id": "6f122fa4-a219-2a2f-7be5-81bd2346b010",
​    "metricThresholds": [
​      {
​        "endTime": 1572260865985,
​        "startTime": 1572260858613,
​        "type": "less than",
​        "value": 10
​      }
​    ],
​    "name": "Example Metric"
}
```

# Cancel Execution

Cancel a currently running Execution. Any steps currently executing may still complete but future steps will be cancelled.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/executions/{executionId}/cancel |
| **HTTP Method**  | POST                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| executionId          | ID of the Execution | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 202 (Accepted) |

### Body

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| success           | True, if the Execution was cancelled. Will return false only if the Execution had already completed, so could not be cancelled |
