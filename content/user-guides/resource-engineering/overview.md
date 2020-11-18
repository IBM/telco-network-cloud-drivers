---
title: Overview
weight: 5
---

A _Resource_ is an abstract term for a leaf level component of an _Assembly Service_. _Resource instances_ ultimately represent infrastructure and the software running at a location to fulfil a function.

Telco Network Cloud Orchestration (TNCO) requires a descriptor to identify the properties, transitions, operations, metrics, and the infrastructure available for each resource instance. The Resource can then be added to any number of Assembly designs and instantiated upon creation of an Assembly. 

Although TNCO will determine the transitions and operations performed on a Resource instance as an Assembly instance moves through its lifecycle, it is the role of a Resource Manager to communicate with a target location (VIM) to bring it into service and, under the instruction of the _Intent Engine_, to perform discrete transitions and operations on it. This relationship with Resource Managers allows TNCO to abstract both the specifics of communicating with a given VIM and the execution of given tasks to specialised Resource Managers.

## Resource Managers

[Open source](/reference/resource-manager/open-source-resource-manager/) Resource Manager implementations exist and TNCO is designed to operate with multiple Resource Managers concurrently. TNCO comes with a carrier-grade Resource Manager out-of-the-box, named Brent. This Resource Manager integrates with Resource Drivers to support managing multiple infrastructure (e.g VIM) types and lifecycle scripting technologies.

The remainder of this guide focuses on how to build Resource packages managed by Brent. Read on to begin [creating Resource packages](/user-guides/resource-engineering/resource-packages/overview) and working with [drivers](/user-guides/resource-engineering/drivers/overview).