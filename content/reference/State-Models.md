---
title: Lifecycle Manager Architecture -- State Models
weight: 0
---

# Component State Model

Assemblies and resources have a predefined state model (comparable to TOSCA) as defined in the diagram below.

Components flow through this state model by performing lifecycle transitions. 
Resources can define which transitions they support (in their descriptors) but an assembly will always transition through 

In addition to the five transitions shown below, resources can implement the Integrity transition, representing a functional “smoke test” which is performed prior to the resource becoming Active and after the Start Lifecycle Transition

Since assemblies are logical entities, an assembly is transitioned by transitioning each of its child components to the same state. More correctly it is that all of the assemblies child components have reached _at least_ the same state. There will be cases where due to property dependencies in order transition all of the child components to a target state it may be necessary to transition some to a `'higher'` state.

![TNCO State Model](/images/reference/state-model/state-model.png "TNCO State Model")

## Lifecycle Transitions

TNCO performs lifecycle transitions as a component transitions from one state to another. More correctly a transition occurs while a component is in the source state and the transition to the target state occurs on the successful execution the Lifecycle transition script in the case of a resource and on the successful transition of all child components in the case of an assembly. TNCO supports the following transitions;


| Transition | Source State | Target State | On error  | Comment |
|---|---|---|---|---|
| Create  | `<null>` | Created | Failed | Create occurs on creation of a resource
| Install  | Created | Installed | Failed | 
| Configure  | Installed | Inactive | Installed | 
| Start  | Inactive | Active | Inactive |
| Integrity | Inactive | Active | Inactive | Integrity is only performed on successful completion of _Start_ transition 
| Stop | Active \| Broken | Inactive | Failed | 
| Uninstall  | Inactive | Created | Inactive | 
| Delete  | Created | `<null>` | Created | 
| Reconfigure | Active | Active | Active | A reconfigure is triggered by a Volatile Property change and there is no change of state |


## Relationship State Model
A relationship has its own lifecycle. It is much simpler as there is only a single state for a relationship and two transitions. On each transition a zero or more Operations are executed against either the source or the target components

![TNCO State Model](/images/reference/state-model/relationship-model.png "TNCO State Model")

### Relationship State Transitions

| Transition | Source State | Target State | On error  | Comment |
|---|---|---|---|---|
| Create  | `<null>` | Created | `<null>` | Create occurs on creation of a resource
| Install  | Created | `<null>` | `<null>` | 
