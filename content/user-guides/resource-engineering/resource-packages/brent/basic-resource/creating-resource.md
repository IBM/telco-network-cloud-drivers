---
title: Create Resource
weight: 40
---

# Create the Resource Project

Start by creating a directory for the Resource project and navigating to it

```
mkdir hw-apache2 && cd hw-apache2
```

Use [LMCTL](/reference/lmctl) to create the basis of a Resource project

```
lmctl project create --type Resource --rm brent
```

Each resource requires a resource descriptor in YAML format that is located in the 'Definitions/lm/resource.yaml' file of the resource package. The format of this file is defined by the [TNC-O Resource Descriptor YAML Specification](/reference/descriptor-specification/resource-descriptor).

# Add Resource Descriptor

Update the `Definitions/lm/resource.yaml` file with the following content:

```
description: descriptor for hw-apache2
properties:
  key_name:
    default: default
    description: Name of key-pair to be used for compute instance
  image_id:
    default: xenial-server-cloudimg-amd64-disk1
    description: Image to be used for compute instance
  flavor:
    default: m1.small
    description: Type of instance (flavor) to be used
  internal_ip:
    read-only: true
    description: IP assigned to the server on the internal network
  public_ip: 
    read-only: true
    description: IP assigned to the server to access from the external network
infrastructure:
  Openstack: {}
lifecycle:
  Create:
    drivers:
      openstack:
        selector:
          infrastructure-type:
          - '*'
  Delete:
    drivers:
      openstack:
        selector:
          infrastructure-type:
          - Openstack
```

The descriptor includes 3 input properties, each correspond to an input in our HEAT template: `key_name`, `image_id`, `flavor`. The descriptor also includes 2 read-only properties, which correspond to outputs in our HEAT template: `internal_ip` and `public_ip`. 

`infrastructure` defines the infrastructure type as that of Openstack. `infrastructure-type` property for drivers of lifecycles can then use a wildcard value `'*'` and the default resource infrastructure will be automatically registered by TNC-O.

Under `lifecycle` section are 2 basic lifecycle transitions for the resource: Create and Delete. These will be handled by the [Openstack VIM Driver](https://github.com/IBM/openstack-vim-driver) to manage infrastructure (e.g create VMs with compute, storage and network infrastructure required on Openstack) to fulfill the resource's function.

Note that "Openstack" under `infrastructure` is the infrastructure type by default for all lifecycles, while "openstack" under `lifecycle.Create.drivers` is the [Resource Driver type](/user-guides/resource-engineering/drivers/onboarding) used by a particular lifecycle. 

For "Create" lifecycle, the resource driver will define the format of the templates to be used and automatically pick up suitable infrastructure template under `Lifecycle/openstack`. In the next step we will create a HEAT template for this lifecycle.

# Add Infrastructure template

For this example, we will create a new file called `openstack-heat.yaml` at `Lifecycle/openstack` with the following content:

```
heat_template_version: "2018-08-31"
description: "Base infrastructure for an Apache2 example"

parameters:
  key_name:
    type: string
    label: Key Name
    description: Name of key-pair to be used for compute instance
  image_id:
    type: string
    label: Image ID
    description: Image to be used for compute instance
  flavor:
    type: string
    label: Instance Type
    description: Type of instance (flavor) to be used

resources:
  ap_security_group: 
    type: "OS::Neutron::SecurityGroup"
    properties: 
      rules: 
        - port_range_min: 1
          port_range_max: 100
          protocol: tcp
        - remote_ip_prefix: 0.0.0.0/0
          protocol: icmp
      name: ap_security_group

  ap_net: 
    type: "OS::Neutron::Net"
    properties: 
      admin_state_up: true
      name: ap_net

  ap_subnet: 
    type: "OS::Neutron::Subnet"
    properties: 
      network: { get_resource: ap_net }
      name: ap_subnet
      enable_dhcp: true
      cidr: "10.10.10.0/24"
  ap_port: 
    type: "OS::Neutron::Port"
    properties: 
      admin_state_up: true
      fixed_ips: 
        - subnet: { get_resource: ap_subnet }
      security_groups: 
        - { get_resource: ap_security_group }
      name: ap_port
      network: { get_resource: ap_net }

  ap_router: 
    type: "OS::Neutron::Router"
    properties: 
      admin_state_up: true
      name: ap_router
      external_gateway_info:
        network: "public"

  ap_routerinterface: 
    type: "OS::Neutron::RouterInterface"
    properties: 
      router: { get_resource: ap_router }
      subnet: { get_resource: ap_subnet }

  apache_server_floating_ip:
    type: OS::Neutron::FloatingIP
    properties:
      floating_network: "public"
      port_id: { get_resource: ap_port }

  apache_server: 
    type: "OS::Nova::Server"
    properties: 
      networks: 
        - port: { get_resource: ap_port }
      name: apache_server
      flavor: { get_param: flavor }
      key_name: { get_param: key_name }
      image: { get_param: image_id }
      config_drive: true
      user_data_format: RAW
      user_data: |
        #cloud-config
        manage_etc_hosts: true
        bootcmd: 
         - [ sysctl, net.ipv4.ip_forward=1 ]
         - [ sh, -c, echo 'nameserver 8.8.8.8' > /etc/resolv.conf ]
        ssh_pwauth: True
        password: ubuntu
        chpasswd:
          list: |
            ubuntu:ubuntu
          expire: False
        packages:
         - "python"

outputs:
  internal_ip: 
    value: { get_attr: [ apache_server , first_address ] }
  public_ip: 
    value: { get_attr: [ apache_server_floating_ip , floating_ip_address ] }
```

This will create an Apache Server running in an Openstack VM.

# Next Steps

You have now created the basic files needed for a simple Resource with OpenStack infrastructure. Move on to [onboard and instantiate the Resource](/user-guides/resource-engineering/resource-packages/brent/basic-resource/instantiate-resource)