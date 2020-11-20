---
title: Deployment Location
weight: 70
---

The following details the API used to manage Deployment Locations within TNC-O.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Create a new Deployment Location 

Creates a new Deployment Location to be created 

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/deploymentLocations |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**                        | **Description**                                                 | Mandatory |
| -------------------------------- | --------------------------------------------------------------- | --------- |
| name                             | The name of the Deployment Location                             | Yes       |
| description                      | Description of the Deployment Location                          | No        |
| resourceManager                  | ID of the Resource Manager to manage the Deployment Location | Yes       |
| infrastructureType               | Type of infrastructure managed at this Deployment Location      | Yes       |
| infrastructureSpecificProperties | Set of name-value pairs to be passed to the Resource Manager managing this location. The list of properties is dependent upon the location but is usually where connection details for the location are set, so the Resource Manager can reach the location | No |

Example:

```
{

​    "name":"London-4",
​    "description":"London 4 Data Center - OpenStack",
​    "resourceManager":"8e266bc5-e613-4b0d-9ae0-50db6454b026",
​    "infrastructureType":"docker",
​    "infrastructureSpecificProperties": [
​        {
​            "propertyName-1" : "propertyValue-1",
​            "propertyName-2" : "propertyValue-2"
​        }
​    ]
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 201 (Created) |
 
### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to Deployment Location resource |

### Body

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| id                               | Unique ID of the Deployment Location                                   |
| name                             | The name of the Deployment Location                             |
| description                      | Description of the Deployment Location                          |
| resourceManager                  | ID of the Resource Manager that manages the Deployment Location |
| infrastructureType               | Type of infrastructure managed at this Deployment Location                  |

# Update Deployment Location 

Update either the description or the infrastructure properties of a Deployment Location.

## Request 

| **Aspect**       | **Value**                                                    |
| ---------------- | ------------------------------------------------------------ |
| **Endpoint URL** | /api/deploymentLocation/{deployLocId}                        |
| **Content-Type** | application/json                                             |
| **HTTP Method**  | PUT                                                          |

### Body

| **Field**                        | **Description**                                                 | Mandatory |
| -------------------------------- | --------------------------------------------------------------- | --------- |
| description                      | Description of the Deployment Location                          | No        |
| infrastructureSpecificProperties | Set of name-value pairs to be passed to the Resource Manager managing this location. The list of properties is dependent upon the location but is usually where connection details for the location are set, so the Resource Manager can reach the location | No |

Example: 

```
{
​    "description":"London 4 Data Center - OpenStack",
​    "infrastructureSpecificProperties": [
​        {
​            "propertyName-1" : "propertyValue-1",
​            "propertyName-2" : "propertyValue-2"
​        }
​    ]
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 200 (OK) |

# Remove Deployment Location

Remove a Deployment Location from TNC-O. 
{{%note %}}
NOTE: the delete cannot happen if there are currently instantiated Resources at this location.
{{%/note %}}

## Request Format 

| **Aspect**       | **Value**                                                    |
| ---------------- | ------------------------------------------------------------ |
| **Endpoint URL** | /api/deploymentLocation/{deployLocId}                        |
| **HTTP Method**  | DELETE                                                       |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| deployLocId                      | The unique ID of the Deployment Location being removed | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Response Code** | 204 (No Content) |


# Get all Deployment Locations 

Get a  list of all existing Deployment Locations. An optional match against a partial name string or Resource Manager name can be provided.

## Request 

| **Aspect**       | **Value**                 |
| ---------------- | ------------------------- |
| **Endpoint URL** | /api/deploymentLocations?{query-params} |
| **HTTP Method**  | GET                       |
| **Parameters**   | Name                      |

### Query Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| name                               | name to use as a partial name match in order to file the results | No           | 
| resourceManagerName                               | name of a Resource Manager to reduce the results to the locations associated with it | No           | 

## Response

| **Aspect**        | **Value**                                                |
| ----------------- | -------------------------------------------------------- |
| **Response Code** | 200 (OK) |
| **Content-Type**  | application/json |

### Body

The body includes a single list of locations, each with the following fields:

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| id                               | Unique ID of the Deployment Location                                   |
| name                             | The name of the Deployment Location                             |
| description                      | Description of the Deployment Location                          |
| resourceManager                  | ID of the Resource Manager that manages the Deployment Location |
| infrastructureType               | Type of infrastructure managed at this Deployment Location                  |

Example: 

```
[
​    {
​        "id":"London-4",
​        "name":"London-4",
​        "description":"London 4 Data Center - OpenStack",
​        "resourceManager":"8e266bc5-e613-4b0d-9ae0-50db6454b026",
​        "infrastructureType":"docker"
​    }
]
```


# Get Deployment Location

Request the details for a specific Deployment Location identified by it’s unique ID.

## Request

| **Aspect**       | **Value**                                                    |
| ---------------- | ------------------------------------------------------------ |
| **Endpoint URL** | /api/deploymentLocation/{deployLocId}                        |
| **HTTP Method**  | GET                                                          |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| deployLocId                      | The unique ID of the Deployment Location being requested | Yes          | 

## Response

| **Aspect**        | **Value**                                                  |
| ----------------- | ---------------------------------------------------------- |
| **Response Code** | 200 (OK) |
| **Content-Type**  | application/json |

### Body

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| id                               | Unique ID of the Deployment Location                                   |
| name                             | The name of the Deployment Location                             |
| description                      | Description of the Deployment Location                          |
| resourceManager                  | ID of the Resource Manager that manages the Deployment Location |
| infrastructureType               | Type of infrastructure managed at this Deployment Location                  |

Example:

```
{
​    "id":"8e266bc5-e613-4b0d-9ae0-50db6454b026",
​    "name":"London-4",
​    "description":"London 4 Data Center - Docker",
​    "resourceManager":"8e266bc5-e613-4b0d-9ae0-50db6454b026",
​    "infrastructureType":"docker"
}
```
