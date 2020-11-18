---
title: Resource Drivers
weight: 90
---

The following section details the APIs used to manage [Brent](/reference/resource-manager/brent) Resource drivers.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Onboard Resource Driver 

Onboard a new resource driver with Brent

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/resource-drivers |
| **Content-Type:**  | application/json OR application/yaml     |
| **HTTP Method**  | POST                     |

### Body

| **Field**                        | **Description**                                                 | **Mandatory** |
| -------------------------------- | --------------------------------------------------------------- | ------------- |
| type               | The type of the driver                           | Yes           |
| baseUri                          | The base URI of the Resource driver so it may be accessed from Brent | Yes           |
| certificate                          | An SSH certificate to communicate with an HTTPs-enabled Resource driver | Yes, if the baseUri is https           |

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 201 |

### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to Resource driver resource |

### Body

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| id                               | The ID assigned to the Resource driver                               |
| type               | The type of the driver                              |
| baseUri                          | The base URI of the Resource driver so it may be accessed from Brent |

# View Details of Resource Driver

View details of a resource driver

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/resource-drivers/{id} |
| **HTTP Method**  | GET                     |

### Path Parameters:

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| id                               | ID of the resource driver | Yes           |

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 200 |
| **Not Found Status Code** | 404 |

### Body

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| id                               | The ID assigned to the resource driver                               |
| type               | The type of the driver                              |
| baseUri                          | The base URI of the resource driver so it may be accessed from Brent |

# View Details of Resource Driver by Type

View details of a resource driver, retrieved by the type it manages

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/resource-drivers?type={type} |
| **HTTP Method**  | GET                     |

### Query Parameters:

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| type                               | type of the driver | Yes           |

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 200 |
| **Not Found Status Code** | 404 |

### Body

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| id                               | The ID assigned to the resource driver                               |
| type               | The type of the driver                              |
| baseUri                          | The base URI of the resource driver so it may be accessed from Brent |

# Remove Resource Driver

Remove a resource driver

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/resource-drivers/{id} |
| **HTTP Method**  | DELETE                     |

### Path Parameters:

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| id                               | ID of the resource driver | Yes           |

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 204 |
| **Not Found Status Code** | 404 |
