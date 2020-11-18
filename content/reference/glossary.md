---
title: Glossary of Terms
weight: 0
---

Agile Lifecycle Manager (ALM) uses a number of terms which have very specific meaning in its context. In some cases these terms are used in other products or industries to mean slightly different things. It is important that the user understand these terms in the context of ALM

# Assembly
Assembly is a definition of a service and may comprise of one or more resources and/or other assemblies. It is defined in an Assembly Descriptor and can be instantiated as an Assembly Instance.

# Assembly Descriptor (Descriptor)
Assembly descriptor is a computer readable definition of an Assembly implemented as a Yaml-file, see Descriptor for further details.

# Assembly Designer, Service Designer
An Actor or end user role designing services using ALM. Assembly designer takes informal service design artifacts defined by service designers and translates them to a set of formal computer readable descriptors that model the target service

# Assembly Instance
Instantiation of an Assembly Descriptor which is comprised of resource instances or assembly instances

# Capability
Capabilities is a section of Assembly Descriptor or Resource Descriptor defining what functions the Resources or Assemblies are implementing.

# Catalog, Assembly Catalog
The repository within ALM storing published Assembly Descriptors and Resources Descriptors.

# Cloud
The cloud is a common term referring to accessing computer, information technology (IT), and software applications through a network connection, often by accessing data centers using wide area networking (WAN) or Internet connectivity.

# Cluster
A cluster is a logical set of fungible resources or assemblies that can scaled up and down as required within the constraints of the scaling parameters for the cluster. 

Each cluster is defined with a single resource or assembly.

# Component
A component is a collective term for any one of a resource, assembly or a references

# CSAR, archive
Cloud Service Archive (CSAR) describes a format used for describing Resource Packages. CSAR specification is a part of OASIS TOSCA.

# Deployment Location
Deployment Location is a facility were Resources can be deployed when instantiated. In various contexts Deployment Locations are referred to as Data center, Project (Openstack), or Availability Zone (openstack).

A deployment location is thus a logical separation of infrastructure that may refer to the infrastructure as a whole, particular tenants, regions or sub-divisions thereof

Resources are created within the context of a single deployment location

# Descriptor (Assembly / Resource)
A descriptor is the definition of a resource or assembly, used by LM to instantiate instances as requested by the users (or remote systems). A descriptor describes the composition, properties, policies & metrics, relationships and behaviour of an assembly/resource

* Resource descriptors are owned and managed externally to LM and are typically onboarded through a resource manager
* Assembly descriptors can be viewed, edited and managed through the LM UI or the LM API

Descriptors have identifiers of the form `type::name::version` (for example: assembly::my_first_assembly::1.0), where
* *Type* is one of assembly or resource
* *Name* is the name for the descriptor
* *Version* is the semantic version of the descriptor (dot-separated)

Descriptors can be imported and exported from LM using the LMCTL command line tool and are represented as YAML documents

The syntax of the YAML documents can be found for [resources](/reference/descriptor-specification/resource-descriptor) and [assemblies](/reference/descriptor-specification/assembly-descriptor) 


# European Telecommunications Standards Institute, ETSI

# Instance
An instance is the realisation of a descriptor, as requested by a user (or remote system)
Since assemblies can contain other assemblies as components, this hierarchy of instances is termed an assembly topology

The assembly that is at the top of the hierarchy is known as the root assembly instance
The components contained within an assembly are often referred to as child components and the assembly they are in is referred to as the parent assembly

The descriptor that is specified when an assembly instance is created is referred to as the top-level assembly descriptor

# Intent
A request to execute the most efficient steps to get a service into its intended state without the need for the manual programming of scripts or workflows.

# Intent Engine, Engine
The entity responsible for generating the assembly deployment plan and instructing, step by step, Resource Managers to execute the plan.

# Kafka
Apache Kafka™ is a distributed streaming platform.

# Lifecycle Event, Event
ALM published intent and status change event onto a Kafka topic.

# Lifecycle State, State
ALM defines a simple but flexible lifecycle which is applicable to both Assemblies and Resources. This lifecycle consists of a number of states and on the transition between each state a `Lifecycle Transition` occurs. 

The set of states are as follows. *Stable* indicates that the component (assembly/resource) can be elected to reside in this state. If a state is not _stable_ then LM will auto-transition through this state and automatically promote the component to the next stable state.

Each state transition on a resource can, optionally, be associated with a lifecycle transition action on the Resource Manager. That is, the resource manager is informed of the state transition (more correctly the intent to change state) so that it can take appropriate action.

