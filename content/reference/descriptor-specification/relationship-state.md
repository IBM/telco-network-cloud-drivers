---
title: Relationship State
weight: 30
---


# Relationship State

When defining a relationship we must also define when this relationship should be created and deleted (ceased) within the context of the assembly lifecycle (and the lifecycles of its components)
* This is achieved by specifying the minimum state each end of the relationship must occupy for the relationship to exist
* The target component is the driving end of the relationship, meaning that the relationship will be created when the target component will reach its minimum state in this transition

In addition to specifying the minimum state, we can also define a modifier for the state which identifies whether the relationship should be created before (`pre`) or after (`post`) the relevant end transitions
* By default, source components have the _post_ modifier and target components have the _pre_ modifier
* If the target component has the _post_ modifier, the relationship will be created once both the source and target are at their minimum states (or higher)
* If the target component has the _pre_ modifier, the relationship will be created prior to the target component transitioning to its minimum state
  *    TNC-O will ensure that the source component will also be in its minimum state
  *    This can result in the source component having its state artificially raised to a higher state than that of the  parent assembly
  *    In this way, relationships can be used (in addition to properties) to introduce dependencies into how the processes are built and executed

### Relationship State example
The following example represents the lifecycle of a relationship as the source and target resources transition through their lifecycles

Source State: `post-Active`

Target State: `pre-Inactive`

The relationship will be created once both components have successfully transitioned to the Active state

![Create Relationship](/images/reference/descriptor-specification/Relationship_State_Example.png "Create relationship")
