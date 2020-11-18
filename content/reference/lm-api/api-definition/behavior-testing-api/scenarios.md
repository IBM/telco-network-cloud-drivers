---
title: Scenarios
weight: 0
---

The following details the API to manage Scenarios within LM.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Create Scenario

Create a new Scenario

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/scenarios |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**       | **Description**                                              | **Mandatory** |
| ----------------------- | ------------------------------------------------------------ | ------------- |
| name                    | Name of the Scenario                                 | Yes           |
| description             | Supplied description of the Scenario | No           |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | Yes |
| stages                  | A list of stages, each containing the steps to execute in this Scenario | Yes           |
| assemblyActors          | A list of Assembly Configurations to use within the Scenario | Yes           |

Each `stages` entry contains the following fields:

| **Field**       | **Description**                                              | **Mandatory** |
| ----------------------- | ------------------------------------------------------------ | ------------- |
| name                    | Name of the Stage                                 | Yes           |
| steps             | List of steps to execute in this Stage | Yes           |

Each `assemblyActors` entry contains the following fields:

| **Field**       | **Description**                                              | **Mandatory** |
| ----------------------- | ------------------------------------------------------------ | ------------- |
| instanceName            | Name to refer to this actor throughout the Scenario. If the instance is one to be instantiated, this name will be used as the instance name                                | Yes           |
| assemblyConfigurationId | ID of the Assembly Configuration to instantiate this instance from | Yes (if provided is false)         |
| initialState | State to create the instance in (Installed, Inactive, Active) | Yes (if provided is false)         |
| uninstallOnExit | Enable/disable the uninstallation of the instance after the Scenario completes successfully | Yes (if provided is false)         |
| provided | Dictates if the actor is an existing instance of an Assembly OR to be instantiated from an Assembly Configuration | Yes         |

Example:

