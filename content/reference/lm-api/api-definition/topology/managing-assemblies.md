---
title: Assembly Intents
weight: 0
---

This section covers the APIs used to manage Assembly instances during their life. It is based around the state model of Telco Network Cloud Orchestration (TNCO)

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Create Assembly

Creates a new instance of an Assembly based on the given descriptor and the properties.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/intent/createAssembly |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**                        | **Description**                                                 | **Mandatory** |
| -------------------------------- | --------------------------------------------------------------- | --------- |
| assemblyName                     | A unique name by which this assembly will be known externally. This cannot contain spaces, consecutive underscores or start with a numeric character.                             | Yes       |
| descriptorName                   | The descriptor name from which this assembly will be created | Yes |
| intendedState                    | The final intended state that the assembly should be brought into (Installed, Inactive, Active) | Yes |
| properties                       | An optional map of name and string value properties that is supplied to the new assembly | No |

Example:

```
{
  "assemblyName": "WED_102",
  "descriptorName": "assembly::t_single::1.0",
  "intendedState": "Active",
  "properties": {
      "data": "exampleValue",
      "deploymentLocation": "admin@local"
  }
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 201 (Created) |
 
### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to process created to handle the intent |

# Change Assembly State

Request LM to transition an Assembly instance from one state to another.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/intent/changeAssemblyState |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**                        | **Description**                                                 | **Mandatory** |
| -------------------------------- | --------------------------------------------------------------- | --------- |
| assemblyName |	The name of the Assembly instance | Yes (if assemblyId not supplied) |
| assemblyId |	The ID of the Assembly instance | Yes (if assemblyName not supplied) |
| intendedState | The state the Assembly instance will be transitioned to (Installed, Inactive, Active) | Yes |

Example of changing state of Assembly instance using name:
```
{
  "assemblyName": "WED_102",
  "intendedState": "Inactive"
}
```

Example of changing state of Assembly instance using id:
```
{
  "assemblyId": "1c3bd18a-05e9-4f49-b510-0e4785b2f0ae",
  "intendedState": "Inactive"
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 201 (Created) |
 
### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to process created to handle the intent |

# Delete Assembly

Request LM to remove an Assembly instance

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/intent/deleteAssembly |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**                        | **Description**                                                 | **Mandatory** |
| -------------------------------- | --------------------------------------------------------------- | --------- |
| assemblyName |	The name of the Assembly instance | Yes (if assemblyId not supplied) |
| assemblyId |	The ID of the Assembly instance | Yes (if assemblyName not supplied) |

Example of removing an Assembly instance using name:
```
{
  "assemblyName": "WED_102"
}
```

Example of removing an Assembly instance using id:
```
{
  "assemblyId": "1c3bd18a-05e9-4f49-b510-0e4785b2f0ae"
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 201 (Created) |
 
### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to process created to handle the intent |

# Heal Component

Request a broken component of an Assembly be healed. 

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/intent/healAssembly |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**                        | **Description**                                                 | **Mandatory** |
| -------------------------------- | --------------------------------------------------------------- | --------- |
| assemblyName |	The name of the Assembly instance | Yes (if assemblyId not supplied) |
| assemblyId |	The ID of the Assembly instance | Yes (if assemblyName not supplied) |
| brokenComponentName |	The unique name by which the broken component is known externally | Yes (if brokenComponentId and brokenComponentMetricKey are not supplied) |
| brokenComponentId |	The unique internal id for the broken component | Yes (if brokenComponentName and brokenComponentMetricKey are not supplied) |
| brokenComponentMetricKey | The unique metric key by which the broken component is known externally | Yes (if brokenComponentId and brokenComponentName are not supplied)


Examples:

Heal assembly component using names:
```
{
  "assemblyName": "WED_102",
  "brokenComponentName": "WED_102__t_single"
}
```

```
{
  "assemblyId": "5fd27c1e-403c-402b-a033-fef0940974d5",
  "brokenComponentId": "15a07604-377d-4fa2-955f-2a379560c24d"
}
```

```
{
  "assemblyName": "WED_102",
  "brokenComponentId": "15a07604-377d-4fa2-955f-2a379560c24d"
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 201 (Created) |
 
### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to process created to handle the intent |

# Scale Out Component

Request to scale out a cluster component of an Assembly instance. 

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/intent/scaleOutAssembly |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**                        | **Description**                                                 | **Mandatory** |
| -------------------------------- | --------------------------------------------------------------- | --------- |
| assemblyName |	The name of the Assembly instance | Yes (if assemblyId not supplied) |
| assemblyId |	The ID of the Assembly instance | Yes (if assemblyName not supplied) |
| clusterName | The name of the cluster to be scaled out | Yes |

Example:

```
{
  "assemblyName": "WED_102",
  "clusterName": "storage_cluster"
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 201 (Created) |
 
### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to process created to handle the intent |

# Scale In Component

Request to scale in a cluster component of an Assembly instance. 

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/intent/scaleInAssembly |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**                        | **Description**                                                 | **Mandatory** |
| -------------------------------- | --------------------------------------------------------------- | --------- |
| assemblyName |	The name of the Assembly instance | Yes (if assemblyId not supplied) |
| assemblyId |	The ID of the Assembly instance | Yes (if assemblyName not supplied) |
| clusterName | The name of the cluster to be scaled in | Yes |

Example:

```
{
  "assemblyName": "WED_102",
  "clusterName": "storage_cluster"
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 201 (Created) |
 
### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to process created to handle the intent |

# Upgrade Assembly

Make changes to the descriptor and/or property values of an Assembly instance. This may cause the state of the Assembly components to change while the upgrade is achieved.  

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/intent/upgradeAssembly |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**                        | **Description**                                                 | **Mandatory** |
| -------------------------------- | --------------------------------------------------------------- | --------- |
| assemblyName |	The name of the Assembly instance | Yes (if assemblyId not supplied) |
| assemblyId |	The ID of the Assembly instance | Yes (if assemblyName not supplied) |
| descriptorName                   | The optional descriptor name to which this assembly should be upgraded | No |
| properties                       | An optional map of name and string value properties that updated values for the assembly | No |

Example:

```
{
  "assemblyName": "WED_102",
  "descriptorName": "assembly::t_single::2.0",
  "properties": {
      "data": "exampleValue",
      "deploymentLocation": "demo@local"
  }
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 201 (Created) |
 
### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to process created to handle the intent |
