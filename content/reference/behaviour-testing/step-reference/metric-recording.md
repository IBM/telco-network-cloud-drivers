---
title: Metric Recording
weight: 40
---

# Start Recording

![Start Recording Metric](/images/reference/service-behaviour/step-reference/metric-recording/start-recording-metric.png "Start Recording Metric")

## Description

Start recording metric values by monitoring Kafka for messages detailing a measurement for a given Resource and metric type. 

You must create a metric definition before recording metrics, as this informs the monitor how to identify the Resource and metric type for each message.

Recording stops when explicitly requested with the `Stop Recording` step or when the scenario finishes. 

Passes when:

- the recording has started

Fails when: 

- the recording could not start

## Properties

| Property | Description |
| ---- | ---- |
| metricName | Chosen name to be given to this metric. This name can be used in later steps to assert the value of the metric or to stop recording |
| metricDefinitionName | Name of a previously created metric definition in this scenario. This informs the monitor how to identifiy the Resource and metric type |
| metricType | Type of metric to record e.g. failed_calls, CPU, memory. The monitor will check Kafka for messages with this type, recording the values for any that match (and also match the given resourceId). Messages for other types of metric, even those for the same Resource, are ignored | 
| topicName | The name of the Kafka topic to be monitored for metric messages |
| resourceId | The ID of the Resource the metric should be recorded for. The monitor will check Kafka for messages for this Resource, recording the values for any that match (and also match the given metricType). Messages for other Resources are ignored |

# Start Recording Multiple

![Start Recording Multiple](/images/reference/service-behaviour/step-reference/metric-recording/start-recording-multiple-metrics.png "Start Recording Multiple")

## Description

Start recording metric values by monitoring Kafka for messages detailing a measurement for a given Resource and multiple metric types. Essentially this step allows you to record multiple metrics for the same Resource in one line, rather than repeating the `Start Recording Metric` step.

You must create a metric definition before recording metrics, as this informs the monitor how to identify the Resource and metric type for each message.

Passes when:

- the recording has started

Fails when: 

- the recording could not start

## Properties

| Property | Description |
| ---- | ---- |
| metricDefinitionName | Name of a previously created metric definition in this scenario. This informs the monitor how to identifiy the Resource and metric type |
| topicName | The name of the Kafka topic to be monitored for metric messages |
| resourceId | The ID of the Resource the metric should be recorded for. The monitor will check Kafka for messages for this Resource, recording the values for any that match (and also match one of the given metrics.metricId). Messages for other Resources are ignored |
| metrics | Table of metric types (metricId) to record and the chosen name for each, used in later steps to assert the value of the metric or to stop recording |

**Metrics Table:**

| Parameter | Description |
| ---- | ---- |
| Metric Id | Type of metric to record e.g. failed_calls, CPU, memory. The monitor will check Kafka for messages with this type, recording the values for any that match (and also match the given resourceId) |
| Metric Name | Chosen name to be given to this metric. This name can be used in later steps to assert the value of the metric or to stop recording | 

# Stop Recording

![Stop Recording Metric](/images/reference/service-behaviour/step-reference/metric-recording/stop-recording-metric.png "Stop Recording Metric")

## Description

Stop recording a metric by name. 

Passes when:

- the recording has stopped

Fails when: 

- the given metric name is not known
- the recording could not be stopped

## Properties

| Property | Description |
| ---- | ---- |
| metricName | Name given to the metric when recording started |

# Start Recording Load

![Start Recording Load](/images/reference/service-behaviour/step-reference/metric-recording/start-recording-internal-load-metric.png "Start Recording Load")

## Description

Start recording the load metric for a given Resource. The message of a load metric is standard to LM, so has a pre-determined message format which means there is not requirement for a metric definition. 

Passes when:

- the recording has started

Fails when: 

- the recording could not be started

## Properties

| Property | Description |
| ---- | ---- |
| metricName | Chosen name to be given to this metric. This name can be used in later steps to assert the value of the metric or to stop recording |
| metricType | Type of metric to record e.g. load. The monitor will check Kafka for messages with this type, recording the values for any that match (and also match the given resourceId). Messages for other types of metric, even those for the same Resource, are ignored | 
| topicName | The name of the Kafka topic to be monitored for metric messages |
| resourceName | The name of the Resource the metric should be recorded for. The monitor will check Kafka for messages for this Resource, recording the values for any that match (and also match the given metricType). Messages for other Resources are ignored |

# Start Recording Integrity

![Start Recording Integrity](/images/reference/service-behaviour/step-reference/metric-recording/start-recording-internal-integrity-metric.png "Start Recording Integrity")

## Description

Start recording the integrity metric for a given Resource. The message of a integrity metric is standard to LM, so has a pre-determined message format which means there is not requirement for a metric definition. 

Passes when:

- the recording has started

Fails when: 

- the recording could not be started

## Properties

| Property | Description |
| ---- | ---- |
| metricName | Chosen name to be given to this metric. This name can be used in later steps to assert the value of the metric or to stop recording |
| metricType | Type of metric to record e.g. integrity. The monitor will check Kafka for messages with this type, recording the values for any that match (and also match the given resourceId). Messages for other types of metric, even those for the same Resource, are ignored | 
| topicName | The name of the Kafka topic to be monitored for metric messages |
| resourceName | The name of the Resource the metric should be recorded for. The monitor will check Kafka for messages for this Resource, recording the values for any that match (and also match the given metricType). Messages for other Resources are ignored |
