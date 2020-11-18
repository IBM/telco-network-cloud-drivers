---
title: Getting Started
weight: 10
---

This section details a recommended installation of the [IBM OSSLM Ansible Resource Manager](https://github.com/IBM/osslm-ansible-resource-manager).


# Pre-requisites

## Kubernetes

A Kubernetes cluster is required to install the Ansible RM. This environment must be configured with:

- a [Storage Class](https://kubernetes.io/docs/concepts/storage/storage-classes/) to provision persistent volumes in your cluster
- a [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) to install into (you may use the `default`)

In addition, you will need the following client tools, pre-configured with access to your Kubernetes environment:

- [Helm](https://helm.sh/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Telco Network Cloud Orchestration (TNCO)

We recommend installing a TNCO environment first so the Ansible RM may share the existing Kafka cluster.

## Ansible RM Helm Chart

Download the Ansible RM Helm chart from the [releases](https://github.com/IBM/osslm-ansible-resource-manager/releases) page on GitHub.

# Configuration

The Ansible RM is configured through [Helm chart values](https://helm.sh/docs/using_helm/#using-helm).

You may check the default configuration values of the chart using `helm inspect`:

```
helm inspect values <ansible-rm-helm-chart>
```

This guide will describe how to override the default settings, by referring to a `custom values file`. This file is a custom YAML formatted file, which you must create so it can later be passed during installation.

Create the custom file:

```
touch custom-values.yaml
```

Any future references to the `custom values` should be understood to mean this file.

Start configuring your installation with [Storage](/installation/resource-manager/ansible-rm/storage)
