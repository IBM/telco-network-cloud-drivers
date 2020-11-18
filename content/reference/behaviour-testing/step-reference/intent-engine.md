---
title: Intent Engine
weight: 20
---

# Create Assembly 

![Create Assembly](/images/reference/service-behaviour/step-reference/intent-engine/create-assembly.png "Create Assembly")

## Description

Requests the creation of an Assembly with the given descriptor and initial state. The step then waits for the process to complete successfully. 

Passes when:

- the create was accepted and completed successfully 

Fails when: 

- the create was rejected (not a valid request)
- the create was accepted but failed to complete successfully
- the create was accepted but has not finished before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The chosen name of the Assembly to be created |
| descriptorName | name of the Assembly Descriptor to create an instance from |
| initialState | the state to create the Assembly in: Installed, Inactive or Active |

# Create Assembly with properties

![Create Assembly with properties](/images/reference/service-behaviour/step-reference/intent-engine/create-assembly-with-props.png "Create Assembly with properties")

## Description

Requests the creation of an Assembly with the given descriptor and initial state. The step then waits for the process to complete successfully. This step includes a parameter to set the property values from the descriptor this instance is being created from.

Passes when:

- the create was accepted and completed successfully 

Fails when: 

- the create was rejected (not a valid request)
- the create was accepted but failed to complete successfully
- the create was accepted but has not finished before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The chosen name of the Assembly to be created |
| descriptorName | Name of the Assembly Descriptor to create an instance from |
| initialState | The state to create the Assembly in: Installed, Inactive or Active |
| assemblyProperties | Properties to use in the creation of the Assembly instance 

# Uninstall Assembly 

![Uninstall Assembly](/images/reference/service-behaviour/step-reference/intent-engine/uninstall-assembly.png "Uninstall Assembly")

## Description

Requests the uninstall of a given Assembly. The step then waits for the process to complete successfully.

Passes when:

- the uninstall was accepted and completed successfully 

Fails when: 

- the uninstall was rejected (not a valid request)
- the uninstall was accepted but failed to complete successfully
- the uninstall was accepted but has not finished before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The name of the Assembly to uninstall. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |

# Change Assembly State

![Change Assembly State](/images/reference/service-behaviour/step-reference/intent-engine/change-assembly-state.png "Change Assembly State")

## Description

Requests to start a process to change the state of a given Assembly. The step then waits for the process to complete successfully.

Passes when:

- the change state request was accepted and completed successfully 

Fails when: 

- the change state request was rejected (not a valid request)
- the change state request was accepted but failed to complete successfully
- the change state request was accepted but has not finished before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The name of the Assembly to change state. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |
| newState | The target state of the Assembly |

# Scale Out Cluster

![Scale Out Cluster](/images/reference/service-behaviour/step-reference/intent-engine/scale-out-cluster.png "Scale Out Cluster")

## Description

Requests to start a process to scale out a cluster belonging to the given Assembly. The step then waits for the process to complete successfully.

Passes when:

- the scale out request was accepted and completed successfully 

Fails when: 

- the scale out request was rejected (not a valid request)
- the scale out request was accepted but failed to complete successfully
- the scale out request was accepted but has not finished before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| clusterName | Name of the Cluster instance in the Assembly to scale |
| assemblyName | The name of the Assembly instance. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |

# Scale In Cluster

![Scale In Cluster](/images/reference/service-behaviour/step-reference/intent-engine/scale-in-cluster.png "Scale In Cluster")

## Description

Requests to start a process to scale in a cluster belonging to the given Assembly. The step then waits for the process to complete successfully.

Passes when:

- the scale in request was accepted and completed successfully 

Fails when: 

- the scale in request was rejected (not a valid request)
- the scale in request was accepted but failed to complete successfully
- the scale in request was accepted but has not finished before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| clusterName | Name of the Cluster instance in the Assembly to scale |
| assemblyName | The name of the Assembly instance. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |

# Heal Resource

![Heal Resource](/images/reference/service-behaviour/step-reference/intent-engine/heal-resource.png "Heal Resource")

## Description

Requests to start a process to heal a Resource belonging to the given Assembly. The step then waits for the process to complete successfully.

Passes when:

- the heal request was accepted and completed successfully 

Fails when: 

- the heal request was rejected (not a valid request)
- the heal request was accepted but failed to complete successfully
- the heal request was accepted but has not finished before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| brokenComponentName | Name of the Component instance in the Assembly to heal |
| assemblyName | The name of the Assembly instance. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |

# Upgrade Assembly

![Upgrade Assembly](/images/reference/service-behaviour/step-reference/intent-engine/upgrade-assembly.png "Upgrade Assembly")

## Description

Requests to start a process to upgrade the given Assembly. The step then waits for the process to complete successfully. You may upgrade the descriptor and/or property values.

Passes when:

- the upgrade request was accepted and completed successfully 

Fails when: 

- the upgrade request was rejected (not a valid request)
- the upgrade request was accepted but failed to complete successfully
- the upgrade request was accepted but has not finished before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The name of the Assembly instance to be upgraded. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |
| descriptorName | Name of the Assembly Descriptor to upgrade to (set to the existing descriptor name to only make property updates) |
| properties | Properties to use in the upgrade of the Assembly instance |

# Upgrade Assembly Descriptor

![Upgrade Assembly Descriptor](/images/reference/service-behaviour/step-reference/intent-engine/upgrade-assembly-descriptor.png "Upgrade Assembly Descriptor")

## Description

Requests to start a process to upgrade the given Assembly to a new descriptor. The step then waits for the process to complete successfully.

Passes when:

- the upgrade request was accepted and completed successfully 

Fails when: 

- the upgrade request was rejected (not a valid request)
- the upgrade request was accepted but failed to complete successfully
- the upgrade request was accepted but has not finished before a configurable amount of time has passed (configured with `alm.doki.execution.lifecycleEventTimeout`. Default = `900s`)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The name of the Assembly instance to be upgraded. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |
| descriptorName | Name of the Assembly Descriptor to upgrade to |
