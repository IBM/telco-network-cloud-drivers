---
title: Assembly Descriptor
weight: 11
---

# Introduction

This document describes the assembly descriptors that are used by the Telco Network Cloud Orchestration (TNCO). TNCO needs to have descriptions of the building blocks of applications that it is going to manage. The basic building blocks are described in resource descriptors (resource descriptors are described in separate document). Sets of these are composed into assembly descriptors to allow designers to describe a complete application/service that they need TNCO to manage.  

Within the assembly will be a description of the relationships between resources that allow configuration to be applied to the actual instances of the components that TNCO will manage.  Assemblies may also reference assemblies and existing infrastructure items, such as network instantiated outside of TNCO.

## Naming

The assembly descriptor name field will contain the following string:

`assembly::name::1.0`

The name must start with a letter (either case) and can include letter and numbers and underscore and hyphens (minus sign).  The name must not contain spaces. It must end with either a letter (either case) or a number.

Both name and version are mandatory.

# Sections

## Header

The header includes the name and the description of the descriptor.  

```
name: assembly::Streamer_cluster::1.0

description: An Assembly for a front end cluster comprising of a loadbalancer supported by an authorisation proxy and video streamers using a shared NFS based storage
```

## Properties

(The properties section occurs in several places. The rules defined here apply to the top-level property section for the descriptor. Rules applicable to property names and the “value” field can be applied to all property sections)

This section contains the properties that belong to assembly descriptors. These include the full set of properties that are required to orchestrate them through to the Active state. These can be understood as the context for the management of the item during its lifecycle. 

```
properties:
  deploymentLocation: # the name of the property 
​    type: string
​    required: true
​    description: The name of the openstack project (tenant) to install this assembly in. 

  resourceManager:
​     value: '${resourceManager}'

  numOfStreamers:
​    type: string
​    description: the number of streamers that should be created at install time
​    default: 2

  tenant_key_name:
​    type: string
​    required: true
​    description: The SSH key for the current tenant

  flavor:
​    value: m1.small

  cluster_public_ip_address:
​    type: string
​    description: the public IP address for this cluster
​    read-only: true
​    value: '${balancer.publicIp}'
```

Each property name must be unique within its property section. The name cannot contain dot (period) characters.

Currently, the type field is not used, and all properties are assumed to be of type “string”. This field will be used in the future to allow handling of different types of data (for example: dates, IP addresses, encrypted values, etc…). It is recommended users omit this field or use the default value of “string” to avoid compatibility issues in the future.

Properties are optional unless explicitly defined as required by the inclusion of a required: true flag. This only affects the top-level assembly and means that a value *must* be present (for example; not null) for a property. This can be evaluated from the “value” field, a “default” or passed in from the intent request.

Properties marked as read-only: true will not be overridden by values mapped in from an enclosing assembly or from the intent request. This is typically used for properties that are calculated from or returned by the resource itself.

Properties may be declared with a default value or a specific value or neither. Where the value field is used it may either be an explicit value or it may reference to another property within the descriptor. This will happen in assemblies where properties given to the assembly may be used within the various other property sections.  When referencing a property in the assemblies’ main property section the reference will look as follows:

`value: ‘${max_connections}’`

If the reference is to a property within the assemblies other sections the reference must include the name of the enclosing object, for example

`value: ‘${balancer.publicIp}’`

This references the property publicIp within the balancer section of the composition section.  

`deploymentLocation` is a special property that is used by the TNCO to place the resultant resource in the correct location.  It will only appear in an assembly descriptor.  The contents of the property will be specific to the resource manager that handles the resource.

`resourceManager` is another special property that passes the name of the resource manager instance that will be used to manage the resource.

TNCO will assign an internal name and identifier for each resource and assembly instance it creates.  These values can be useful to give unique names for servers etc. To access them a property may have its value set to `${instance.name}` or `${instance.id}`. 

{{%note %}}
NOTE: It is essential that there is a space between the “value:” and the quoted property value string. If you fail to put a space between these two items then it will be treated as a single string.
{{%/note %}}
 

## Capabilities and Requirements

These two sections allow designers to explain what functions the assemblies are implementing or need before they can work successfully. These might be expressing that networks or various types must be available for the resource instances to work or it may be describing that a resource supports, for example, incoming http requests.

