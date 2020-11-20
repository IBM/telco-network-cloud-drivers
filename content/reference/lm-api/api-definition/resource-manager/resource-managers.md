---
title: Resource Managers
weight: 100
---

The following details the API used to manage Resource Managers within TNC-O.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Onboard Resource Manager

Creates a record of a Resource Manager within TNC-O and begins the onboarding process. When this request is placed TNC-O will register the Resource Manager and then request details of all the Resource types that it manages.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/resource-managers |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field** | **Description**                                              | **Mandatory** |
| --------- | ------------------------------------------------------------ | ------------- |
| name      | The name the Resource Manager to be known by | Yes           |
| url       | The url where TNC-O can find the Resource Manager interface | Yes           |

Example:

```
{

  "name": "test",
  "url": "http://localhost:8295/api/resource-manager"
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
| location                         | Endpoint to Resource Manager resource |

### Body

The body will include a report on the onboarding process, which specifies the Deployment Locations and Resource types discovered from the Resource Manager and the impact this had on TNC-O.

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| resourceManagerOperation         | The operation attempted on the Resource Manager (this will be ADD) |
| deploymentLocations | List of reports for the DeploymentLocation onboarding operations attempted, indexed by name |
| resourceTypes | List of reports for the ResourceType onboarding operations attempted, indexed by name |

Each entry for `deploymentLocations` and `resourceTypes` will have the following fields:

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| operation         |  Operation attempted on the Deployment Location or Resource Descriptor (ADD/UPDATE) |
| success | Boolean indicating if the operation was successful or not |
| reason | A description of the operation's result. Can be used for success or failure although the most frequent use is to explain why an operation failed |
| details | Any additional details that should be known about the result of this operation |

# Get Resource Manager 

Retrieve information about a Resource Manager within TNC-O.  The ID in the request is the unique name of the Resource Manager as defined by the “name” field when it was created.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/resource-managers/{id}  |
| **Content-Type** | application/json         |
| **HTTP Method**  | METHOD                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| id                      | ID (name) of the Resource Manager to retrieve | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |
 
### Body

| **Field** | **Description**                                              |
| --------- | ------------------------------------------------------------ |
| name      | The name the Resource Manager |
| type      | Type of the Resource Manager | 
| url       | The url where TNC-O can find the Resource Manager interface |

Example:

```
{
  "name": "test",
  "type": "test-rm",
  "url": "http://localhost:8295/api/resource-manager"
}
```

# Update Resource Manager

Updates a record of a Resource Manager within TNC-O and re-executes the onboarding process. The ID in this request if the same as the name in the request body. 

When this request is made TNC-O will contact the Resource Manager to see if any new Resource types have been added since the initial creation or last update. No pre-existing Resources will be overridden by this request. To change an existing Resource descriptor, the descriptor would have to be removed from TNC-O and then this request fired.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/resource-managers/{id} |
| **Content-Type** | application/json         |
| **HTTP Method**  | PUT                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| id                      | ID (name) of the Resource Manager to update | Yes          | 

### Body

| **Field** | **Description**                                              | **Mandatory** |
| --------- | ------------------------------------------------------------ | ------------- |
| name      | The name the Resource Manager to be known by | Yes           |
| url       | The url where TNC-O can find the Resource Manager interface | Yes           |

Example:

```
{

  "name": "test",
  "url": "http://localhost:8295/api/resource-manager"
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |
 
### Body

The body will include a report on the onboarding process, which specifies the Deployment Locations and Resource types discovered from the Resource Manager and the impact this had on TNC-O.

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| resourceManagerOperation         | The operation attempted on the Resource Manager (this will be UPDATE) |
| deploymentLocations | List of reports for the DeploymentLocation onboarding operations attempted, indexed by name |
| resourceTypes | List of reports for the ResourceType onboarding operations attempted, indexed by name |

Each entry for `deploymentLocations` and `resourceTypes` will have the following fields:

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| operation         |  Operation attempted on the Deployment Location or Resource Descriptor (ADD/UPDATE) |
| success | Boolean indicating if the operation was successful or not |
| reason | A description of the operation's result. Can be used for success or failure although the most frequent use is to explain why an operation failed |
| details | Any additional details that should be known about the result of this operation |

# Remove Resource Manager

Remove the record of a Resource Manager within TNC-O.  The ID in this request is the name that the Resource Manager instance is known by TNC-O.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/resource-managers/{id} |
| **HTTP Method**  | DELETE                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| id                      | ID (name) of the Resource Manager to update | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 204 (No Content) |