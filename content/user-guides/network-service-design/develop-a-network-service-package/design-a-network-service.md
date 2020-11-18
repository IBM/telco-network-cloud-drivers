---
title: Design a Network Service
weight: 20
---

This section describes the steps to design and model a Network Service. A Network Service is typically designed prior to the implementation. This is part of a customer project in which requirements are gathered, a design is made including the Network Service Design, and then implemented.

## Objectives
* Learn how to model a Network Service
* Create a Network Service graphical model that can be used during implementation

## Pre-requisites
* An understanding of the customer requirements for the Network Service in terms of composition, location, relationships, networking, testing, and underlying infrastructure requirements.
* Understanding of the Network Service components, use cases, and relationships. This information is usually gathered during the Requirements phase of a project.
* An understanding of Agile Lifecycle Manager (ALM) programming model.

## Steps to Design a Network Service
Once the pre-requisites are met, and you have a good understanding of the Network Service components and use cases, we can continue with the design, as follows:

### Design Lifecycle artifacts

The Network Service artifacts should be described in the table below. This includes the lifecycles that are applicable, their dependencies and their healing or scaling policies.

|  artifact        |  Description   |  Applicable lifecycles  |  Dependencies   | Healing and scaling policies                                                                                                                                   
|-----------------|---------------|-----------------------|--------------|-------------|
|Network Service   | e.g. Enterprise connectivity service  |  |  |  | 
|VNF/PNF     | e.g. vFirewall    |  |  |  |
|VNFC    | e.g. 1 VNFC for vFirewall | Install, configure, start, stop, heal, scale | e.g. instantiated after VNF xyz, requires internal network xyz | e.g. scale out if threshold exceeds x | 
|VDU| e.g. Docker image    |  |  |  | 
|Virtual Infrastructure   | e.g. Openstack in DC 1 |  |  |  

                               
You might also want to graphically represent this and describe the Network Service, VNF, VNFC, VDU, and Infrastructure artifacts in an image. 


### Model Lifecycle artifacts
Once there is visibility of the various artifacts, i.e. NS, VNF, VNFC, how they are managed through a lifecycle, and the rules that govern their composition, it is possible to go back to the requirements and map them into a working model of the ‘service’. 

With the target modeling process in place the requirements above can be modeled to make up the VNFC, VNF and Network Services. Each artifact in a model demonstrates the interdependancies.  This first step may create a large model that will be broken down into the artifacts that will need to be built and managed to create the network service in question.

For each noun in the details above create a rectangle in the model.  Do not worry at this stage as to how these relate or whether something might be contained in something else.  Put them all down. The next stage is to draw lines between these objects to indicate how they relate to each other. Typically we have the following types of lines between objects:

![Model Lifecycle artifacts](/images/user-guides/network-service-design/develop-a-network-service-package/design-a-network-service/model-artifacts.png "Model Lifecycle artifacts")

The first type of link ‘is a’ describes that the child is of the type of parent.  For example, Ethernet Connection 'is a' Connection. This type of link begins to gather objects that are the same type together, and to share some common details between each other. The ‘part of’ line indicates that the child is contained in the parent. Examples of this might be that Switch Port is part of a Switch.  This link allows objects to be gathered into a natural hierarchy. ‘Related’ and ‘loosely related’ are links that allow you to describe how objects may be related informally. For example, the type of relationship might simply be that one object ‘uses’ another object.  

As the subsequent steps of the modeling happen, these links may inform how objects are gathered together. One aspect of this initial model that is worth highlighting on each object, is the location type which will be deployed to and its VIM type.  One way to do this is to color the different VIM objects in a different color and outline each object that is to be deployed in a similar location in the same color.

### Group artifacts
The next step of the process is to decompose the large model into smaller models that group artifacts and lifecycles together, by location, VIM type, shared lifecycles etc. Grouping can be done based on the following shared characteristics.

#### Group by location
The first grouping to apply to your model is to group by location.  Move the diagram around so that those items that are to be deployed in the same location or have dependent placement strategies are grouped together. Some objects may exist is more than one location – if this is the case replicate them so that they are shown in all locations.  
Other objects me be connections or service-chains that exist across locations.  Put these in a group on their own.  It is likely that these will be applied either to a VIM type that models these objects between the locations e.g. a SDN Controller or that the configuration of these will need to be applied in all the locations they span.  This will become evident as the other types of grouping happen. There may be some network services that there is only one location.  That is fine, continue onto the next section.

