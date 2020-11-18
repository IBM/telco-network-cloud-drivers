---
title: Assembly Events
weight: 11
---

# Check for successful process

![Check for successful process](/images/reference/service-behaviour/step-reference/assembly-events/check-success-process.png "Check for successful process")

## Description

Monitors Kafka for a message describing the success of a given process for a given Assembly. For example, this step could be used to check a scale occurred on an Assembly when simulating traffic that triggers a scale policy. 

The step begins monitoring Kafka as the step is executed, so any processes completed before then will not be seen.

Passes when:

- a message is seen which describes the success of the given process for the given Assembly

Fails when: 

- no message is seen before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| processType | Type of process to check has succeeded: Heal Assembly, Scale Out Assembly, Scale In Assembly, Create Assembly, Delete Assembly, Upgrade Assembly, Change Assembly State |
| assemblyName | The name of the Assembly the expected process is for. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |

# Check for in progress process

![Check for in progress process](/images/reference/service-behaviour/step-reference/assembly-events/check-inprogress-process.png "Check for in progress process")

## Description

Monitors Kafka for a message describing a given process is in progress for a given Assembly. For example, this step could be used to check a scale has started on an Assembly when simulating traffic that triggers a scale policy. 

The step begins monitoring Kafka as the step is executed, so any processes started before then will not be seen.

Passes when:

- a message is seen which specifies the given process has started for the given Assembly

Fails when: 

- no message is seen before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| processType | Type of process to check has started: Heal Assembly, Scale Out Assembly, Scale In Assembly, Create Assembly, Delete Assembly, Upgrade Assembly, Change Assembly State |
| assemblyName | The name of the Assembly the expected process is for. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |

# Check for change state process

![Check for change state process](/images/reference/service-behaviour/step-reference/assembly-events/check-success-change-state.png "Check for change state process")

## Description

An extension of the "Check for successful process" step for the change state process, which allows you to specify the expected target state. 

Monitors Kafka for a message describing the success of a change state process for a given Assembly. 

The step begins monitoring Kafka as the step is executed, so any processes completed before then will not be seen.

Passes when:

- a message is seen which describes the success of the given change state for the given Assembly, which changed the state to the expected value.

Fails when: 

- no message is seen before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The name of the Assembly the expected process is for. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |
| targetState | Expected target state the process should be moving the Assembly to: Installed, Inactive, Active |
