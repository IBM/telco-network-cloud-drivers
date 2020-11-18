---
title: Descriptors
weight: 0
---

The following details the API to manage descriptors within TNCO. Assembly descriptors can be added, listed, updated and deleted. Resource descriptors can be listed and deleted but can only be added or updated through the Resource Manager API.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Create Assembly Descriptor 

Creates a new Assembly descriptor

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/catalog/descriptors |
| **Content-Type:**  | application/yaml         |
| **HTTP Method**  | POST                     |

### Body

The body content should be an Assembly descriptor in YAML format. See [Assembly Descriptor YAML specification](/reference/descriptor-specification/assembly-descriptor)

## Response

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Response Code** | 201 (Created)  |

### Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ | 
| location                         | Endpoint to descriptor resource |

### Body

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| descriptorName                   | The name of the descriptor                               |
| validationWarnings               | Warnings returned from the validation of the descriptor (if any) |

Example:

```
{
  "descriptorName": "assembly::example::1.0",
  "validationWarnings": []
}
```

# Remove Assembly Descriptor

Removes an Assembly descriptor from TNCO.

## Request

| **Aspect**         | **Value**                                 |
| ------------------ | ----------------------------------------- |
| **Endpoint URL** | /api/catalog/descriptors/{descriptorName} |
| **HTTP Method**  | DELETE                                    |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| descriptorName                               | name of the descriptor to remove | Yes           |

The descriptor name is the full name of the descriptor, e.g. assembly::t_single::1.0. This will need to be encoded appropriately for use as a url – i.e. assembly%3A%3At_single%3A%3A1.0

## Response

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Response Code** | 204 (No content)  | 

# Update Assembly Descriptor

Updates an existing Assembly descriptor in TNCO.

## Request

| **Aspect**         | **Value**                                |
| ------------------ | ---------------------------------------- |
| **Endpoint URL** | /api/catalog/descriptors/{descriptorName} |
| **Content-Type:**  | application/yaml                         |
| **HTTP Method**  | PUT                                      |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| descriptorName                               | name of the descriptor to retrieve | Yes           |

The descriptor name is the full name of the descriptor, e.g. assembly::t_single::1.0. This will need to be encoded appropriately for use as a url – i.e. assembly%3A%3At_single%3A%3A1.0

### Body

The body content should be an Assembly descriptor in YAML format. See [Assembly Descriptor YAML specification](/reference/descriptor-specification/assembly-descriptor)

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Response Code** | 200 (OK)  |

### Body

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| descriptorName                   | The name of the descriptor                               |
| validationWarnings               | Warnings returned from the validation of the descriptor (if any) |

Example:

```
{
  "descriptorName": "assembly::example::1.0",
  "validationWarnings": []
}
```

# Get a summary of all Descriptors

This request returns a summary of the descriptors known to TNCO.

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/catalog/descriptors |
| **HTTP Method**  | GET                      |

## Response

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Response Code** | 200 (OK) |

### Body

The body includes a single list of summaries, each with the following fields:

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| name                               | The name of the descriptor                              |
| description               | Description of the descriptor                             |
| links                          | References to the descriptor resource endpoint |

Example: 

```
[

  {
​    "name": "resource::t_simple::1.0",
​    "description": "resource for t_simple",
​    "links": [
​      {
​        "rel": "self",
​        "href": "http://192.168.99.100:8280/api/ /catalog/descriptors/resource::t_simple::1.0"
​      }
​    ]
  },
  {
​    "name": "resource::h_simple::1.0",
​    "description": "resource for  t_simple",
​    "links": [
​      {
​        "rel": "self",
​        "href": "http://192.168.99.100:8280 /api/catalog/descriptors/resource::h_simple::1.0"
​      }
​    ]
  }
]
```

# Get Descriptor by Name

Returns an existing descriptor from TNCO.

## Request

| **Aspect**         | **Value**                                 |
| ------------------ | ----------------------------------------- |
| **Endpoint URL** | /api/catalog/descriptors/{descriptorName} |
| **HTTP Method**  | Get                                       |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| descriptorName                               | name of the descriptor to retrieve | Yes           |

The descriptor name is the full name of the descriptor, e.g. assembly::t_single::1.0. This will need to be encoded appropriately for use as a url – i.e. assembly%3A%3At_single%3A%3A1.0

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/yaml |
| **Response Code** | 200 (OK)  |

### Body

The body content will be a descriptor in YAML format. See [Assembly Descriptor YAML specification](/reference/descriptor-specification/assembly-descriptor)