| State | Stable | Comment |
|---|---|---|
| null | Y | This state indicates that the component (assembly/resource) does not yet exist
| Created | N | `Created` is a transitional state. That is, it is a temporary state which an component (assembly/resource) exists in between `null` and `Installed`. It is not possible to direct ALM to bring an component to this state.
| Installed | Y |
| Inactive | Y |
| Active | Y | The state which indicates that the component (assembly/resource) is fully functioning and  operational 
| Broken | N | This is a temporary state which a component (assembly/resource) will be brought to by the system if a heal is required. 
| Failed | Y | A state which only the system can transition a component (assembly/resource) to. It is a special state ALM will bring an component to if it detects that additional action by LM is futile. LM will take no active remedial action once a component has transitioned to this state without direction from an administrator.

# Lifecycle Transition
Each component (Assemblies & Resources) flow through a state model during its lifetime. Each state transition represents a Lifecycle Transition and the execution the opportunity to have a lifecycle transition script executed by the appropriate Resource-Manager for the given resource. 

Both Assemblies and Resources undergo lifecycle transitions but only resources have lifecycle transitions scripts. 

The set of transitions are fixed as are the set of states

| Transition | From State | To State  | Post-transition  |  Comment  |
|---|---|---|---|---|
| Create | null | Created |  |  |
| Install | Created | Installed |  |  |
| Configure | Installed | Inactive |  |  |
| Start | Inactive | Active |  |  |
| Integrity | Inactive | Active | Start | The transition between Inactive and Active can have two scripts which are executed sequentially with `Integrity` only executed on successful completion of `Start` |
| Stop | Active | Inactive |  |  |
| Uninstall | Inactive | Created |  |  |
| Delete | Created | null |  |  |
| Reconfigure | Active | Active |  | Reconfigure  a special case as it does not strictly speaking relate to a state transition. It is triggered as a result of changes to volatile properties |


## Lifecycle Transition Scripts
Strictly speaking the role of `Lifecycle Transition Scripts` is outside the remit of ALM. They represent a  set of scripts which are executed by the Resource Manager as a result of it receiving corresponding notifications of resource lifecycle state changes (intent). As ALM supports the binding of external Resource Managers the existence of Lifecycle Transition Scripts is not mandated but the flexibility they provide is the suggested method of realizing state transitions by a Resource Manager. 

Further to this, with the productized Resource Manager shipped with ALM in v2.1 for the first time Lifecycle Transition scripts are prescribed for all transition bar `null` to `Created` where an associated action is performed by the Resource Manager.  The associated Lifecycle Transition Script is provided to the Resource Driver to enact the transition. For `null` to `Created` transitions a *Heat* or *TOSCA* template can be provided.

# Microservice
Microservices is a variant of the service-oriented architecture (SOA) architectural style that structures an application as a collection of loosely coupled services. The benefit of decomposing an application into different smaller services is that it improves modularity and makes the application easier to understand, develop and test. It also parallelizes development by enabling small autonomous teams to develop, deploy and scale their respective services independently.

# Migration
Migration is one of the Opinionated Patterns aiming to migrate a deployed VNF from one location to another.

# Monitoring Metrics
Performance or health metrics published by Resource Managers and/or resources onto a Kafka topic. The Kafka cluster stores streams of records in categories called topics.

# Network
A type of Resource

# Network Functions Virtualization, NFV
Network functions virtualization (NFV) is an initiative to virtualise network services traditionally run on proprietary, dedicated hardware.

# OASIS
OASIS is a non-profit consortium that drives the development, convergence and adoption of open standards for the global information society.

# Operation
When a relationship is created or destroyed (ceased), ALM has the capacity to cause side-effects by executing one or more operations on the components on either end of the relationship (pre and post)

When an operation is called on a resource manager, the set of properties of the relationship are passed as opposed to the properties of the resource on which it is executing. 

The set of Operations defined in a relationship are run sequentially in the order they are defined for the relationship

Ultimately all Operations are defined within resource descriptors, but they can be promoted to their enclosing assemblies to make them available to relationships defined at higher-levels of the assembly hierarchy

`Operations` is a section of a Assembly or Resource Descriptor defining sets of operations that can be called to enable relationships to be created between resources and/or assemblies.

# Operational UI
ALM User Interface

# Opinionated patterns 
Group of lifecycle transitions to achieve a particular task. Examples of tasks include: heal, reconfigure, and upgrade.

# Policy 
Policies is a section of Assembly Descriptor or Resource Descriptor containing the set of policies that are used to manage the assembly or resource instances

