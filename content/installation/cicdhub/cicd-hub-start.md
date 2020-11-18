---
title: Getting Started
weight: 10
---

This section details how to install the CI/CD Hub using Helm on an existing Kubernetes cluster. This will install the following services:

- **Gogs**: Lightweight self-hosted Git service
- **Nexus**: Artifact repository manager
- **Jenkins**: Automation server to enable continuous integration and continuous delivery
- **Openldap**: Open-source implementation of the Lightweight Directory Access Protocol, for user management of Telco Network Cloud Orchestration (TNCO) environments
- **Docker Registry**: Registry for hosting docker images
- **Nginx Ingress**: Ingress controller to support accessing some services with Ingress

# Pre-requisites

## Kubernetes

A Kubernetes cluster is required to install the Hub. This environment must be configured with:

- a [Storage Class](https://kubernetes.io/docs/concepts/storage/storage-classes/) to provision persistent volumes in your cluster
- a [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) to install into (you may use the `default`)

In addition, you will need the following client tools, pre-configured with access to your Kubernetes environment:

- [Helm](https://helm.sh/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

### ICP

If installing on ICP we recommend you read through our [ICP Pre-Install Considerations](/reference/icp-pre-install) before continuing.

## CI/CD Hub Artifacts

Download the CI/CD Hub Helm chart from the [releases](https://github.com/accanto-systems/lm-cicdhub/releases) page on GitHub.

# Offline Install

If you need to install the CI/CD Hub in an environment without internet access, please read through the [Offline Install Instructions]({{< ref "offline.md" >}}) to pre-pull additional artifacts required during the install.

# Configuration

The CI/CD Hub is configured through [Helm chart values](https://helm.sh/docs/using_helm/#using-helm).

You may check the default configuration values of the chart using `helm inspect`:

```
helm inspect values <cicdhub-helm-chart>
```

## Configuration Steps

This following sections will take you through the default configuration of the chart. They will also explain how to override them (at your discretion), using a `custom values file`. This file is a custom YAML formatted file, which you must create when changing values, so it can later be passed during installation.

Create the custom file:

```
touch custom-values.yaml
```

Any future references to the `custom values` should be understood to mean this file.

Start configuring your installation with [Sizing Limits]({{< ref "sizing.md" >}})