```
{
​    "name": "test-scale-in",
​    "projectId": "assembly::Test::1.0",
​    "description": "description",
​    "stages": [
​      {
​        "name": "Test Stage",
​        "steps": [
​          {
​            "stepDefinitionName": "IntentEngine::CreateAssembly"
​            "properties": {
​              "additionalProp1": "string",
​              "additionalProp2": "string",
​              "additionalProp3": "string"
​            },
​          }
​        ]
​      }
​    ],
​    "assemblyActors": [
​      {
​        "assemblyConfigurationId": "7f456ac3-a523-2c1d-2cd1-42dc6124b012",
​        "initialState": "Active",
​        "instanceName": "TestInstance",
​        "provided": false,
​        "uninstallOnExit": true
​      }
​    ]
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

### Body

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| id                      | ID assigned to the Scenario
| name                    | Name of the Scenario                                 | 
| description             | Supplied description of the Scenario |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | 
| stages                  | A list of stages, each containing the steps to execute in this Scenario |
| assemblyActors          | A list of Assembly Configurations to use within the Scenario |
| createdAt         | Date and time the Scenario instance was created |
| lastModifiedAt    | Date and time the Scenario instance was last modified |

Each `stages` entry contains the following fields:

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| name            | Name of the Stage  |
| steps           | List of steps to execute in this Stage | 

Each `assemblyActors` entry contains the following fields:

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| instanceName            | Name to refer to this actor throughout the Scenario. If the instance is one to be instantiated, this name will be used as the instance name                                | 
| assemblyConfigurationId | ID of the Assembly Configuration to instantiate this instance from | 
| initialState | State to create the instance in (Installed, Inactive, Active) |
| uninstallOnExit | Enable/disable the uninstallation of the instance after the Scenario completes successfully | 
| provided | Dictates if the actor is an existing instance of an Assembly OR to be instantiated from an Assembly Configuration |

Example:
```
{
​    "id": "8e266bc5-e613-4b0d-9ae0-50db6454b026",
​    "name": "test-scale-in",
​    "projectId": "assembly::Test::1.0",
​    "description": "description",
    "createdAt": "2019-03-01T14:41:07.716Z",
​    "lastModifiedAt": "2019-03-01T14:41:07.716Z",
​    "stages": [
​      {
​        "name": "Test Stage",
​        "steps": [
​          {
​            "stepDefinitionName": "IntentEngine::CreateAssembly"
​            "properties": {
​              "additionalProp1": "string",
​              "additionalProp2": "string",
​              "additionalProp3": "string"
​            },
​          }
​        ]
​      }
​    ],
​    "assemblyActors": [
​      {
​        "assemblyConfigurationId": "7f456ac3-a523-2c1d-2cd1-42dc6124b012",
​        "initialState": "Active",
​        "instanceName": "TestInstance",
​        "provided": false,
​        "uninstallOnExit": true
​      }
​    ]
}
```

# Update Scenario

Update a Scenario

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/scenarios/{scenarioId} |
| **HTTP Method**  | PUT                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| scenarioId          | ID of the Scenario | Yes          | 

### Body

| **Field**       | **Description**                                              | **Mandatory** |
| ----------------------- | ------------------------------------------------------------ | ------------- |
| name                    | Name of the Scenario                                 | Yes           |
| description             | Supplied description of the Scenario | Yes           |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | Yes |
| stages                  | A list of stages, each containing the steps to execute in this Scenario | Yes           |
| assemblyActors          | A list of Assembly Configurations to use within the Scenario | Yes           |

Each `stages` entry contains the following fields:

| **Field**       | **Description**                                              | **Mandatory** |
| ----------------------- | ------------------------------------------------------------ | ------------- |
| name                    | Name of the Stage                                 | Yes           |
| steps             | List of steps to execute in this Stage | Yes           |

Each `assemblyActors` entry contains the following fields:

| **Field**       | **Description**                                              | **Mandatory** |
| ----------------------- | ------------------------------------------------------------ | ------------- |
| instanceName            | Name to refer to this actor throughout the Scenario. If the instance is one to be instantiated, this name will be used as the instance name                                | Yes           |
| assemblyConfigurationId | ID of the Assembly Configuration to instantiate this instance from | Yes (if provided is false)         |
| initialState | State to create the instance in (Installed, Inactive, Active) | Yes (if provided is false)         |
| uninstallOnExit | Enable/disable the uninstallation of the instance after the Scenario completes successfully | Yes (if provided is false)         |
| provided | Dictates if the actor is an existing instance of an Assembly OR to be instantiated from an Assembly Configuration | Yes         |

Example:

```
{
​    "name": "test-scale-in",
​    "projectId": "assembly::Test::1.0",
​    "description": "description",
​    "stages": [
​      {
​        "name": "Test Stage",
​        "steps": [
​          {
​            "stepDefinitionName": "IntentEngine::CreateAssembly"
​            "properties": {
​              "additionalProp1": "string",
​              "additionalProp2": "string",
​              "additionalProp3": "string"
​            },
​          }
​        ]
​      }
​    ],
​    "assemblyActors": [
​      {
​        "assemblyConfigurationId": "7f456ac3-a523-2c1d-2cd1-42dc6124b012",
​        "initialState": "Active",
​        "instanceName": "TestInstance",
​        "provided": false,
​        "uninstallOnExit": true
​      }
​    ]
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |

### Body

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| id                      | ID assigned to the Scenario
| name                    | Name of the Scenario                                 | 
| description             | Supplied description of the Scenario |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | 
| stages                  | A list of stages, each containing the steps to execute in this Scenario |
| assemblyActors          | A list of Assembly Configurations to use within the Scenario |
| createdAt         | Date and time the Scenario instance was created |
| lastModifiedAt    | Date and time the Scenario instance was last modified |

Each `stages` entry contains the following fields:

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| name            | Name of the Stage  |
| steps           | List of steps to execute in this Stage | 

Each `assemblyActors` entry contains the following fields:

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| instanceName            | Name to refer to this actor throughout the Scenario. If the instance is one to be instantiated, this name will be used as the instance name                                | 
| assemblyConfigurationId | ID of the Assembly Configuration to instantiate this instance from | 
| initialState | State to create the instance in (Installed, Inactive, Active) |
| uninstallOnExit | Enable/disable the uninstallation of the instance after the Scenario completes successfully | 
| provided | Dictates if the actor is an existing instance of an Assembly OR to be instantiated from an Assembly Configuration |

Example:
```
{
​    "id": "8e266bc5-e613-4b0d-9ae0-50db6454b026",
​    "name": "test-scale-in",
​    "projectId": "assembly::Test::1.0",
​    "description": "description",
    "createdAt": "2019-03-01T14:41:07.716Z",
​    "lastModifiedAt": "2019-03-01T14:41:07.716Z",
​    "stages": [
​      {
​        "name": "Test Stage",
​        "steps": [
​          {
​            "stepDefinitionName": "IntentEngine::CreateAssembly"
​            "properties": {
​              "additionalProp1": "string",
​              "additionalProp2": "string",
​              "additionalProp3": "string"
​            },
​          }
​        ]
​      }
​    ],
​    "assemblyActors": [
​      {
​        "assemblyConfigurationId": "7f456ac3-a523-2c1d-2cd1-42dc6124b012",
​        "initialState": "Active",
​        "instanceName": "TestInstance",
​        "provided": false,
​        "uninstallOnExit": true
​      }
​    ]
}
```

# Remove Scenario

Remove a Scenario (and all it's executions)

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/scenarios/{scenarioId} |
| **HTTP Method**  | DELETE                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| scenarioId          | ID of the Scenario | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 204 (No Content) |

# Get all Scenarios

Retrieve all Scenarios in a behaviour testing Project (descriptor)

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/scenarios?projectId={projectId} |
| **HTTP Method**  | GET                     |

### Query Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| projectId                      | ID of the behaviour testing project (usually the descriptor name) | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |
 
### Body

The body will contain a single list of Scenarios. Each Scenario will have the following fields:


| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| id                      | ID assigned to the Scenario
| name                    | Name of the Scenario                                 | 
| description             | Supplied description of the Scenario |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | 
| stages                  | A list of stages, each containing the steps to execute in this Scenario |
| assemblyActors          | A list of Assembly Configurations to use within the Scenario |
| createdAt         | Date and time the Scenario instance was created |
| lastModifiedAt    | Date and time the Scenario instance was last modified |

Each `stages` entry contains the following fields:

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| name            | Name of the Stage  |
| steps           | List of steps to execute in this Stage | 

Each `assemblyActors` entry contains the following fields:

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| instanceName            | Name to refer to this actor throughout the Scenario. If the instance is one to be instantiated, this name will be used as the instance name                                | 
| assemblyConfigurationId | ID of the Assembly Configuration to instantiate this instance from | 
| initialState | State to create the instance in (Installed, Inactive, Active) |
| uninstallOnExit | Enable/disable the uninstallation of the instance after the Scenario completes successfully | 
| provided | Dictates if the actor is an existing instance of an Assembly OR to be instantiated from an Assembly Configuration |

Example:
```
[
  {
  ​    "id": "8e266bc5-e613-4b0d-9ae0-50db6454b026",
  ​    "name": "test-scale-in",
  ​    "projectId": "assembly::Test::1.0",
  ​    "description": "description",
      "createdAt": "2019-03-01T14:41:07.716Z",
  ​    "lastModifiedAt": "2019-03-01T14:41:07.716Z",
  ​    "stages": [
  ​      {
  ​        "name": "Test Stage",
  ​        "steps": [
  ​          {
  ​            "stepDefinitionName": "IntentEngine::CreateAssembly"
  ​            "properties": {
  ​              "additionalProp1": "string",
  ​              "additionalProp2": "string",
  ​              "additionalProp3": "string"
  ​            },
  ​          }
  ​        ]
  ​      }
  ​    ],
  ​    "assemblyActors": [
  ​      {
  ​        "assemblyConfigurationId": "7f456ac3-a523-2c1d-2cd1-42dc6124b012",
  ​        "initialState": "Active",
  ​        "instanceName": "TestInstance",
  ​        "provided": false,
  ​        "uninstallOnExit": true
  ​      }
  ​    ]
  },
  ...
]
```

# Get Scenario

Retrieve a single Scenario by ID

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/scenarios/{scenarioId} |
| **HTTP Method**  | GET                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| scenarioId          | ID of the Scenario | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |

### Body

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| id                      | ID assigned to the Scenario
| name                    | Name of the Scenario                                 | 
| description             | Supplied description of the Scenario |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | 
| stages                  | A list of stages, each containing the steps to execute in this Scenario |
| assemblyActors          | A list of Assembly Configurations to use within the Scenario |
| createdAt         | Date and time the Scenario instance was created |
| lastModifiedAt    | Date and time the Scenario instance was last modified |

Each `stages` entry contains the following fields:

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| name            | Name of the Stage  |
| steps           | List of steps to execute in this Stage | 

Each `assemblyActors` entry contains the following fields:

| **Field**       | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ | 
| instanceName            | Name to refer to this actor throughout the Scenario. If the instance is one to be instantiated, this name will be used as the instance name                                | 
| assemblyConfigurationId | ID of the Assembly Configuration to instantiate this instance from | 
| initialState | State to create the instance in (Installed, Inactive, Active) |
| uninstallOnExit | Enable/disable the uninstallation of the instance after the Scenario completes successfully | 
| provided | Dictates if the actor is an existing instance of an Assembly OR to be instantiated from an Assembly Configuration |

Example:
```
{
​    "id": "8e266bc5-e613-4b0d-9ae0-50db6454b026",
​    "name": "test-scale-in",
​    "projectId": "assembly::Test::1.0",
​    "description": "description",
    "createdAt": "2019-03-01T14:41:07.716Z",
​    "lastModifiedAt": "2019-03-01T14:41:07.716Z",
​    "stages": [
​      {
​        "name": "Test Stage",
​        "steps": [
​          {
​            "stepDefinitionName": "IntentEngine::CreateAssembly"
​            "properties": {
​              "additionalProp1": "string",
​              "additionalProp2": "string",
​              "additionalProp3": "string"
​            },
​          }
​        ]
​      }
​    ],
​    "assemblyActors": [
​      {
​        "assemblyConfigurationId": "7f456ac3-a523-2c1d-2cd1-42dc6124b012",
​        "initialState": "Active",
​        "instanceName": "TestInstance",
​        "provided": false,
​        "uninstallOnExit": true
​      }
​    ]
}
```