The type is a string that expresses the capability or requirement. The values in these strings will have to be agreed across an organization and where possible they should be agreed by the industry. Resource capabilities should use common industry terms.  In the examples below the idea is that httpStreamOutput indicates that the capability is using the http protocol in a stream form and in an output direction.  The OS::Neutron:Net is the resource type from openstack associated with a network instantiated within neutron.  

### Capabilities

These are used to enable service designers to understand what function an assembly provides.  

```
capabilities:
​    VideoStream:
​        type: httpStreamOutput

capabilities:
​    Network: 
​        type: neutronNetwork
```


### Requirements


Similar to the capabilities section, the requirements contain the list of capabilities that the assembly needs to be provided for them to work.  

```
requirements:
​    VideoNetwork:
​        type: neutronNetwork

​    ManagementNetwork:
​        type: neutronNetwork

​    RemoteNFSMountPoint:
​        type: nfsExportMountpoint
```

## Operations

This section defines sets operations that can be called to enable relationships to be created between resources and/or assemblies. Where an assembly/resource descriptor describes an operation, the enclosing assembly may expose this by referencing the lower level operation. In effect it can promote an operation from a contained assembly/resource.

```
operations:
​    SetLBBalancer:
​        source-operation: balancer.AddHttpStreamOutput

```

## Composition and References

_Definition_:Components - A component is a resource or assembly that is included within an assembly composition section and will be instantiated as a result of requesting a new instance of the enclosing assembly

Assemblies allow a designer to group a set of resources and assemblies, collectively known as components, into an assembly to create a new application/service. Those used within the composition section will be instantiated and managed by TNCO. 

When TNCO has already instantiated an assembly it is possible for another assembly to share the instance by referencing it within the references section. The references section can also refer to existing objects that may have been created outside TNCO. TNCO will resolve both of these types of references from the properties supplied and access to the instances properties and operations is then available to the referencing assembly.

### Composition

Assemblies gather resources and other assemblies together for either a whole or part of a solution.  The composition section is used to reference the components that will be instantiated as part of the Installation of the assembly.

```
composition:
  streamer: # The name
​    type: resource::c_streamer::1.0
​    quantity: ${numOfStreamers}
​    properties:
​      \#not shown for brevity

  balancer:
​    type: resource::c_balancer::1.0
​    quantity: 1
​    properties:
​      \#not shown for brevity

  net_video:
​    type: resource::net_video::1.0
​    quantity: 1
​    properties:
​      \#not shown for brevity
```

Each entry in this section must give a name to the item which will form the basis for the instance name for the actual running components. It also includes a quantity that defaults to 1.  In a non-clustered environment, the “quantity” property defines exactly how many instances will be created.

