---
title: Metric Assertions
weight: 50
---

# Verify always under threshold

![Verify always under threshold](/images/reference/service-behaviour/step-reference/metric-assertions/verify-metric-always-under-threshold.png "Verify always under threshold")

## Description

Checks that all values seen whilst recording a metric are under a given value. Any values equal or over the threshold will cause the step to return a status of failed. 

Passes when:

- all values for the recorded metric are under the given threshold 

Fails when: 

- any values for the recorded metric are equal to or over the given threshold

## Properties

| Property | Description |
| ---- | ---- |
| metricName | Name given to a metric being recorded in this scenario |
| thresholdValue | A numeric value representing the threshold |

# Verify always over threshold

![Verify always over threshold](/images/reference/service-behaviour/step-reference/metric-assertions/verify-metric-always-over-threshold.png "Verify always over threshold")

## Description

Checks that all values seen whilst recording a metric are over a given value. Any values equal or under the threshold will cause the step to return a status of failed. 

Passes when:

- all values for the recorded metric are over the given threshold 

Fails when: 

- any values for the recorded metric are equal to or under the given threshold

## Properties

| Property | Description |
| ---- | ---- |
| metricName | Name given to a metric being recorded in this scenario |
| thresholdValue | A numeric value representing the threshold |

# Verify always equal to value

![Verify always equal to value](/images/reference/service-behaviour/step-reference/metric-assertions/verify-metric-always-equal.png "Verify always equal to value")

## Description

Checks that all values seen whilst recording a metric are equal to a given value. Any values under or over the threshold will cause the step to return a status of failed. 

Passes when:

- all values for the recorded metric are equal the given value 

Fails when: 

- any values for the recorded metric are under or over the given value

## Properties

| Property | Description |
| ---- | ---- |
| metricName | Name given to a metric being recorded in this scenario |
| value | A numeric value that all recorded metric values should be equal to |

# Verify currently under threshold

![Verify currently under threshold](/images/reference/service-behaviour/step-reference/metric-assertions/verify-metric-currently-under-threshold.png "Verify currently under threshold")

## Description

Checks that the last value seen whilst recording a metric is under a given value. If the value is equal or over the threshold, the step returns a status of failed. 

Passes when:

- the last value for the recorded metric is under the given threshold 

Fails when: 

- the last value for the recorded metric is equal to or over the given threshold

## Properties

| Property | Description |
| ---- | ---- |
| metricName | Name given to a metric being recorded in this scenario |
| thresholdValue | A numeric value representing the threshold |

# Verify currently over threshold

![Verify currently over threshold](/images/reference/service-behaviour/step-reference/metric-assertions/verify-metric-currently-over-threshold.png "Verify currently over threshold")

## Description

Checks that the last value seen whilst recording a metric is over a given value. If the value is equal or under the threshold, the step returns a status of failed. 

Passes when:

- the last value for the recorded metric is over the given threshold 

Fails when: 

- the last value for the recorded metric is equal to or under the given threshold

## Properties

| Property | Description |
| ---- | ---- |
| metricName | Name given to a metric being recorded in this scenario |
| thresholdValue | A numeric value representing the threshold |

# Verify currently equal to value

![Verify currently equal to value](/images/reference/service-behaviour/step-reference/metric-assertions/verify-metric-currently-equal.png "Verify currently equal to value")

## Description

Checks that the last value seen whilst recording a metric is equal to a given value. If the value is under or over the threshold, the step returns a status of failed. 

Passes when:

- the last value for the recorded metric is equal the given value 

Fails when: 

- the last value for the recorded metric is under or over the given value

## Properties

| Property | Description |
| ---- | ---- |
| metricName | Name given to a metric being recorded in this scenario |
| value | A numeric value that the last value should be equal to |

# Wait for metric to be under threshold

![Wait for metric to be under threshold](/images/reference/service-behaviour/step-reference/metric-assertions/wait-for-metric-under-threshold.png "Wait for metric to be under threshold")

## Description

Waits for a new value of a recorded metric to be under a given threshold. Any values recorded before the execution of this step are ignored.

The step will wait for the time specified, once a valid value is seen the step returns a status of pass and the scenario may continue. The step allows the user to specify the result of the step if no valid value is seen before the specified waiting time period. 

Passes when:

- a value is recorded for the metric that is under the threshold
- no value is recorded that is under the threshold and the timeoutResult is set to Pass

Fails when: 

- no value is recorded that is under the threshold and the timeoutResult is set to Fail

## Properties

| Property | Description |
| ---- | ---- |
| maxWait | A numeric value for the amount of time to wait (unit specified by timeUnit property) |
| timeUnit | Unit of the maxWait property: milliseconds, seconds or minutes |
| metricName | Name of the metric being recorded in this scenario | 
| value | The threshold value |
| timeoutResult | The status of the step if no value is seen under the threshold for the given maxWait time period: Pass or Fail |

# Wait for metric to be over threshold

![Wait for metric to be over threshold](/images/reference/service-behaviour/step-reference/metric-assertions/wait-for-metric-over-threshold.png "Wait for metric to be over threshold")

## Description

Waits for a new value of a recorded metric to be over a given threshold. Any values recorded before the execution of this step are ignored.

The step will wait for the time specified, once a valid value is seen the step returns a status of pass and the scenario may continue. The step allows the user to specify the result of the step if no valid value is seen before the specified waiting time period. 

Passes when:

- a value is recorded for the metric that is over the threshold
- no value is recorded that is over the threshold and the timeoutResult is set to Pass

Fails when: 

- no value is recorded that is over the threshold and the timeoutResult is set to Fail

## Properties

| Property | Description |
| ---- | ---- |
| maxWait | A numeric value for the amount of time to wait (unit specified by timeUnit property) |
| timeUnit | Unit of the maxWait property: milliseconds, seconds or minutes |
| metricName | Name of the metric being recorded in this scenario | 
| value | The threshold value |
| timeoutResult | The status of the step if no value is seen over the threshold for the given maxWait time period: Pass or Fail |

# Wait for metric to be equal

![Wait for metric to be equal](/images/reference/service-behaviour/step-reference/metric-assertions/wait-for-metric-equal.png "Wait for metric to be equal")

## Description

Waits for a new value of a recorded metric to be equal to a given value. Any values recorded before the execution of this step are ignored.

The step will wait for the time specified, once a valid value is seen the step returns a status of pass and the scenario may continue. The step allows the user to specify the result of the step if no valid value is seen before the specified waiting time period. 

Passes when:

- a value is recorded for the metric that is equal to the value
- no value is recorded that is equal to the value and the timeoutResult is set to Pass

Fails when: 

- no value is recorded that is equal to the value and the timeoutResult is set to Fail

## Properties

| Property | Description |
| ---- | ---- |
| maxWait | A numeric value for the amount of time to wait (unit specified by timeUnit property) |
| timeUnit | Unit of the maxWait property: milliseconds, seconds or minutes |
| metricName | Name of the metric being recorded in this scenario | 
| value | The threshold value |
| timeoutResult | The status of the step if no value is seen equal to the given threshold for the given maxWait time period: Pass or Fail |