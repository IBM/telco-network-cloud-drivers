---
title: Accessing Vault
weight: 10

---

The open source HashiCorp Vault is used to securely store configuration data for Telco Network Cloud Orchestration (TNC-O). It is exposed on an ingress port as host `vault.lm`

Vault has a GUI which can be used to alter the data held. This GUI is protected by a Vault Token with the token allocated to vault during the installation at which time the `time-to-live` for the token is also set. On expiry, this key will need to be [changed or reset](/user-guides/administration/security/managing-vault-tokens/) to its current value to maintain access to vault for both users and the set of TNC-O microservices.

an example Vault URL being
```
https://vault.lm:32443
```

The exact ingress port will be specific to your deployment and can be found by querying the port for the ingress controller.