The rules governing properties are defined [properties section](/reference/descriptor-specification/assembly-descriptor/#properties)

```
composition:
  streamer:
​    type: resource::c_streamer::1.0
​    cluster:
​      \# not shown for brevity
​    properties:
​      deploymentLocation:
​        value: '${deploymentLocation}'
​      resourceManager:
​        value: '${resourceManager}'
​      flavor:
​        value: m1.small
​      server_name:
​        value: ${instance.name}
​      referenced-video-network:
​        value: ${net_video.network-id}
​      availability_zone:
​        value: DMZ
​      mgmtIp:
​        type: string
​        description: MGMT IpAddress of server
​        read-only: true  
```

#### Clusters

It is also possible to define a cluster section for a component that indicates that the component of the assembly may comprise of more than one instance of the same type (node) to support capacity and or availability requirements.  

* _initial-quantity_ is an optional property that must be between the minimum and maximum nodes values. If not set, it defaults to “minimum-nodes”.  
* _minimum-nodes_ is optional and defaults to “1” if not set.  It can be set to '0' if no instances of the component are required at initial install.  
* _maximum-nodes_ is optional and if set it must be greater than or equal to “minimum-nodes”.  
* _scaling-increment_ is optional and defaults to “1”, it determines the number of instances added or removed from the cluster during scaling. 

{{%note %}}
NOTE: The properties “quantity” and “initial-quantity” are mutually exclusive. When running in a clustered environment the “quantity” property (if defined) will be ignored and the value of “initial-quantity” used instead.
{{%/note %}}

```
composition:
  streamer:
​    type: resource:: c_streamer::1.0
​    cluster:
​      initial-quantity: ${numOfServers}   
​      minimum-nodes: 1                    
​      maximum-nodes: 4                    
​      scaling-increment: 1                

​    properties:
​      data:
​        value: ${data}
​      ip_address:
​        read-only: true
```

## References

The reference section is similar to the composition section except that the items referenced in this section must be pre-existing before TNCO will instantiate any of the items in the assembly’s composition section.  

Two types of references can be resolved by TNCO
1. existing assembly instances 
2. external resources that are managed directly by a resource manager.

Assembly references require the full name of the assembly within type field. The example below shows using the semantic versioning to allow more flexibility when resolving to instances of the assembly. The properties are used to help TNCO find the instance of the item required by the current assembly. With items that have been created through TNCO the referencing assembly can refer to any of the instance’s properties from the items property section. Referenced assemblies can be used by the enclosing assembly to establish relationships.

Resource instances managed directly by a resource manager may be referenced.  These will have resource descriptors as any resource, however they will not include the Install or Uninstall lifecycle steps.

To read the references section each item has a local name used to refer to the item with in the assembly. The type directs TNCO to fetch the required resource type. The properties are then used by TNCO to narrow down to a single instance of the resource type that can be used by the enclosing assembly. If TNCO finds more than one resource that fits the information provided an error occurs and the assembly will not be instantiated.

```
references:

  storage: # reference to an existing assembly instance
​    type: assembly::storage_cluster::^1.0
​    properties:
​      deploymentLocation:
​        value: '${deploymentLocation}'
​      resourceManager:
​        value: '${resourceManager}'
​      name:
​        value: '${storage-name}'

  management-network: # reference to a neutron network not created by the Telco Network Cloud Orchestration (TNCO) 
​    type: resource::ucd_network::1.0
​    properties:
​      deploymentLocation:
​        value: '${deploymentLocation}'     
​      resourceManager:
​        value: '${resourceManager}' 
​      name: 
​        value: ${management-network-name}  
```

Once found the properties of these referenced items may be accessed using the following method:

`${referenced-item-name.property-name}`

```
  balancer:
​    type: 'resource::c_balancer::1.0'
​    quantity: '1'
​    properties:
​      …
​      referenced-management-network:
​        value: '${management-network.id}'
```

All the properties from the assembly instances referenced are available for use in the above manner. For resources the properties available will be defined in the resource descriptor.

## Relationships

Relationships are established between two components that enable the “requirements” of one component (known as the “target”) to be satisfied by another component providing the “capability” (known as the “source”).

### Defining Relationships

The “source” and “target” of a component is defined in the following fields respectively:

* source-capabilities
* target-requirements

In order to define a relationship between two components, the name of each component (as defined in the “composition” or “reference” section of the descriptor) is combined with the name of the capability or requirement accordingly. 

For example:

  ```
  source-capabilities:
  ​    - A.capability-3

  target-requirements:
  ​    - B.requirement-3
  ```

  

  `source-capabilities` is divided up as follows:

  ```
    A             ->  Is from composition section 
    “.”           ->  Is a delimiter agreed upon 
    capability-3  ->  Is the name of the “capability” defined within the organization.
  ```

A reference component can only be defined as a source-capability. In this instance, only the name of the reference needs to be provided.

 

Within a relationships definition the “properties” field may refer to the components defined under the “source-capability” and “target-requirements” fields as “source” and “target” respectively.

For example:

```
      property1:
​        value: ${source.name}

​      property2:r
​        value: ${target.name}
```

Above `${source.name}` and `${target.name}` is used to refer to the “source” components (as defined in source-capabilities) “name” property and “target” components (as defined in target-requirements) “name” property accordingly.

The “lifecycle” section within relationships consist of two transitions:

1. Create
2. Cease

The above transitions allow designers to specify what operations to perform during the Creation and Cessation (or removal) of a relationship for a source and target component.

For example:

```
    lifecycle:
​      Cease:
​      - target.CeaseRelationship
​      - source.CeaseRelationship

​      Create:
​      - target.CreateRelationship
​      - source.CreateRelationship
```

The operation(s) called will depend on the components involved.  The operations are called in the order they appear in the Create or Cease sections.  A relationship may only call one operation, i.e. only a target or source operation.

Operations are referenced as:

*  `source.<operation-name>`
*  `target.<operation-name>`


`<operation-name>` refers to an operation defined in the assembly or resource descriptor associated with the component.

### Establishing Relationships

Relationships are created when the components to be related are in particular states. 

The following fields are used to define the state required to establish a relationship:

*  `source-state`
*  `target-state`

For example, if the following source and target states are defined as:

```
    source-state: Active
​    target-state: Active
```

By default this would mean that the relationship would be created when the source is in the Active state and before the target has transitioned to the Active state.  

Further control when defining relationships is available via the “source-state-modifier” and “target-state-modifier” fields. These are used to define whether relationships are established before (pre) or after (post) they reach their source or target state as defined under source-state and target-state previously.

For example:

*   `source-state-modifier` – if not present default is         *post*
*   `target-state-modifier` – if not present default is:        *pre*

 
Relationships are always ceased/removed before the associated component leaves the state defined in the source-state and target-state fields mentioned above. 

```
relationships: 

  nfs_mount:
​    source-capabilities: 
​    - storage.NFSMountpoint

​    target-requirements: 
​    - streamer.RemoteNFSMountPoint

​    source-state: Active
​    target-state: Inactive

​    properties:
​      remote_nfs_port:
​        value: '2049'
​      remote_nfs_server_ip:
​        value: '${source.privateIp}'
​      remote_mount_point:
​        value: '/'
​      local_mount_point:
​        value: '/mnt'    

​    lifecycle:
​      Create:
​      - source.MountStorage
​      Cease:
​      - source.UnmountStorage
 ```

Like the overall assembly and resources relationships have a set of properties that are available to the operations associated with the lifecycle transitions of the relationship. 

## Placement

To deploy components to the correct location TNCO will use two properties called deploymentLocation and resourceManager.  The resourceManager property will be used to find the correct Resource Manager that manages the resource for the location defined in the deploymentLocation property. The combination of these two uniquely identifies where and how a resource will be managed.

A Placement is also involved when trying to resolve the instances defined in the references section. Before a reference can be resolved any associated placement rules will have been applied. This will then allow TNCO to find the appropriate instance of the reference required. The two properties will also be needed on each reference.

## Metrics and Policies

A resource descriptor may indicate that the underlying resource will emit one or more metrics.  

Example metrics as found in a resource descriptor.

```
metrics:
​    lb_integrity:            
​         type: metric::integrity
​         publication-period: ${integrity_publication_period}

​    lb_load:
​         type: metric::load        
​         publication-period: ${publication_period}
```

{{%note %}}
NOTE: this exists in the resource descriptor and not in the assembly descriptor.
{{%/note %}}

Load metrics can be promoted in an assembly using a similar mechanism to operations:

```
metrics:
​    b1_load: 
​        source-metric: B1.load
```

Within an assembly the policy section will contain details of the policies for the underlying resources load metric and how that should be used to mange the scaling of components.

Each policy has a name, the associated metric, an action and a set of properties that are used to handle the policy.
 
### Example Policies

```
policies:    
  scaleStreamer: 
​    type: policy::scale
​    metric: A.load   
​    target: B
​    properties:
​      scaleOut_threshold: ${scaleOut_threshold}
​      scaleIn_threshold: ${scaleIn_threshold}
​      smoothing: ${scale_smoothing}    
```

The example above shows the policy associated with the load metric on a resource.  This is used to ScaleOut and ScaleIn a component – indicated by the value in the target properties.

The example shows that the metric produced by A called load will be used to indicate when the target – B- will be scaled.  Load is expressed as a percentage and the thresholds are simple integers.  When the threshold is broken the scale event associated with the threshold will be enacted.  To prevent this happening each time the load spikes, a smoothing value is applied.  The threshold must be breached at least the number of times indicated by the smoothing value before the action will be enacted.

Example of smoothing:
                                               

 ![example of smoothing](/images/reference/descriptor-specification/example_of_scaling.png)

# Yaml Examples

Example of an assembly with policies:

```
name: assembly::h_bta::1.0
description: Basic Test Assembly 
properties:
  data:
​    default: "data"
​    type: string
​    description: 'parameter passed'

  numOfServers:
​    description: number of servers
​    type: integer
​    default: 1

  output:
​    description: an example output parameter
​    type: string
​    read-only: true
​    value: ${B.output}

  deploymentLocation:
​    type: string
​    description: name of openstack project to deploy network
​    default: admin@local

  resourceManager:
​    type: string
​    description: name of the resource manager
​    default: test-rm

  scaleOut_threshold:
​    type: integer    
​    description: threshold that the load metric must breach to potentially trigger a scaleOut
​    default: 90

  scaleIn_threshold:
​     type: integer    
​     description: threshold that the load metric must breach to potentially trigger a scaleOut
​     default: 10

  scale_smoothing:
​    type: integer    
​    description: the number of sequential periods the load metric must be above threshold to trigger action
​    default: 4

composition:

  A:
​    type: resource::h_simple::1.0
​    quantity: '1'
​    properties:
​      referenced-internal-network:
​        value: ${internal-network.id}

​      reference-public-network:
​        value: ${public-network.id}

​      image:
​        value: ${xenial-image.id}

​      key_name:
​        value: "ACCANTO_TEST_KEY"

​      data:
​        value: ${data}

​      output:
​        value: "A_output"  

​      deploymentLocation:
​        value: ${deploymentLocation}

​      resourceManager:
​        value: ${resourceManager}

  B:

​    type: resource::t_simple::1.0

​    cluster :
​      initial-quantity: ${numOfServers}
​      minimum-nodes: 1
​      maximum-nodes: 4
​      scaling-increment: 1

​    properties:
​      referenced-internal-network:
​        value: ${internal-network.id}

​      reference-public-network:
​        value: ${public-network.id}

​      image:
​        value: ${xenial-image.id}

​      key_name:
​        value: "ACCANTO_TEST_KEY"

​      data:
​        value: ${data}

​      output:
​        value: ${A.output}

​      deploymentLocation:
​        value: ${deploymentLocation}

​      resourceManager:
​        value: ${resourceManager}

policies:    
  scaleStreamer: 
​    type: policy::scale
​    metric: A.load                
              
​    target: B               
​    properties:
​      scaleOut_threshold: ${scaleOut_threshold}
​      scaleIn_threshold: ${scaleIn_threshold}
​      smoothing: ${scale_smoothing}       

references:

  internal-network:
​    type: resource::openstack_neutron_network::1.0
​    properties:
​      deploymentLocation:
​        value: ${deploymentLocation}

​      resourceManager:
​        value: ${resourceManager}

​      name:
​        type: string
​        value: VIDEO

  public-network:

​    type: resource::openstack_neutron_network::1.0
​    properties:
​      deploymentLocation:
​        value: ${deploymentLocation}

​      resourceManager:
​        value: ${resourceManager}

​      name:
​        type: string
​        value: public

  xenial-image:

​    type: resource::openstack_glance_image::1.0

​    properties:
​      deploymentLocation:
​        value: ${deploymentLocation}

​      resourceManager:
​        value: ${resourceManager}

​      name:
​        type: string
​        value: xenial

relationships:

  third-relationship:
​    source-capabilities:
​    - A.capability-3

​    target-requirements:
​    - B.requirement-3

​    source-state: Active
​    target-state: Active

​    properties:
​      source:
​        value: ${source.name}
​      target:
​        value: ${target.name}

​    lifecycle:
​      Cease:
​      - target.CeaseRelationship3
​      - source.CeaseRelationship3

​      Create:

​      - target.CreateRelationship3
​      - source.CreateRelationship3
```

 

The following is an assembly that will create a set of video streamers and link them to a load balancer which is also created.  It requires the name of a storage assembly to be provided so that it can share the video content between the streamers.

```
name: assembly::Streamer_cluster::1.0

description: An Assembly for a front end cluster comprising of a loadbalancer supported by an authorisation proxy and video streamers using a shared NFS based storage

properties:
  deploymentLocation:
​    type: string
​    required: true
​    description: The location as required by the resource manager. 

  resourceManager:
​    type: string
​    required: true
​    description: The name of the resource resource manager. 

  numOfStreamers:
​    type: string
​    description: the number of streamers that should be created at install time
​    default: 2

  tenant_key_name:
​    type: string
​    required: true
​    description: The SSH key for the current tenant 

  management-network-name:
​    type: uuid
​    required: true    
​    description: the name of the management network in the tenant where the assembly is to be installed 

  public-network-name:
​    type: uuid
​    required: true    
​    description: the name of the public network associated with the tenant where the assembly is to be installed

  max_connections:
​    type: string
​    description: Maximum connections for the balanced server
​    default: '3' 

  cluster_public_ip_address:
​    type: string
​    description: the public IP address for this cluster
​    read-only: true
​    value: '${balancer.publicIp}'

  scaleout-threshold:
​    type: string
​    description: the load value that when exceed will cause a scale out to be invoked
​    default: 80

  scalein-threshold:
​    type: string
​    description: the level of load that will cause a scale in to be invoked
​    default: 10

composition:

  streamer:
​    type: resource::c_streamer::1.0
​    cluster:
​      initial-quantity: ${numOfStreamers}  
​      minimum-nodes: 2
​      maximum-nodes: 10
​      scaling-increment: 2

​    properties:
​      deploymentLocation:
​        value: '${deploymentLocation}'
​      resourceManager:
​        value: '${resourceManager}'
​      key_name:
​        value: '${tenant_key_name}'
​      referenced-management-network:
​        value: '${management-network.id}'       
​      flavor:
​        value: m1.small
​      server_name:
​        value: '${instance.name}'
​      referenced-video-network:
​        value: '${net_video.network-id}'
​      availability_zone:
​        value: DMZ
​      integrity_publication_period:
​        value: 120
​      number-of-intervals:
​        value: 4

  balancer:

​    type: 'resource::c_balancer::1.0'
​    quantity: 1
​    properties:
​      deploymentLocation:
​        value: '${deploymentLocation}'
​      resourceManager:
​        value: '${resourceManager}'

​      key_name:
​        value: '${tenant_key_name}'
​      referenced-management-network:
​        value: '${management-network.id}'
​      referenced-internal-network:
​        value: '${net_video.network-id}'
​      referenced-public-network:
​        value: '${public-network.id}'
​      flavor:
​        value: m1.large
​      server_name:
​        value: '${instance.name}'
​      availability_zone:
​        value: DMZ
​      integrity_publication_period:
​        value: 120
​      number-of-intervals:
​        value: 4

  net_video:

​    type: resource::net_video::1.0
​    quantity: 1
​    properties:
​      deploymentLocation:
​        value: '${deploymentLocation}'
​      resourceManager:
​        value: '${resourceManager}'
​      subnetCIDR:
​        type: string
​        description: (Required)
​        default: '10.0.1.0/24'
​      networkName:
​        type: string
​        description: Network Name
​        default: VIDEO
​      subnetDefGwIp:
​        type: string
​        description: Default Gateway IP address
​        default: '10.0.1.1' 

references:
  management-network:
​    type: resource::urbancode-network::1.0
​    properties:
​      deploymentLocation:
​        value: '${deploymentLocation}'
​      resourceManager:
​        value: '${resourceManager}'
​      name: 
​        value: ${management-network-name}        

  public-network:
​    type: resource::urbancode-network::1.0
​    properties:
​      deploymentLocation:
​        value: '${deploymentLocation}'
​      resourceManager:
​        value: '${resourceManager}'
​      name: 
​        value: ${public-network-name}                        

capabilities: 
  HttpStream:
​    type: httpStream

relationships: 
  uses-net_video:
​    source-capabilities: 
​    - net_video.Network
​    target-requirements: 
​    - streamer.VideoNetwork
​    - storage.VideoNetwork
​    - balancer.VideoNetwork
​    source-state: Active
​    target-state: Inactive

  uses-management-network:
​    source-capabilities: 
​    - management-network
​    target-requirements: 
​    - streamer.ManagementNetwork
​    - storage.ManagementNetwork
​    - balancer.ManagementNetwork
​    source-state: Active
​    target-state: Inactive

  balancer-uses-public-network:
​    source-capabilities: 
​    - public-network
​    target-requirements:
​    - balancer.PublicNetwork
​    source-state: Active
​    target-state: Inactive

  balanceStreamer:
​    source-capabilities: 
​    - streamer.VideoStream
​    target-requirements: 
​    - balancer.HttpServer
​    source-state: Active
​    target-state: Active
​    properties:
​      max_connections:
​        value: '${max_connections}'
​      server_ip:
​        value: '${source.privateIp}'
​      server_port:
​        value: '8080'     
​    lifecycle:
​      Create:
​      - balancer.AddBalancedHttpServer
​      Cease:
​      - balancer.RemoveBalancedHttpServer
```

