---
title: Resource Descriptor
weight: 20
---

# Introduction

This document describes the descriptors that are used by the Agile Lifecycle Manager (ALM). ALM needs to have descriptions of the building blocks of applications that it is going to manage. The basic building blocks are described in resource descriptors. Sets of these are composed into assembly descriptors to allow designers to describe a complete application/service that they need LM to manage.  

## Naming

Each resource must have a name and a version - it is advisable to name the resource assuming other people might use the same name i.e. `companyname.resourcename`. Any change to any part of the resource should result in creating a new resource with an updated version number.

The resource descriptor name field will contain the following string:

`resource::uniqueName::1.0`

This consists of three components, each separated by a `::` (double colon). 

* **Descriptor Type:**  LM supports two descriptor types `assembly` and `resource` identifying the two core descriptor types.
* **Name:**  Each descriptor is uniquely identified by its name for a given descriptor type. The name must match the following rules
  * Must start with a letter (either case)
  * Can include letters, digits, _non-consecutive_ underscores (single) and hyphens (minus sign).
  * The name must not contain spaces
  * A maximum length of 50 characters. 
* **Version:**   The version is a field consisting of one or more numeric values separated by single _point_ `.` no alpha characters are permitted thus `1.0` and `1.0.0` are valid while `v1.0` is not.
 
# Descriptor Sections

The following sections of the descriptors can occur in resource descriptors. These can be required or optional. Default values can be supplied. The table below describes the resource descriptor sections:

| Name                   | Required | Comment, Function or Description                                                                                  |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| **name**               | N        | Unique name and version name of the resource.                                                                     |
| **description**        | N        | Description of the resource.                                                                                      |
| **properties**         | N        | Properties and values for the resource instance such as image location, networks, information for metrics and ID. |
| **private-properties** | N        | Private properties and values for the resource instance. These properties are not exposed outside of Brent.       |
| **infrastructure**     | N        | Infrastructure that applies for this resource.                                                                    | 
| **lifecycle**          | N        | Lifecycles that apply for this resource.                                                                          | 
| **default-driver**     | N        | The default Resource driver to use if not explicitly defined in either "operations" or "lifecycle".              | 
| **metrics**            | N        | Metrics such as integrity and publication period.                                                                 | 
| **policies**           | N        | Policies using these metrics such as heal based in the integrity metric.                                          |
| **operations**         | N        | Transitions that are invoked when establishing relationships.                                                     |

## Header

The header of a resource descriptor includes the name and textual description of the descriptor and associated resource manager type. The contents of the name field must be a globally unique string.

```
name: resource::c_streamer::1.0

description: Component package for c_streamer 
```

## Properties and Private Properties

{{%note %}}
NOTE: Properties sections can occur in a number of places through a descriptor. The rules defined here apply to the top-level `properties` and `private-properties` sections of the resource descriptor. Rules applicable to property names and the “value” field can be applied to all property sections.
{{%/note %}}

The `properties` and `private-properties` sections defines the properties of a resource instance; that is, the set of properties that are required to orchestrate a resource through to the Active state. These can be understood as the context for the management of the resource during its lifecycle. The `properties` section comprises the set of properties that are exposed outside of Brent. The `private-properties` section defines the `private` properties of a resource instance. These properties are not exposed through the north-bound resource manager API of Brent, but they are sent to drivers along with the "properties" through the south-bound driver APIs when handling transition requests.

Each property is identified by a name and a number of attributes.