#### Group by VIM type
Now for each location, group the objects into the VIM types that occur at those locations.  This may be a simple exercise, however, for some locations there will be a less defined notion of a VIM.  For example, in edge devices – the device itself may be in the model and they'll be no defined VIM type associated with that.  Group the items that are linked to the physical devices, together.  Mark them as physical on the diagram.

#### Group by time of instantiation
When you look at the model you will have some items that have to exist before others can exist.  Rearrange your diagrams into layers with the items that need to be created first at the bottom.  Try to layer the model so that objects that would be created together are shown side by side.  Don’t worry if an object exists in a layer on its own.  This is useful information.

#### Group by time of lifecycle
This may not be as obvious as the other groupings.  Some object may be so tightly linked to each other that they will always exist in a group and can only be created as a group.  Group these objects together,  put them in a box and see if your model still works if you considered this new single object without seeing the individuals of the group.  If this looks and feels right, then this type of grouping can simplify the overall model, by abstracting these lower level objects.  Promoting operations and metrics from the members of the group will also help with the abstraction.
If a member of this group is a cluster a further question about whether details of the cluster will be required outside the grouping must be asked.  Clusters handle properties differently to singleton objects.  The set of properties are passed as arrays of values that must remain immutable.  Passing them around is likely to cause confusion, so care should be taken before deciding to abstract clustered objects.

#### Identifying relationships
In the model you need to identify those objects that need to pass information between each other and mark these relationships.  It may be worth creating a new rectangle for each of these relationships and drawing the lines to it from the objects that will share the relationship.
With a relationship it is often the case that one party is responsible for offering a capability to the other party.  If this is obvious, then mark the object that offers the capability as the source of the relationship.
When identifying relationships, it is worth noting that they do not necessarily fall tidily in one of your layers.  Relationships may cross the layers, locations and/or VIM types.  It is also likely that as you build the solution that new relationships will become obvious and this may need new operations to be exposed.
#### Identifying clusters
For any object that can be scaled out and in, should be identified.  In the background work to do with the objects it is worth finding out the details of any metrics that could be used to auto-scale the clusters.  Some clusters are managed by an independent object outside of the cluster.  Others use the cluster itself to decide this.  If this is the case, you will need to consider how the metrics are gathered and decide if one of the cluster elements (often the first) makes the scaling decision based on shared metrics.  This may influence how the cluster if managed.

### Finalizing your design
In your model you now have groups of objects by location, VIM type, lifecycle, and time of instantiation.  We now need to map these groups and objects into the appropriate lifecycle manager construct.
* The physical devices will need to be handled first.  In some cases they need to be treated as a location into which configurations will be deployed.  If this is the case the object should be marked as a location and will probably need to be implemented in two parts,
  * A location in the appropriate resource manager will need to be created.  This can happen as part of the Install phase of the device, or as a manual step.
  * The device configuration will then need to be installed onto the device.  This should be treated as a NFC and one of these should be created and wrapped into an NF.
* Each atomic object on the model will be packaged as a VNFC.  These need to be wrapped in a VNF layer.  This may seem like an extra layer that does not add much value.  However, the VNFC may present many different offerings, this VNF layer is a way of specializing the general VNFC into what is needed for the solution being delivered.  It also allows for service specific defaults to be applied that will simplify the information needed to be provided by the upper layers.
* Each of the Grouping shown on the model should be regarded as a network service.  Each layer may depend on the layer below, i.e. the group that is created before it.  The upper groups will then reference these lower level groups.  The referenced groups will need to expose the required set of properties and promoted operations to allow property mappings and relationships to happen.

Now that all the groups are defined, an overall group needs to be defined for the top-level Network Service. 


## Results
Although there are lots of details that need to be gathered and collated for the design of the various groups, and components of the solution it is usually a good idea to create an overview diagram of how the various VNFC, VNF and NS relate to each other.  Normally the details properties are not included in this diagram, but the details of operations is important as showing relationships on the model helps understand how the links will be established and what each component needs to contribute.
There is no single modeling format for this overview diagram.  UML class diagrams can be used.

![Example Network Design model](/images/user-guides/network-service-design/develop-a-network-service-package/design-a-network-service/example-network-design.png "Example Network Design Model")

From the picture above you can see that a fairly standard UML class diagram can represent the model.  The lines with black diamonds indicate composition items.  The dotted lines with open diamonds indicate references (aggregation).  The end with the diamond is doing the composition or referencing.
The curved lines are the relationships.  The open end of the line indicates the target of the relationship the filled end indicates the source.  When a relationship is across a reference the referenced entity will always be the source of the relationship.
Within each ‘class’ the method represent the operations exposed by the different levels.  