---
title: Sizing
weight: 40
---

# Configuring Sizing of Telco Network Cloud Orchestration (TNCO)

The default install of TNCO makes use of the default settings, which will deploy the Standard flavour of TNCO. This includes:

* single instance of Foundation services
* execution of the TNCO configurator job to configure default settings
* single instance of TNCO services, with all security features enabled

## Alternative Sizing Flavours
The flavours directory included in the lm-helm-charts package contains helm values and other useful files for installing alternative recommended deployments of the TNCO. These different flavours allows for variations of sizing for TNCO.

The following flavours are available:

* Basic HA
* Minimal

### Basic HA
Directory: ha
This flavour is intended for a multi-node Kubernetes cluster and includes the following characteristics:

* Multiple instances of TNCO and Foundation services are deployed
* The default storage class is used for Persistent Volumes
* Kafka topics are created with a higher replication factor and partition count

### Minimal
Directory: minimal
This flavour restricts the amount of CPU/Memory/Disk usage of the Kubernetes resources.

## Installation
To install TNCO with any of these flavours, ensure the following values file from the lm-helm-charts package are provided during the Helm install process which is described later in this guide:

Flavour | Helm values file
--------|------------
Basic HA | ./flavours/ha/ha-values.yaml
Minimal | ./flavours/minimal/minimal-values.yaml

## Next steps
You can now proceed to review the configuration for [Security]({{< ref "security" >}})