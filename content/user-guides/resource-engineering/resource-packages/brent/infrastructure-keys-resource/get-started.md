---
title: Prerequisites
weight: 30
---

# Objectives

This guide aims to show you how to: 

- Create a working Resource with Openstack infrastructure
- Include an external IP address as part of the infrastructure so the Resource service can be accessed publicly
- Create Compute instances accessible with SSH keys that are stored securely in TNC-O (Brent), and provided to lifecycle scripts and inventory to be able to connect to the instance.
- Add lifecycle scripts to configure a software function for the Resource
- Create an instance of the Resource

# Prerequisites

To follow this guide you will need: 

- [LMCTL v2.5.0+](/reference/lmctl)
- A ready-to-use Telco Network Cloud Orchestration (TNC-O) environment
- An Openstack environment (for testing we recommend installing [DevStack](https://docs.openstack.org/devstack/latest/). Playbooks to setup a DevStack VM can be found on [GitHub](https://github.com/accanto-systems/devstack-environment))

## Openstack

Your Openstack environment will need:

- Compute instance image with SSH password access support: `xenial-server-cloudimg-amd64-disk1` (this should be included with a standard DevStack install or manually loaded from [here](https://docs.openstack.org/image-guide/obtain-images.html#ubuntu))
- A public network (should be included with a standard DevStack install)
- A key-pair named `apache1_server_key` of type `SSH Key` to be used by compute instances (create one through the Openstack UI, and save the private key that is downloaded when creating the key)

## Telco Network Cloud Orchestration (TNC-O)

Your TNC-O environment must have the following: 

- [Openstack VIM Driver](https://github.com/accanto-systems/openstack-vim-driver) installed and onboarded
- [Ansible Lifecycle Driver](https://github.com/accanto-systems/ansible-lifecycle-driver) installed and onboarded
- A valid Deployment Location onboarded to TNC-O with the necessary properties required by the Openstack VIM Driver and Ansible Lifecycle Driver

# Get Started

Once you have fulfilled the prerequisites you may start [creating the resource](/user-guides/resource-engineering/resource-packages/brent/infrastructure-keys-resource/creating-resource)