# Physical Network Function, PNF
A PNF or Physical Network Function references an instance of a network function which is realized by a physical resource such as a dedicated switch in the NFV architecture

# Property
Properties is a section of Assembly Descriptor or Resource Descriptor containing the properties that belong to the resource or assembly descriptors.  These include the full set of properties that are required to orchestrate them through to the Active state. These can be understood as the context for the management of the item during its lifecycle.

# Quality Monitoring
Quality Monitoring is a process to monitor the health of deployed Resources and NFV Infrastructure and to test, monitor and evaluate the end to end service performance.

# Reference 
Relationships is a section of Assembly or Resource Descriptor identifying referenced components. 

In addition to defining components managed by an assembly, an assembly can reference assemblies and resources that are managed independently. Thus a reference is a resource or assembly that has its lifecycle managed externally to the assembly in which the reference is defined though it is likely still managed by ALM.

When defining a reference, we must specify the `search criteria` used to find this reference component at instantiation time.
* Assemblies are found by specifying their name, which will be searched within the current LM system
* Resources are found by specifying their name, deployment location and resource manager, which will be found by searching for the resource within the specified resource manager

Referenced components can be the source for a relationship (but cannot be a target)

Referenced components can have their properties accessed for the purpose of passing to other components (or the enclosing assembly)

# Relationship 
A relationship is a directional link between two components within an assembly and it can be used to add orchestration dependencies between the components and/or add side-effects when they are created or ceased.

It is represented in the UI as an orange line between the two components

When defining a relationship, we can configure the following aspects
* `Source` component for the relationship
* `Target` component for the relationship
* `Properties`
Relationship properties can be fixed values, or data mapped from the source or target ends of the relationship or 
The keywords source and target are used in the property mapping syntax rather than the component names
E.g. ${source.name} will get the name property from the source of the relationship.
* `Operation` 
A relationship has its own lifecycle which is governed by the state transitions of the source and target components. On any relationship lifecycle change the set of Operations defined for that lifecycle transition are triggered and each is supplied with the set of property values for the relationship .

# Requirement 
Requirements is a section of Assembly Descriptor or Resource Descriptor explaining what functions the Resources or Assemblies need before they can work successfully.  

# Resource 
A piece of software that can be automatically deployed in a virtual environment and that supports key lifecycle states including install, configure, start, stop, and uninstall.

Resource are managed externally to LM using a Resource Manager and represents the smallest atomic building block available in LM

A resource may for example represent a VNF, VNFC or the PNF in an NFV environment or any external entity depending on how the system is modeled

# Resource Descriptor
The list of resource attributes and properties written in Yaml, see Descriptor for further details.

# Resource Health, Component Health
Resource Health is a Microservice within ALM responsible for monitoring health related messages and initiating recovering actions related to deployed Resources. For instance, the Resource Health may send a heal message to the Intent Engine if a certain event indicating health issues is detected.

# Resource Instance
Represents the logical grouping of infrastructure being managed by an external resource manager

# Resource Manager
The entity instructing resources (e.g. Brent). ALM can have a number of bound Resource Managers but must have at least one to function

This system is responsible for transitioning resources through lifecycle states and performing operations on resources under the orchestration of ALM and returning the result to LM

A resource is managed by one (and only one) resource manager

# Resource Package
Resource package is described as a CSAR archive. This is the bundle of everything needed for resource that is loaded into a Resource Manager.

# Scale
Scale is one of the Opinionated Patterns aiming to increase or decrease the amount of deployed Resources of a specific type.

# Service Chain
A series of actions that are applied to a data stream as it passes through a network device.

# TOSCA
Topology and Orchestration Specification for Cloud Applications (TOSCA) is a standard defined by OASIS.

# Topology, Instance Inventory
The repository storing key state information related to Assembly- and Resource Instances and topology of the Deployment Locations

# Virtual Infrastructure Manager 
The entity controlling the cloud infrastructure compute, storage and network resources (e.g. Openstack).

# Virtual Network Function, VNF
Virtual Network Functions (VNFs) are virtualized tasks formerly carried out by proprietary, dedicated hardware. VNFs move individual network functions out of dedicated hardware devices into software that runs on commodity hardware.

# Virtual Network Function Component, VNFC
Virtual Network Function Components (VNFs) are virtualized internal component of a VNF in the NFV architecture which provides a defined subfunction of a VNF. VNFCs map N:1 with their VNF and a single instance of a component maps 1:1 with a Virtualization Container. 

In the ALM model a VNFC is realized as a Resource.







