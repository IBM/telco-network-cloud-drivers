---
title: Intent Requests
weight: 30
---

The steps in this group can be used to request processes to be executed on Assemblies. The difference between these steps and those in the `Intent Engine` group is the asynchronous execution. These steps only request the process to start, they do not wait for it to complete. The successful completion of the process can be checked for later in the scenario with the provided "Expect Intent Success" step.

# Create Assembly 

![Create Assembly](/images/reference/service-behaviour/step-reference/intent-requests/create-assembly.png "Create Assembly")

## Description

Requests the creation of an Assembly with the given descriptor and initial state, progressing when the request is accepted. 

Passes when:

- the create was accepted

Fails when: 

- the create was rejected (not a valid request)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The chosen name of the Assembly to be created |
| descriptorName | name of the Assembly Descriptor to create an instance from |
| initialState | the state to create the Assembly in: Installed, Inactive or Active |

# Create Assembly with properties

![Create Assembly with properties](/images/reference/service-behaviour/step-reference/intent-requests/create-assembly-with-props.png "Create Assembly with properties")

## Description

Requests the creation of an Assembly with the given descriptor and initial state, progressing when the request is accepted. This step includes a parameter to set the property values from the descriptor this instance is being created from.

Passes when:

- the create was accepted

Fails when: 

- the create was rejected (not a valid request)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The chosen name of the Assembly to be created |
| descriptorName | Name of the Assembly Descriptor to create an instance from |
| initialState | The state to create the Assembly in: Installed, Inactive or Active |
| assemblyProperties | Properties to use in the creation of the Assembly instance 

# Uninstall Assembly 

![Uninstall Assembly](/images/reference/service-behaviour/step-reference/intent-requests/uninstall-assembly.png "Uninstall Assembly")

## Description

Requests the uninstall of a given Assembly, progressing when the request is accepted. 

Passes when:

- the uninstall was accepted

Fails when: 

- the uninstall was rejected (not a valid request)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The name of the Assembly to uninstall. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |

# Change Assembly State

![Change Assembly State](/images/reference/service-behaviour/step-reference/intent-requests/change-assembly-state.png "Change Assembly State")

## Description

Requests to start a process to change the state of a given Assembly, progressing when the request is accepted. 

Passes when:

- the change state request was accepted

Fails when: 

- the change state request was rejected (not a valid request)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The name of the Assembly to change state. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |
| newState | The target state of the Assembly |

# Scale Out Cluster

![Scale Out Cluster](/images/reference/service-behaviour/step-reference/intent-requests/scale-out-cluster.png "Scale Out Cluster")

## Description

Requests to start a process to scale out a cluster belonging to the given Assembly, progressing when the request is accepted. 

Passes when:

- the scale out request was accepted

Fails when: 

- the scale out request was rejected (not a valid request)

## Properties

| Property | Description |
| ---- | ---- |
| clusterName | Name of the Cluster instance in the Assembly to scale |
| assemblyName | The name of the Assembly instance. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |

# Scale In Cluster

![Scale In Cluster](/images/reference/service-behaviour/step-reference/intent-requests/scale-in-cluster.png "Scale In Cluster")

## Description

Requests to start a process to scale in a cluster belonging to the given Assembly, progressing when the request is accepted. 

Passes when:

- the scale in request was accepted

Fails when: 

- the scale in request was rejected (not a valid request)

## Properties

| Property | Description |
| ---- | ---- |
| clusterName | Name of the Cluster instance in the Assembly to scale |
| assemblyName | The name of the Assembly instance. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |

# Heal Resource

![Heal Resource](/images/reference/service-behaviour/step-reference/intent-requests/heal-resource.png "Heal Resource")

## Description

Requests to start a process to heal a Resource belonging to the given Assembly, progressing when the request is accepted. 

Passes when:

- the heal request was accepted

Fails when: 

- the heal request was rejected (not a valid request)

## Properties

| Property | Description |
| ---- | ---- |
| brokenComponentName | Name of the Component instance in the Assembly to heal |
| assemblyName | The name of the Assembly instance. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |

# Upgrade Assembly

![Upgrade Assembly](/images/reference/service-behaviour/step-reference/intent-requests/upgrade-assembly.png "Upgrade Assembly")

## Description

Requests to start a process to upgrade the given Assembly, progressing when the request is accepted. You may upgrade the descriptor and/or property values.

Passes when:

- the upgrade request was accepted
Fails when: 

- the upgrade request was rejected (not a valid request)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The name of the Assembly instance to be upgraded. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |
| descriptorName | Name of the Assembly Descriptor to upgrade to (set to the existing descriptor name to only make property updates) |
| properties | Properties to use in the upgrade of the Assembly instance |

# Upgrade Assembly Descriptor

![Upgrade Assembly Descriptor](/images/reference/service-behaviour/step-reference/intent-requests/upgrade-assembly-descriptor.png "Upgrade Assembly Descriptor")

## Description

Requests to start a process to upgrade the given Assembly to a new descriptor, progressing when the request is accepted. 

Passes when:

- the upgrade request was accepted 

Fails when: 

- the upgrade request was rejected (not a valid request)

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The name of the Assembly instance to be upgraded. This Assembly may have been created by the scenario or existed previously. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |
| descriptorName | Name of the Assembly Descriptor to upgrade to |


# Expect Intent Success

![Expect Intent Success](/images/reference/service-behaviour/step-reference/intent-requests/expect-intent-success.png "Expect Intent Success")

## Description

Check the last process (intent), requested by this scenario, executed on a given Assembly has completed successfully.

Passes when:

- the Assembly is known by this scenario and has a process known by this scenario. The process completed successfully

Fails when: 

- the Assembly is not known by this scenario 
- the Assembly has no process known by this scenario
- the process completed unsuccessfully

## Properties

| Property | Description |
| ---- | ---- |
| assemblyName | The name of the Assembly instance. If using an "Existing Provided" assembly configuration then you may use the reference name you chose when adding it to the scenario |
