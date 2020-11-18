---
title: Projects
weight: 0
---

The following details the API to manage Projects within TNCO. A Project is auto-created for every Assembly descriptor added to TNCO.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Create Project

Create a new Assembly Configuration

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/projects |
| **Content-Type** | application/json         |
| **HTTP Method**  | POST                     |

### Body

| **Field**         | **Description**                                                 | **Mandatory** |
| ----------------- | --------------------------------------------------------------- | ------------- |
| name              | Unique name of the Project | Yes |
| description       | Supplied description of the Project | No |

Example:

```
{
​  "name": "assembly::t_simple::1.0",
​  "description": "Project for assembly::t_simple::1.0"
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
| id                | ID assigned to the Project (will be the same as the name value) |
| name              | Name of the Project |
| description       | Supplied description of the Project |

Example:

```
{
  "id": "assembly::t_simple::1.0",
​  "name": "assembly::t_simple::1.0",
​  "description": "Project for assembly::t_simple::1.0"
}
```

# Update Project

Update a Project

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/projects/{projectId} |
| **HTTP Method**  | PUT                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| projectId          | ID of the Project | Yes          | 

### Body

| **Field**         | **Description**                                                 | **Mandatory** |
| ----------------- | --------------------------------------------------------------- | ------------- |
| name              | Unique name of the Project | Yes |
| description       | Supplied description of the Project | No |

Example:

```
{
​  "name": "assembly::t_simple::1.0",
​  "description": "Project for assembly::t_simple::1.0"
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
| id                | ID assigned to the Project (will be the same as the name value) |
| name              | Name of the Project |
| description       | Supplied description of the Project |

Example:

```
{
  "id": "assembly::t_simple::1.0",
​  "name": "assembly::t_simple::1.0",
​  "description": "Project for assembly::t_simple::1.0"
}
```

# Remove Project

Removes a Project and all contained Assembly Configurations, Scenarios and Scenario Executions.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/projects/{projectId} |
| **HTTP Method**  | DELETE                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| projectId          | ID of the Project | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 204 (No Content) |

# Get all Projects

Retrieve all Projects 

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/projects |
| **HTTP Method**  | GET                     |

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |
 
### Body

The body will contain a single list of Projects. Each entry will have the following fields:

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | ID assigned to the Project (will be the same as the name value) |
| name              | Name of the Project |
| description       | Supplied description of the Project |

Example:

```
{
  "id": "assembly::t_simple::1.0",
​  "name": "assembly::t_simple::1.0",
​  "description": "Project for assembly::t_simple::1.0"
}
```

# Get Project

Retrieve a single Project by ID

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/behaviour/projects/{projectId} |
| **HTTP Method**  | GET                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| projectId          | ID of the Project | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |

### Body

| **Field**         | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| id                | ID assigned to the Project (will be the same as the name value) |
| name              | Name of the Project |
| description       | Supplied description of the Project |

Example:

```
{
  "id": "assembly::t_simple::1.0",
​  "name": "assembly::t_simple::1.0",
​  "description": "Project for assembly::t_simple::1.0"
}
```