---
title: Assembly Configuration
weight: 0
---

The following details the API to manage Assembly Configurations within TNC-O.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Create Assembly Configuration

Create a new Assembly Configuration

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/assemblyConfigurations |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**         | **Description**                                                 | **Mandatory** |
| ----------------- | --------------------------------------------------------------- | ------------- |
| name              | Name of the Assembly Configuration | Yes |
| description       | Supplied description of the Assembly Configuration | No |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | Yes |
| descriptorName    | Name of the Assembly Descriptor to be instantiated in this configuration | Yes |
| properties        | Name-value pairs, each defining a property value to use when instantiating an Assembly from this configuration | No |

Example:

```
{
​  "name": "test",
​  "projectId": "assembly::Test::1.0",
​  "description": "description",
​  "descriptorName": "assembly::Test::1.0",
  "properties": {
​    "additionalProp1": "string",
​    "additionalProp2": "string",
​    "additionalProp3": "string"
​  }
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

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | Unique identifier of the Assembly Configuration |
| name              | Name of the Assembly Configuration |
| description       | Supplied description of the Assembly Configuration |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | 
| descriptorName    | Name of the Assembly Descriptor to be instantiated in this configuration |
| createdAt         | Date and time the Assembly Configuration instance was created |
| lastModifiedAt    | Date and time the Assembly Configuration instance was last modified |
| properties        | Name-value pairs, each defining a property value to use when instantiating an Assembly from this configuration |

Example:

```
{
​  "id": "8e266bc5-e613-4b0d-9ae0-50db6454b026",
​  "name": "test",
​  "projectId": "assembly::Test::1.0",
​  "description": "description",
​  "descriptorName": "assembly::Test::1.0",
​  "createdAt": "2019-03-01T10:07:21.289Z",
​  "lastModifiedAt": "2019-03-01T10:07:21.289Z",
  "properties": {
​    "additionalProp1": "string",
​    "additionalProp2": "string",
​    "additionalProp3": "string"
​  }
}
```

# Update Assembly Configuration

Update an Assembly Configuration details

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/assemblyConfigurations/{assemblyConfigurationId} |
| **HTTP Method**  | PUT                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| assemblyConfigurationId          | ID of the Assembly Configuration | Yes          | 

### Body

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| name              | Name of the Assembly Configuration |
| description       | Supplied description of the Assembly Configuration |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | 
| descriptorName    | Name of the Assembly Descriptor to be instantiated in this configuration |
| properties        | Name-value pairs, each defining a property value to use when instantiating an Assembly from this configuration |

Example:

```
{
​  "name": "test",
​  "projectId": "assembly::Test::1.0",
​  "description": "description",
​  "descriptorName": "assembly::Test::1.0",
  "properties": {
​    "additionalProp1": "string",
​    "additionalProp2": "string",
​    "additionalProp3": "string"
​  }
}
```

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |
 
### Body

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | Unique identifier of the Assembly Configuration |
| name              | Name of the Assembly Configuration |
| description       | Supplied description of the Assembly Configuration |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | 
| descriptorName    | Name of the Assembly Descriptor to be instantiated in this configuration |
| createdAt         | Date and time the Assembly Configuration instance was created |
| lastModifiedAt    | Date and time the Assembly Configuration instance was last modified |
| properties        | Name-value pairs, each defining a property value to use when instantiating an Assembly from this configuration |

Example:

```
{
​  "id": "8e266bc5-e613-4b0d-9ae0-50db6454b026",
​  "name": "test",
​  "projectId": "assembly::Test::1.0",
​  "description": "description",
​  "descriptorName": "assembly::Test::1.0",
​  "createdAt": "2019-03-01T10:07:21.289Z",
​  "lastModifiedAt": "2019-03-01T10:07:21.289Z",
  "properties": {
​    "additionalProp1": "string",
​    "additionalProp2": "string",
​    "additionalProp3": "string"
​  }
}
```

# Remove Assembly Configuration

Remove a Assembly Configuration

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/assemblyConfigurations/{assemblyConfigurationId} |
| **HTTP Method**  | DELETE                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| assemblyConfigurationId          | ID of the Assembly Configuration | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 204 (No Content) |

# Get all Assembly Configurations

Retrieve all Assembly Configurations in a behaviour testing Project (descriptor)

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/assemblyConfigurations?projectId={projectId} |
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

The body will contain a single list of Assembly Configurations. Each configuration will have the following fields:

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | Unique identifier of the Assembly Configuration |
| name              | Name of the Assembly Configuration |
| description       | Supplied description of the Assembly Configuration |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | 
| descriptorName    | Name of the Assembly Descriptor to be instantiated in this configuration |
| createdAt         | Date and time the Assembly Configuration instance was created |
| lastModifiedAt    | Date and time the Assembly Configuration instance was last modified |
| properties        | Name-value pairs, each defining a property value to use when instantiating an Assembly from this configuration |

Example:

```
[
  {
​    "id": "8e266bc5-e613-4b0d-9ae0-50db6454b026",
​    "name": "test",
​    "projectId": "assembly::Test::1.0",
​    "description": "description",
​    "descriptorName": "assembly::Test::1.0",
​    "createdAt": "2019-03-01T10:07:21.289Z",
​    "lastModifiedAt": "2019-03-01T10:07:21.289Z",
    "properties": {
​      "additionalProp1": "string",
​      "additionalProp2": "string",
​      "additionalProp3": "string"
​    }
  }
]
```

# Get Assembly Configuration

Retrieve a single Assembly Configuration by ID

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/assemblyConfigurations/{assemblyConfigurationId} |
| **HTTP Method**  | GET                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| assemblyConfigurationId          | ID of the Assembly Configuration | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |

### Body

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | Unique identifier of the Assembly Configuration |
| name              | Name of the Assembly Configuration |
| description       | Supplied description of the Assembly Configuration |
| projectId         | Unique identifier for the behaviour test Project this Assembly Configuration belongs to | 
| descriptorName    | Name of the Assembly Descriptor to be instantiated in this configuration |
| createdAt         | Date and time the Assembly Configuration instance was created |
| lastModifiedAt    | Date and time the Assembly Configuration instance was last modified |
| properties        | Name-value pairs, each defining a property value to use when instantiating an Assembly from this configuration |

Example:

```
{
​  "id": "8e266bc5-e613-4b0d-9ae0-50db6454b026",
​  "name": "test",
​  "projectId": "assembly::Test::1.0",
​  "description": "description",
​  "descriptorName": "assembly::Test::1.0",
​  "createdAt": "2019-03-01T10:07:21.289Z",
​  "lastModifiedAt": "2019-03-01T10:07:21.289Z",
  "properties": {
​    "additionalProp1": "string",
​    "additionalProp2": "string",
​    "additionalProp3": "string"
​  }
}
```
