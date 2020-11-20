---
title: Overview
weight: 30
---

# Resource Driver Overview

Brent handles Resource Manager transition and operation requests for Resources using Resource Drivers.

The following diagram shows the interactions between Brent and a resource driver ![Brent and resource driver](/images/user-guides/resource-engineering/brent/BrentArchitecture-v2_2.png "Brent and resource driver")

Resource Driver is a combination of [VIM](http://servicelifecyclemanager.com/2.1.0/user-guides/resource-engineering/drivers/vim/overview/) and [Lifecycle](http://servicelifecyclemanager.com/2.1.0/user-guides/resource-engineering/drivers/lifecycle/overview/) drivers of TNC-O version 2.1 into a single driver concept. 

Unlike in v2.1.0 where a VIM Driver handles infrastructure creation/deletion while Lifecycle Driver executes resource transitions once the resource has been created; a Resource Manager handles both infrastructure and lifecycles by serving Create/Delete as lifecycle requests.

## Version compability between TNC-O and drivers

| TNC-O Version | lmctl    | Ansible Lifecycle Driver | SOL 003 Lifecycle Driver | Openstack VIM Driver | Kubernetes Resource Driver |
|------------|----------|--------------------------|--------------------------|----------------------|----------------------------|
| 2.0.3      | 2.0.7.1  | none                     | none                     | none                 | none                       |
| 2.1.0      | 2.4.1    | 0.5.0 - 1.1.0            | 0.0.3 - 0.0.5            | 0.4.0 - 1.0.0        | none                       |
| 2.2.x      | >= 2.5.0 | >= 2.0.0                 | 0.1.0                    | >= 2.0.0             | >= 0.0.3a1                 |

- [Ansible Lifecycle Driver](https://github.com/accanto-systems/ansible-lifecycle-driver/blob/master/docs/index.md)
- [SOL 003 Lifecycle Driver](https://github.com/accanto-systems/sol003-lifecycle-driver)
- [Openstack VIM Driver](https://github.com/accanto-systems/openstack-vim-driver/blob/master/docs/index.md)
- [Kubernetes Resource Driver](https://github.com/accanto-systems/kubernetes-driver/blob/master/docs/index.md)

If you want to create your own Resource Driver, check out [how to create custom driver](/user-guides/resource-engineering/drivers/creating-drivers/).

# Next Steps

Once you understand the basics of the drivers and have installed some for your own testing, you should continue to [onboard the drivers](/user-guides/resource-engineering/drivers/onboarding/) in TNC-O.