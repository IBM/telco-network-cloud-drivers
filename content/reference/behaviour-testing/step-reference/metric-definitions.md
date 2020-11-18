---
title: Metric Definitions
weight: 30
---

# Specify Metric Definition

![Specify Metric Definition](/images/reference/service-behaviour/step-reference/metric-definitions/specify-metric-definition-table.png "Specify Metric Definition")

## Description

Specify the format of messages on Kafka for a metric type that will be recorded later.

Passes when:

- the format is valid 

Fails when: 

- the format is invalid 

## Properties

| Property | Description |
| ---- | ---- |
| metricDefinitionName | Name given to the metric definition (referenced in steps to record a metric) |
| metricDefinition | A table specifying the 4 fields to be found on a Kafka message |

**Metric Definition Table:**

| Definition Parameter | Description |
| --- | --- |
| resourceIdField | The field on the Kafka message which holds the identifier to group metrics on. This field is used to determine the entity the metric message is for; typically this is the name/id of the resource instance however, depending on the metrics produced by your service, it could be a higher level of abstraction such as the service itself |
| timestampField | The field on the Kafka message which holds the timestamp of the message |
| metricTypeField | The field on the Kafka message which holds the type of metric. This field is used to determine what this metric is measuring e.g. CPU, memory, failed_calls |
| valueField | The field on the Kafka message which holds the value to record. The value can hold a single numeric value or a list, however in the second case only the first value is recorded |

# Specify Metric Definition Inline

![Specify Metric Definition Inline](/images/reference/service-behaviour/step-reference/metric-definitions/specify-metric-definition-line.png "Specify Metric Definition Inline")

## Description

Specify the format of messages on Kafka for a metric type that will be recorded later.

Passes when:

- the format is valid 

Fails when: 

- the format is invalid 

## Properties

| Property | Description |
| ---- | ---- |
| metricDefinitionName | Name given to the metric definition (referenced in steps to record a metric) |
| resourceIdField | The field on the Kafka message which holds the resourceId. This field is used to determine which Resource the metric message is for |
| timestampField | The field on the Kafka message which holds the timestamp of the message |
| metricTypeField | The field on the Kafka message which holds the type of metric. This field is used to determine what this metric is measuring e.g. CPU, memory, failed_calls |
| valueField | The field on the Kafka message which holds the value to record |
