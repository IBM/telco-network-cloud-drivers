---
title: Topology
weight: 0
---

The following details the API used to retrieve information about Assembly instances within TNCO.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes)

# Get Assembly

Gets the assembly with the given ID. 

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/topology/assemblies/{assemblyId} |
| **HTTP Method**  | GET                     |

### Path Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| assemblyId                      | ID of the Assembly instance | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |
 
### Body

| **Field**      | **Description**                                              |
| -------------- | ------------------------------------------------------------ |
| type           | The type of entity being returned – always "Assembly"        | 
| id             | The internal id of the Assembly                            |
| name           | The name of the Assembly |
| state          | The current state of the Assembly (Installed, Inactive, Active). This field may be missing if the Assembly has not reached the Installed state | 
| descriptorName | The name of the Assembly descriptor associated with the Assembly instance |
| properties     | A collection of Assembly level properties. Each property will have a name and value field | 
| createdAt      | The date and time the Assembly was created  |
| lastModifiedAt | The date and time the Assembly was last modified |
| children       | A collection of components that make up the Assembly. When the component is of 'type' 'Assembly' the contents are the same as for the top level assembly.  When the 'type' is 'component' the entry is in fact a Resource.  This will have a type, name, ID and a set of associated properties |
| relationships  | A collection of relationships associated with the Assembly instance.  Each relationship has a name and the ID of the source and target components involved in the relationship.  Relationships also have a property section | 
| references     | A collection of references used by the Assembly. References can be to Resources provided by Resource Managers but not created using any Assembly and other existing Assembly instances |

Example:

```
{
  "type": "Assembly",
  "id": "bf649336-c8c5-49d9-9f4e-60567fe54135",
  "name": "test_1",
  "state": "Active",
  "descriptorName": "assembly::t_bta::1.0",
  "properties": [
​    {
​      "name": "data",
​      "value": "data"
​    },
​   ...
  ],
  "createdAt": "2017-08-02T22:28:41.906+0000",
  "lastModifiedAt": "2017-08-02T22:47:46.189+0000",
  "children": [
​    {
​      "type": "Component",
​      "id": "aa56626d-cfec-410b-afb7-7160019bdff0",
​      "name": "test_1__A",
​      ...
  ],
  "relationships": [
​    {
​      "name": "third-relationship__1",
​      "sourceId": "aa56626d-cfec-410b-afb7-7160019bdff0",
​      "targetId": "9c525d0c-18d4-404f-a5b2-8a55480660a8",
​      "properties": [
​        {
​          "name": "source",
​          "value": "test_1__A"
​        }
​      ]
​    }
  ],
  "references": [
​    {
​      "id": "1c269f9d-fcca-4754-946c-6f3e6179bf38",
​      "name": "internal-network",
​      "type": "resource::openstack_neutron_network::1.0",
      ...
​    },
​     ...
  ]
}
```

# Get Assembly by Name

Retrieve information about an Assembly instance using it's name.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/topology/assemblies?name={name} |
| **HTTP Method**  | GET                     |

### Query Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| name                      | name of the Assembly to retrieve | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |
 
### Body

| **Field**      | **Description**                                              |
| -------------- | ------------------------------------------------------------ |
| type           | The type of entity being returned – always "Assembly"        | 
| id             | The internal id of the Assembly                            |
| name           | The name of the Assembly |
| state          | The current state of the Assembly (Installed, Inactive, Active). This field may be missing if the Assembly has not reached the Installed state | 
| descriptorName | The name of the Assembly descriptor associated with the Assembly instance |
| properties     | A collection of Assembly level properties. Each property will have a name and value field | 
| createdAt      | The date and time the Assembly was created  |
| lastModifiedAt | The date and time the Assembly was last modified |
| children       | A collection of components that make up the Assembly. When the component is of 'type' 'Assembly' the contents are the same as for the top level assembly.  When the 'type' is 'component' the entry is in fact a Resource.  This will have a type, name, ID and a set of associated properties |
| relationships  | A collection of relationships associated with the Assembly instance.  Each relationship has a name and the ID of the source and target components involved in the relationship.  Relationships also have a property section | 
| references     | A collection of references used by the Assembly. References can be to Resources provided by Resource Managers but not created using any Assembly and other existing Assembly instances |

Example:

```
{
  "type": "Assembly",
  "id": "bf649336-c8c5-49d9-9f4e-60567fe54135",
  "name": "test_1",
  "state": "Active",
  "descriptorName": "assembly::t_bta::1.0",
  "properties": [
​    {
​      "name": "data",
​      "value": "data"
​    },
​   ...
  ],
  "createdAt": "2017-08-02T22:28:41.906+0000",
  "lastModifiedAt": "2017-08-02T22:47:46.189+0000",
  "children": [
​    {
​      "type": "Component",
​      "id": "aa56626d-cfec-410b-afb7-7160019bdff0",
​      "name": "test_1__A",
​      ...
  ],
  "relationships": [
​    {
​      "name": "third-relationship__1",
​      "sourceId": "aa56626d-cfec-410b-afb7-7160019bdff0",
​      "targetId": "9c525d0c-18d4-404f-a5b2-8a55480660a8",
​      "properties": [
​        {
​          "name": "source",
​          "value": "test_1__A"
​        }
​      ]
​    }
  ],
  "references": [
​    {
​      "id": "1c269f9d-fcca-4754-946c-6f3e6179bf38",
​      "name": "internal-network",
​      "type": "resource::openstack_neutron_network::1.0",
      ...
​    },
​     ...
  ]
}
```

# Get Assemblies by Partial Name Search

Retrieve a list of Assembly instances using a partial name search.

## Request

| **Aspect**       | **Value**                |
| ---------------- | ------------------------ |
| **Endpoint URL** | /api/topology/assemblies?nameContains={partialName} |
| **HTTP Method**  | GET                     |

### Query Parameters

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| partialName                      | partial name of the Assembly to retrieve | Yes          | 

## Response

| **Aspect**        | **Value**                                                    |
| ----------------- | ------------------------------------------------------------ |
| **Content-Type**  | application/json |
| **Response Code** | 200 (OK) |
 
### Body

| **Field**      | **Description**                                              |
| -------------- | ------------------------------------------------------------ |
| id             | The internal id of the Assembly                              |
| name           | The name of the Assembly                                     |
| state          | The current state of the Assembly (Installed, Inactive, Active). This field may be missing if the Assembly has not reached the Installed state | 
| descriptorName | The name of the Assembly descriptor associated with the Assembly instance | 
| createdAt      | The date and time the Assembly was created                   |
| lastModifiedAt | The date and time the Assembly was last modified             |
| partial        | A value of "true" indicates that there were more than 50 search results and not all results could be returned (there is a maximum limit of 50 results that can be returned by the search). A value of "false" means there were 50 or fewer search results and all of them were returned. |

Example:

```
{
    "assemblies": [
        {
            "id": "51e3150b-728b-49a3-97fc-8e8533f114a6",
            "name": "test_1",
            "descriptorName": "assembly::h_bta::1.0",
            "state": "Active",
            "createdAt": "2020-02-17T14:57:27.745Z",
            "lastModifiedAt": "2020-02-18T14:26:13.95Z",
            "lastTransition": {
                "id": "4ae61264-91ec-4a8a-ae79-5f63b6ae900f",
                "intentType": "HealAssembly",
                "status": "Completed",
                "startDateTime": "2020-02-18T14:26:10.522Z",
                "endDateTime": "2020-02-18T14:26:26.846Z"
            }
        }
    ],
    "partial": false
}
```