| Attribute   | M/O | Type               | Restrictions                                                                                          | Comment  |
| ----------- | --- | ------------------ | ----------------------------------------------------------------------------------------------------- | -------- |
| name        | M   | string             | No spaces permitted, minimum length of one character (alphanumeric), no `dot` characters, must conform to yaml. | The chosen name for the property. There are few restrictions placed on it so as not to restrict its use however the limited identified restrictions in addition to scope uniqueness must be met.    |
| type        | M   | value              | `string` \| `key` \| resourceKeyId                                                                    | Currently only the value `string` or `key` is supported. This attribute exists to support product expansion.   |
| required    | O   | bool               |                                                                                                       | Indicates that a value for this property must be provided at Resource instantiation time.    |
| description | O   | string             |                                                                                                       | A textual description of the role of the property.    |
| default     | O   | string             |                                                                                                       | An optional default value can be provided which will be supplied to the resource in the event that an override is not provided at instantiation time.  |
| read-only   | O   | bool               |                                                                                                       | Indicates that a value cannot be provided at instantion time (*note* a default or a mapped property may be provided) and that the resource may provide a (updated) value once instantated.  |
| volatile    | O   | bool               |                                                                                                       | Identifies that changes to this property will not, in and of itself, trigger a reinstall of the resource. Additional information can be found [here](/reference/descriptor-specification/resource-descriptor#volatile-properties). |
| Value       | O   | string / Reference |                                                                                                       | It is possible to provide a static value for the resource property which cannot be overridden at instantiation time. Alternatively a value can be identified as being mapped from one or more properties of the parent Assembly or from those of any peer component using a ${_\<sourceProperty\>_} notation.|

```
properties:
  deploymentLocation: # the name of the property 
​    type: string
​    required: true
​    description: The name of the OpenStack project (tenant) to deploy this resource to. 

  numOfStreamers:
​    type: string
​    description: The number of streamers that should be created at install time
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

  licanceKey:
​    type: string
​    description: A runtime modifiable licanceKey
    volatile: true

  vmKeyId:
​    type: resourceKeyId
​    description: The identity of the Key which should be used when communicating with the VM
    required: true
```

* `name` - each property name must be unique within its property section (scope). The name cannot contain dot (period) character but has limited additional restrictions.

* `type` - currently, the _type_ field has restricted use. As of ALM 2.1 two additional supported types of `resourceKeyId` and `key` are supported over the previously supported `string`. The default type is `string`.

_type_ will in future allow active handling of different types of data (for example: dates, IP addresses, etc…). It is recommended users omit this field or use the supported values of “string” and "key" to avoid compatibility issues in the future.

Properties are optional unless explicitly defined as required by the inclusion of a `required: true` flag. This only has material affect on a top-level assembly and means that a value *must* be present (for example: not null) for a property. However it is recommended that where a value is mandatory it be present in a resource descriptor as an aid to Assembly descriptor designers to ensure that it is reflected in assemblies as the property is mapped/promoted. This can be evaluated from the “value” field, a “default” or passed in from the intent request.

Properties marked as read-only: true will not be overridden by values mapped in from an enclosing assembly or from the intent request. This is typically used for properties that are calculated from or returned by the resource itself.

Properties may be declared with a default value or a specific value or neither. Where the value field is used it may either be an explicit value or it may reference to another property within the descriptor. When referencing another property, the reference will look as follows: value: ‘${max_connections}’ 

The LM will assign an internal name and identifier for each resource instance it creates. It also supplies the index number of a resource in a cluster. These values can be useful to give unique names for servers etc. To access them a property may have its value set to ${instance.name}, ${instance.id} or ${instance.index}. These should be placed in the value field of a property. The LM will then replace the placeholders with the appropriate value. 

{{%note %}}
NOTE: It is essential that there is a space between the “value:” and the quoted property value string. If you fail to put a space between these two items then it will be treated as a single string.
{{%/note %}}

### Key Properties (v2.1 onwards)

Properties can have a type `key`. For non-read-only properties, the value of a key property is the `name` of a [shared infrastructure key](/user-guides/operations/infrastructure-key-management) managed by Brent. The actual key will be substituted at runtime before being sent to Brent drivers. For read-only properties, the value of a key property is the name of a shared infrastructure key.

### Volatile Properties
New to LM 2.1 is an additonal property attribute 'volatile' which identifies a property as being a runtime modifiable property. 

A volatile property is one which the designer has actively identified as being modifiable for an instantiated, active assembly/resource without the need for ALM to _'reinstall'_ the assembly/resource. Rather, where the set of property changes to individual resources within an assembly, wholly consists of changes to the values of volatile properties, LM will execute a [Reconfigure operation](/user-guides/operations/manage-instances/) on those resources rather than follow the default resource 'reinstall' procedure which would otherwise be followed.

It is important to note that while it can be identified as an attribute of a property at both the assembly and resource level it only meaning at the resource level. However it is good practice to flag properties as being volatile through the assembly hierarchy 

#### Identifying a property as Volatile
A property is identified as being volatile by adding the following attribute to its descriptor. This is achieved through the LM UI by selecting the _Volatile_ tick box on the property. 

```
  volatile: true
```

For example:
```
  licenceKey:
​    type: string
​    description: A runtime modifiable licenceKey
    volatile: true
```

#### Reconfigure & Volatile properties

The **reconfigure** action for a Resource is triggered only when certain criteria are met. If they are not all met then a _standard_ change procedure if Uninstall and reinstall is followed. 

1. The only changes made to a resource are volatile property changes
2. No other changes to the assembly cascade through property dependencies to the resource
3. The resource is in an active state

 With all three of these preconditions met the [Reconfigure operation](/user-guides/operations/manage-instances/) will be executed.


#### Property attribute conflicts
The volatile attribute can be added to any property subject to the following restrictions;

1. A volatile property cannot be **readonly** as the combination represents conflicting directives
2. A volatile property cannot have a **static Value** as a static Value makes the value immutable

## Capabilities and Requirements

These two sections allow designers to explain what functions the resources are implementing or need before they can work successfully. These might be expressing that networks or various types must be available for the resource instances to work or it may be describing that a resource supports, for example, incoming http requests.

The type is a string that expresses the capability or requirement.  The values in these string will have to be agreed across an organization and where possible they should be agreed by the industry. Resource capabilities should use common industry terms. In the examples below the idea is that httpStreamOutput indicates that the capability is using the http protocol in a stream form and in an output direction. The OS::Neutron:Net is the resource type from OpenStack associated with a network instantiated within neutron.  

### capabilities

These are used to enable service designers to understand what function a resource provides.  

```
capabilities:
​    VideoStream:
​        type: httpStreamOutput

capabilities:
​    Network: 
​        type: neutronNetwork
```

### requirements

Similar to the capabilities the requirements contain the list of capabilities that the resource needs to be provided for them to work.  

```
requirements:

​    VideoNetwork:
​        type: neutronNetwork

​    ManagementNetwork:
​        type: neutronNetwork

​    RemoteNFSMountPoint:
​        type: nfsExportMountpoint
```

## operations

This section defines sets operations that can be called to enable relationships to be created between resources.  Operations definitions in the resource have a name and a set of properties. Where a resource descriptor describes an operation. As a convention the name of the operation should be linked to the capability that is being enabled through the creation of the relationship.

``` 
operations:

  RemoveHttpStreamOutput:

​    description: removes the http server from being managed by the balancer

​    properties:

​      server_ip:
​        type: string
​        description: Http Server Ip Address
​        default: the ip address

​      server_port:
​        type: string
​        description: http server port number 
​        default: '8080'

  AddHttpStreamOutput:

​    description: adds an http server to the balancer's pool

​    properties:

​      max_connections:
​        type: string
​        description: Maximum connections for the balanced server
​        default: 3

​      server_ip:
​        type: string
​        description: Ip Address of the server to be balanced

​      server_port:
​        type: string
​        description: Port on balanced server
​        default: '8080'
```

## Infrastructure

The "infrastructure" section defines the resource's infrastructure types as empty maps objects. Mappings from infrastructure type to template types and template files will be set under each [lifecycle section](#lifecycle) (e.g Create or Delete).

```
infrastructure:
  Openstack: {}
```

## Default Driver

The `default-driver` section matches any driver selection that is not explicitly defined in `lifecycle` or `operations`. It defines the Resource Driver to use if no explicit match is made.

```
default-driver:
  ansible:
    selector:
      infrastructure-type:
      - '*'

```

## Lifecycle

The lifecycle section defines the lifecycle transitions that the resource supports. 

Resource descriptors must support the Create lifecycle transition. However, they may implement the other lifecycle transitions which are: Install, Configure, Reconfigure, Start, Stop, Integrity, Delete and Uninstall. Where the transition is not provided by the resource, LM will be free to change the state of the associated component instances without calling any underlying transition.

For each lifecycle transition one can configure in the "drivers" section which Resource Driver to use based on property values. The key is the type of a [Resource Driver](/user-guides/resource-engineering/drivers/onboarding/). 

Through [Resource Drivers](content\user-guides\resource-engineering\drivers\overview.md), `Create` and `Delete` handles the existence of infrastructure objects while other lifecycles execute lifecycle transitions against the objects that are part of the resource's associated topology. An example: "Create" lifecycle uses the [Kubernetes Driver](https://github.com/accanto-systems/kubernetes-driver) to create a Kubernetes pod, then "Install" lifecycle runs an Ansible playbook in that pod.

Selector criteria defines property values to match when selecting a resource driver to handle a lifecycle transition request. At present only `infrastructure-type` (the deployment location "type") is supported, allowing the selection of a resource driver based on one or more infrastructure types.

```
infrastructure:
  Openstack: {}

lifecycle:
  Create:
    drivers:
      openstack:
        selector:
          infrastructure-type:
          - Openstack
        template:
          file: heat.yaml
          template_type: HEAT
  Install:
    drivers:
      ansible:
        selector:
          infrastructure-type:
          - '*'
  Delete:
    drivers:
      openstack:
        selector:
          infrastructure-type:
          - '*'

```

## Metrics and Policies

A resource descriptor may indicate that the underlying resource will emit one or more metrics.  

A metric is defined as having a name, type and an optional publication-period. 

If no publication period is given at all, a default of 60 seconds is assumed.  The publication period is in seconds.  A value of 0 means no metrics will be published.  The value must be +integer

There are two reserved types that are used by ALM to monitor the health of the associated resource instances.:
 

* `metric::integrity`
* `metric::load`

Example resource metrics.

```
metrics:
  h_integrity:
​    type: "metric::integrity"
​    publication-period: "${integrity_publication_period}"

  load:
​    type: "metric::load"
```

{{%note %}}
NOTE: Property references are used to allow the value for the publication period to be passed from a separate properties section in the resource.
{{%/note %}}

Within the resource descriptor the policies section contains details of the heal policy.  This allows the smoothing interval to be defined for the resource.

Each policy has a name, the associated metric, an action (heal) and a properties section. Example policies section.

```
policies:
  heal:
​    metric: "h_integrity"
​    type: "policy::heal"
​    properties:
​      smoothing:
​        value: "${number-of-intervals}"
```

The above example shows the policy associated with the Integrity metric.  The smoothing value is used to prevent ‘snap’ changes happening due to unusual short-term conditions.

{{%note %}}
NOTE: the properties, smoothing, threshold, target are all policy specific properties that may not be required by other types of policy.
{{%/note %}}

Example of smoothing:

 ![example_of_smoothing](/images/reference/descriptor-specification/example_of_smoothing.png)

### Example Integrity Metric (on Kafka)

LM expects integrity metrics on the `alm__integrity` Kafka topic to have the following JSON form:

```
{
  "metricKey" : "142971c5-a84b-4d34-af15-435ba8640aec",
  "metricName" : "h_integrity",
  “metricId” : "142971c5-a84b-4d34-af15-435ba8640aec.h_integrity",
  "integrity" : "OK",
  "message" : "Everything is working"
}
```

| **Field**  | **Description**                                              | **Mandatory** |
| ---------- | ------------------------------------------------------------ | ------------- |
| metricKey  | The key provided when the resource was created             | Yes           |
| metricName | The name of the metric as defined in the resource descriptor | No            |
| metricId   | The unique ID for this  metric value. Made from concatenating the metricKey and the metricName. This   is used as the Kafka Key so all Resources **must** send this value so that multiple metrics with the same name can be supported correctly. | Yes           |
| integrity  | Allowed values: `OK` \| `BROKEN`  Equating to `OK` when the resource is healthy and passing its Integrity checks and `BROKEN` when the checks fail | Yes           |
| message    | An optional message to   add value to the metric – useful in the event of `BROKEN` | No            |

### Example Load Metric (on Kafka)

LM expects load metrics on the `alm__load` Kafka topic to have the following JSON form:

```
{
  "metricKey" : "818127b3-1904-4737-a60c-8c7bab73532d",
  "metricName" : "h_load",
  “metricId” : "818127b3-1904-4737-a60c-8c7bab73532d.h_load",
  "load" : 76,
  "message" : "Load is high"
}
```

| **Field**  | **Description**                                              | **Mandatory** |
| ---------- | ------------------------------------------------------------ | ------------- |
| metricKey  | The key provided when the resource was created             | Yes           |
| metricName | The name of the metric as defined in the resource descriptor | No            |
| metricId   | The unique ID for this metric value. Made from concatenating the metricKey and the metricName. This   is used as the Kafka Key so all Resources **must** send this value so that multiple metrics with the same name can be supported correctly. | Yes           |
| load       | A value between 0 and 100 (i.e. a percentage) indicating the level of the load a resource is   experiencing.  A higher value indicates a higher load | Yes           |
| message    | An optional test string to include information about the integrity of the resource.  for example, it may include an error code | No            |

# Yaml Examples

The examples included below show the c_balancer,c_streamer and the net_video resources.

### resource::net_video:1.0

This is a resource that creates a neutron network

```
name: resource::net_video::1.0 

description: resource to create an internal neutron network that includes a subnet

properties:

  subnetCIDR:
​    type: string 
​    description: The subnet classless inter-domain routing
​    default: '10.0.1.0/24'

  networkName:
​    type: string
​    description: Network Name
​    value: VIDEO

  subnetDefGwIp:
​    type: string
​    description: Default Gateway IP address
​    default: '10.0.1.1'

  network-id:
​    type: string
​    description: the id of the network just created
​    read-only: true

capabilities:
​    Network: 
​        type: OS::Neutron::Net

lifecycle:
- Install
- Uninstall
```

### A simple component with metrics and policies

```
name: "resource::h_simple::1.0"
description: "resource for  t_simple"
properties:

  server_name:
​    type: "string"
​    value: "${instance.name}"

  referenced-internal-network:
​    type: "string"
​    description: "Generated to reference a network"

  reference-public-network:
​    type: "string"
​    description: "Generated to reference public network"

  image:
​    type: "string"
​    description: "The Image reference"

  key_name:
​    type: "string"
​    description: "SSH key"

  data:
​    type: "string"
​    description: "parameter passed"
​    default: "data"

  integrity_publication_period:
​    type: "string"
​    description: "the period that should be used to publish the metrics"
​    default: "60"

  publication_period:
​    type: "string"
​    description: "the period that should be used to publish the metrics"
​    default: "60"

  number-of-intervals:
​    type: "string"
​    description: "The intervals before calling a Heal"
​    default: "3"

  output:
​    type: "string"
​    description: "an example output parameter"
​    read-only: true

operations:

  CreateRelationship1:
​    description: "Create a new relationship"
​    properties:
​      source:
​        type: "string"
​        description: "that name of the source"

​      target:
​        type: "string"
​        description: "that name of the target"

  CeaseRelationship1:
​    description: "Cease an existing relationship"
​    properties:
​      source:
​        type: "string"
​        description: "that name of the source"

​      target:
​        type: "string"
​        description: "that name of the target"

  CreateRelationshipr2:
​    description: "Create a new relationship"
​    properties:
​      source:
​        type: "string"
​        description: "that name of the source"

​      target:
​        type: "string"
​        description: "that name of the target"

  CeaseRelationship2:
​    description: "Cease an existing relationship"
​    properties:
​      source:
​        type: "string"
​        description: "that name of the source"

​      target:
​        type: "string"
​        description: "that name of the target"

  CreateRelationship3:
​    description: "Create a new relationship"
​    properties:
​      source:
​        type: "string"
​        description: "that name of the source"

​      target:
​        type: "string"
​        description: "that name of the target"

  CeaseRelationship3:
​    description: "Cease an existing relationship"
​    properties:
​      source:
​        type: "string"
​        description: "that name of the source"

​      target:
​        type: "string"
​        description: "that name of the target"

metrics:
  h_integrity:
​    type: "metric::integrity"
​    publication-period: "${integrity_publication_period}"

  load:
​    type: "metric::load"

policies:
  heal:
​    metric: "h_integrity"
​    type: "policy::heal"
​    properties:
​      smoothing:
​        value: "${number-of-intervals}"

lifecycle
- "Configure"
- "Install"
- "Integrity"
- "Start"
- "Stop"
- "Reconfigure"
- "Uninstall"
```

### resource::c_streamer::1.0

This descriptor will create a virtual server that streams video traffic using the http protocol.

```
name: resource::c_streamer::1.0
description: resource descriptor for c_streamer
properties:
  key_name:
​    type: string
​    required: true
​    description: the SSH key-pair name to be used by OpenStack with the associated VM instances

  referenced-management-network:
​    type: string
​    required: true
​    description: The id of the network that will act in the role of a management network

  flavor:
​    type: string
​    required: true
​    description: Flavor to be used for compute instance

  server_name:
​    type: string
​    required: true
​    description: the name of the server to be created

  referenced-video-network:
​    type: string
​    description: The id of the network that will act in the role of an internal network

  availability_zone:
​    type: string
​    description: Name of availability zone in which to create the instance
​    default: DMZ

  privateIp:
​    type: string
​    description: IpAddress of server on the internal network
​    read-only: true 

  mgmtIp:
​    type: string
​    description: IpAddress of server on the management network
​    read-only: true          

  integrity_publication_period:
​    type: string
​    description: the number of seconds between publishing integrity metric
​    default: 60

  number-of-intervals:
​    type: string
​    description: the number of intervals for smoothing
​    default: 3

capabilities:
​    VideoStream:
​        type: httpStreamOutput

requirements:
​    VideoNetwork:
​        type: neutronNetwork

​    ManagementNetwork:
​        type: neutronNetwork

    RemoteNFSMountPoint:
​        type: nfsExportMountpoint

lifecycle:

- Install
- Uninstall
- Configure
- Start
- Stop
- Integrity

operations:
  MountStorage:
​    description: An operation to enable the streamer to mount a remote NFS mount point
​    properties:
​      remote_nfs_port:
​        type: string
​        description: Port for the NFS
​        default: '2049'

​      remote_nfs_server_ip:
​        type: string
​        description: Ip Address of remote nfs server

​      remote_mount_point:
​        type: string
​        description: Location of NFS Exported Mount Point
​        default: /

​      local_mount_point:
​        type: string
​        description: The location where the remote nfs mount will be mounted in the local machine
​        default: /mnt

  UnmountStorage:
​    description: An operation to unmount a remote NFS mount point
​    properties:
​      local_mount_point:
​        type: string
​        description: The location where the remote nfs mount will be mounted in the local machine
​        default: /mnt
```

### resource::c_balancer::1.0

```
name: resource::c_balancer::1.0
description: component package for a http loadbalancer
properties:
  key_name:
​    type: string
​    description: SSH key_name.

  referenced-management-network:
​    type: string
​    description: Generated to reference a network

  referenced-internal-network:
​    type: string
​    description: Generated to reference a network 

  referenced-public-network:
​    type: string
​    description: Generated to reference a network

  flavor:
​    type: string
​    description: Flavor to be used for compute instance

  server_name:
​    type: string
​    description: server name of the balancer

  availability_zone:
​    type: string
​    description: Name of availability zone in which to create the instance
​    default: DMZ

  mgmtIp:
​    type: string
​    description: IpAddress of server in management network
​    readOnly: true

  internalIp:
​    type: string
​    description: IpAddress of server on internal network
​    readOnly: true     

  publicIp:
​    type: string
​    description: Public IpAddress of server
​    readOnly: true  

  integrity_publication_period:
​    type: string
​    description: the number of seconds between publishing integrity metric
​    default: 60

  number-of-intervals:
​    type: string
​    description: the number of intervals for smoothing
​    default: 3     

capabilities:
​    HttpLoadBalancer:
​        type: loadbalancerHttp

requirements:
​    PublicNetwork:
​        type: neutronNetwork

​    ManagementNetwork:
​        type: neutronNetwork

​    HttpServer:
​        type: http

lifecycle:

- Install 
- Uninstall 
- Start
- Stop 

operations:
  RemoveBalancedHttpServer:
​    description: removes the http server from being managed by the balancer
​    properties:
​      server_ip:
​        type: string
​        description: Http Server Ip Address
​        default: the ip address

​      server_port:
​        type: string
​        description: http server port number 
​        default: '8080'

  AddBalancedHttpServer:
​    description: adds an http server to the balancer's pool
​    properties:
​      max_connections:
​        type: string
​        description: Maximum connections for the balanced server
​        default: 3

​      server_ip:
​        type: string
​        description: Ip Address of the server to be balanced

​      server_port:
​        type: string
​        description: Port on balanced server
​        default: '8080'
```

#### Metrics in the Resource Descriptor

Each resource may emit metric information to help in its management. ALM is expecting all collected metrics from resources to be made available on Kafka. ALM listens to specific Kafka topics for events containing metrics. Metrics should be associated with necessary identifiers including timestamps, names of the metric and “Metric Identifiers” specifying the source resource of the metrics. 

Metrics for Integrity and Load are defined in the resource Descriptor. The Integrity metric is used to heal a broken resource. The Load metric is used in the VNF or Network Service to scale a VNF:
```
metrics:
 lb_integrity:
 type: metric::integrity
 publication-period: ${integrity_publication_period}
 lb_load:
 type: metric::load
 publication-period: ${load_publication_period}
```

#### Heal Policy in the Resource Descriptor

The Integrity or Heal policy in the resource Descriptor can be seen in the example below:
```
metrics:
  h_integrity:
    type: "metric::integrity"
    publication-period: "10"
policies:
  heal:
    metric: "h_integrity"
    type: "policy::heal"
    properties:
      smoothing:
        value: ${integrity_smoothing}
```

This shows the metrics section in the resource Descriptor that defines the metric called h_integrity. For the Integrity metric a policy is also included that defines the number of smoothing periods that will pass before the resource will be either marked as BROKEN when the BROKEN integrity messages have sent, or if the resource is missing. 

{{%note %}}
NOTE: the policy for Scaling is defined in the VNF or Network Service Descriptor and not in the resource descriptor.
{{%/note %}}









### An Example of a Resource Descriptor

Below is an example of an LM resource descriptor:

```
name: resource::simple_resource::1.0.0
description: An example resource
properties:
  device_id:
    description: The ID of the Device
    type: string
    value: ${instance.id}
    
  device_name:
    description: The name of the  Device
    type: string
    required: true
  mgmt_network:
    description: The management network used to manage the device
    type: string
    default: mgmt
  mgmt_address:
    description: The management network ip address of the the device
    type: string
    read-only: true
  instance_name:
    value: ${instance.name}

lifecycle:
- Install
- Configure
- Start
- Integrity
- Stop
- Uninstall

operations:
  addRule:
    properties:
      mgmt_address:
        type: string
        description: the ip_address of the instance
        value: ${mgmt_address}
      rule_name:
        type: string
        description: The name of the rule
        required: true
      rule_type:
        type: string
        description: The type of rule
        default: Other
        required: true
       
  deleteRule:
    properties:
      mgmt_address:
        type: string
        description: the ip_address of the instance
        value: ${mgmt_address}
      rule_name:
        type: string
        description: The name of the rule
        required: true
      rule_type:
        type: string
        description: The type of rule
        default: Other
        required: true
  addNetworkInterface:
    properties:
      network_name:
        type: string
        description: The name of the network
        required: true
      interface_name:
        type: string
        description: the name of the vnic to be used
        default: vnic0
      device_name:
        type: string
        description: The name of this device
        required: true       
  deleteNetworkInterface:
    properties:
      network_name:
        type: string
        description: The name of the network
        required: true
      interface_name:
        type: string
        description: the name of the vnic to be used
        default: vnic0
      device_name:
        type: string
        description: The name of this device
        required: true

metrics:
  h_load:
    type: metric::load
    publication_period: 60
  h_integrity:
    type: "metric::integrity"
    publication-period: "10"
policies:
  heal:
    metric: "h_integrity"
    type: "policy::heal"
    properties:
      smoothing:
        value: ${integrity_smoothing}

```

{{%note %}}
NOTE: The resource_id property that has a value set to “$\{instance.id\}”. When the resource is created this will have the ID for the resource that the LM has assigned it. Other options are “$\{instance.id\}” that will have the LM name for the resource and “$\{instance.index\}” which will have the unique index number for a resource when more than one can be created by the LM within an assembly.
{{%/note %}}
 