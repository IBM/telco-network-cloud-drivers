---
title: Resource Health Events
weight: 90
---


# Integrity Events

These events are sent to enable a resource to indicate if a resource is working or broken.

## Example Integrity Metric Event

```
{

  "metricKey" : "142971c5-a84b-4d34-af15-435ba8640aec",

  "metricName" : "h_integrity",

  "integrity" : "OK",

  "message" : "Everything is working"

}
```

## Field Details

| **Field**  | **Description**                                              | **Mandatory** |
| ---------- | ------------------------------------------------------------ | ------------- |
| metricKey  | The key given to the   resource manager when the resource was created as a token to be used within   these messages | Yes           |
| metricName | The name of the metric   as defined in the resource descriptor | Yes           |
| integrity  | A value indicating if the   resource associated with the metric Key is working allowed values are “OK”   for working and “BROKEN” when healing is required | Yes           |
| message    | An optional test string   to include information about the integrity of the resource.  for example it may include an error code | No            |

  

# Load Events

These events indicate a resources load.  This may be an aggregation across many resources as seen for example by a load balancer.  

## Example Load Metric Message

```
{

  "metricKey" : "818127b3-1904-4737-a60c-8c7bab73532d",

  "metricName" : "h_load",

  "load" : 76,

  "message" : "Load is high"

}
```

## Field Details

| **Field**  | **Description**                                              | **Mandatory** |
| ---------- | ------------------------------------------------------------ | ------------- |
| metricKey  | The key given to the   resource manager when the resource was created as a token to be used within   these messages | Yes           |
| metricName | The name of the metric   as defined in the resource descriptor | Yes           |
| load       | A value between 0 and   100, indicating the load on the resources | Yes           |
| message    | An optional test string   to include information about the integrity of the resource.  for example it may include an error code | No            |

 


 