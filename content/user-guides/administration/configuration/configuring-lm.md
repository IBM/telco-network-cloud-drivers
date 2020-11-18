---
title: Managing Configuration
weight: 40
---

# Pre-requisites

To follow this guide you will need:

- an existing installation of the Telco Network Cloud Orchestration (TNCO)

# Vault

Many of the applications installed as part of the Lifecycle Manager load configuration from a configuration repository service. Vault is the chosen storage mechanism for any secure config required by the microservices. It is an industry standard approach to storing sensitive information and stores all secure config in a highly encrypted format.

Configuration may be loaded into Vault during the installation through the `lm-configurator` Helm chart but it is also possible to update the configuration post-install by visiting the Vault UI.

# Application Configuration

Application configuration is persisted using a secrets engine named `lm` in Vault. 

![Vault UI](/images/user-guides/administration/configuration/VaultUI.png "Vault UI")

A secret will exist for each TNCO service inside the `lm` engine, with configuration properties stored as JSON content. Any configuration stored under the secret named `application` will be shared among all services.

![Vault Backend](/images/user-guides/administration/configuration/vault-backend.png "Vault Backend")

Configuration is stored within the secret as key/value pairs, where the name is the dot-separated name of the configuration item.

![Vault Secret](/images/user-guides/administration/configuration/vault-secret.png "Vault Secret")

Click the ‘Edit’ toggle switch to enter edit mode

![Vault Edit Secret](/images/user-guides/installation-and-administration/configuration/vault-edit-secret.png "Vault Edit Secret")

New property values should be added as dot separated keys.