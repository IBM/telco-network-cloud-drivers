---
title: Add Shared Infrastructure Key to LM
weight: 50
---

# Add the Shared Infrastructure Key to LM

See [infrastructure key management](/user-guides/operations/infrastructure-key-management) for a general introduction to infrastructure keys.

The [resource descriptor](/user-guides/resource-engineering/resource-packages/brent/infrastructure-keys-resource/creating-resource) defines a `server1_ssh_key` key property which is populated with the `apache1_server_key` shared infrastructure key by LM when the Resource driver that stands up the Openstack Apache instance is called. This (SSH) key is assumed to already exist in Openstack (see [prerequisites](/user-guides/resource-engineering/resource-packages/brent/infrastructure-keys-resource/get-started)), and also needs to be added (at least the private key portion) as a shared infrastructure key to LM to allow Resource drivers to communicate with the infrastructure in order to provision it.

Note: in the case of Openstack it's not possible to create key pairs programmatically (using HEAT templates, for example) with existing public and private key portions created using another mechanism (such as openssl), so create the key pair in Openstack UI and use the downloaded private key (e.g server1_ssh_key.pem) when adding as a shared infrastructure key in LM.

The best way to add a shared infrastructure key is to use [LMCTL](https://github.com/accanto-systems/lmctl/blob/master/docs/command-reference/key/add.md). For example:

```
lmctl key add --public server1_ssh_key.pub --private server1_ssh_key.pem dev apache1_server_key
```

where `apache1_server_key` is the name of LM shared infrastructure key, which should have the same value as the key pair you created in Openstack. `server1_ssh_key.pem` is the private key of the Openstack SSH keypair (optional, but required if a Resource driver needs to communicate with the infrastructure), and `server1_ssh_key.pub` contains the public key portion of the Openstack SSH key pair (optional).

# Instantiate Resource

Once you have created the shared infrastructure key you may move on to [onboard and instantiate the Resource](/user-guides/resource-engineering/resource-packages/brent/infrastructure-keys-resource/instantiate-resource)
