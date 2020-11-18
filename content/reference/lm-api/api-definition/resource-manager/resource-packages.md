---
title: Resource Packages
weight: 110
---

The following section details the APIs used to manage Resource packages intended for the Brent (carrier-grade Resource Manager included with LM).

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Onboard Resource Package

Adds a new Resource package to Brent

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/resource-packages |
| **Content-Type:**  | multipart/form-data        |
| **HTTP Method**  | POST                     |

### Form Data

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| file                               | The Resource package file | Yes           |

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 201 |

### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to Resource package |

# Update Resource Package

Update an existing Resource package with new content

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/resource-packages/{name} |
| **Content-Type:**  | multipart/form-data        |
| **HTTP Method**  | PUT                     |

### Query Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| name                               | Name of the existing Resource package | Yes           |

### Form Data

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| file                               | The Resource package file | Yes           |

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 200 |

# Remove Resource Package

Remove an existing Resource package

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/resource-packages/{name} |
| **HTTP Method**  | DELETE                     |

### Path Parameters:

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| name                               | Name of the existing Resource package | Yes           |

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 204 |