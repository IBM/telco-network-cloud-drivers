---
title: Resource Manager Overview
weight: 10
---

# Introduction

The Telco Network Cloud Orchestration (TNCO) provides open integration of external virtual and physical resources to be assembled with others into complete services. While orchestrating Assemblies, LM leverages a set of one or more external Resource Managers (RM) through their northbound APIs to orchestrate the lifecycles of the managed resource instances deployed to Virtual Infrastructure Managers (VIMs). The Resource Managers are responsible for communicating with VIMs to request actions on cloud infrastructure compute, storage and network resources in support of deployed resource instances lifecycles.

# The role of the Resource Manager

As stated, the Lifecycle Manager uses a Resource Manager to communicate and perform lifecycle transitions for resources through a VIM. This allows LM to abstract both the specifics of communicating with a given VIM and the execution of given commands. Thus an RM may exist to cater for a specific VIM type or for a scripting type for example. It is also possible to deploy RMs to cater for specific VIM instances rather than types. This may be done to either manage capacity or indeed for security reasons. 

It is possible to [register](/reference/resource-manager/attach-to-lm) any number of RMs with LM though a given RM should only be registered once. An RM is uniquely identified in LM with its name though from a registration perspective it is defined by its URL.

LM ships with an existing Resource Manager commonly referred to as Brent (see section below). This is automatically onboarded in to LM at installation time. For other RMs, LM needs to be made aware of their existence by [onboarding](/reference/resource-manager/attach-to-lm) them.

# Brent

Brent is a Carrier-grade Resource Manager shipped with TNCO and is automatically onboarded into LM by the Kubernetes lm-post-configurator job.

Brent performs the following functions:

- Resource package management - resource packages are uploaded to Brent (either using the REST API or by using LMCTL) and the types are then imported into TNCO when Brent is onboarded or refreshed.
- [Infrastructure Key](/user-guides/operations/infrastructure-key-management) management - infrastructure keys include SSH keys for securely communicating with running instances (such as VMs) in a infrastructure object.
- Execution of operations against resource instances running in a Virtualized Infrastructure Manager (VIM) block. [Resource drivers](/user-guides/resource-engineering/drivers/overview) onboarded to Brent serve as the mechanism of achieving this by managing infrastructure and running lifecycle operations against them.

{{%note %}}
NOTE: LM does not ship with any drivers; drivers must be installed and onboarded separately.
{{%/note %}}

Read more about Brent by following the [Resource engineering user guide](/user-guides/resource-engineering/overview)

# Resource Descriptors

A Resource Descriptor is ultimately present in both LM and the RM. However the RM is considered the master and LM retrieves the descriptors from the RM. 

On onboarding of an RM, via an action on the UI and as a result of a push of a resource to the RM via LMCTL, LM will refresh its inventory of resources (descriptors) for a given RM keeping its descriptors in sync. This is important to ensure that both the set of properties and the set of Lifecycle Transitions/Operations are matched between the RM and LM.

# RM Installation Considerations

An RM **must** be installed in the same namespace as the LM to which it is being connected. This is to ensure security is maintained with the internal hostname based certificates generated during the install.
