---
title: Getting Started
weight: 10
---

This section details how to install Telco Network Cloud Orchestration (TNC-O) using Helm on an existing Kubernetes cluster. This will install the following Helm charts:

- helm-foundation - reference Helm Chart for deploying the third-party components required by TNC-O.
- lm-configurator - Helm Chart executing a Kubernetes job to create relevant schemas and other configuration required by TNC-O.
- lm-helm - Helm Chart for deploying the TNC-O Microservices

{{%note %}}
NOTE: If following the IBM Installation Guide, please skip the preparation of the environment and proceed to "Next Steps"
{{%/note %}}

# Pre-requisites

## Kubernetes

A Kubernetes cluster is required to install TNC-O. This environment must be configured with:

- a [Storage Class](https://kubernetes.io/docs/concepts/storage/storage-classes/) to provision persistent volumes in your cluster
- a [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) to install into (you may use the `default`)

In addition, you will need the following client tools, pre-configured with access to your Kubernetes environment:

- [Helm](https://helm.sh/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

The nodes in your cluster should have synchronized clocks. To synchronize your clocks, you can use network time protocol (NTP). For more information about setting up NTP, see the user documentation for your operating system.

### ICP

If installing on ICP we recommend you read through our [ICP Pre-Install Considerations](/reference/icp-pre-install) before continuing.

## TNC-O Artifacts

You should already have the lifecycle Manager package which contains the Helm charts and binaries required for the installation of TNC-O. This should contain:

- **lm-helm-charts** - the Helm charts that will install TNC-O
- **lm-docker-source** - the binaries requires to build the TNC-O Docker images

# Configuration

TNC-O is configured through [Helm chart values](https://helm.sh/docs/using_helm/#using-helm).

You may check the default configuration values of the chart using `helm inspect`:

```
helm inspect values <lm-helm-chart>
```

## Configuration Steps

The configuration steps further in this guide will take you through the default configuration of the chart. They will also explain how to override them (at your discretion), using a `custom values file`. This file is a custom YAML formatted file, which you must create when changing values, so it can later be passed during installation.

Create the custom file:

```
touch custom-values.yaml
```

Any future references to the `custom values` should be understood to mean this file.

Before making any configuration changes, it is necessary to make the docker images available.

# Build Docker Images

Before you can install TNC-O you will need to build the Docker images for all its components.

The `lm-docker-source` distribution includes the sources necessary to build docker images for the TNC-O applications.

## Pre-requisites

Before proceeding with the installation you will need:

* [Docker](https://docs.docker.com/install/)
* [Docker Compose](https://docs.docker.com/compose/)

## Build Docker Images

If the TNC-O Docker images already exist in a registry, skip to [Using a Docker Registry](#using-a-docker-registry)

From a shell, navigate to the root of the `lm-docker-source` and use `docker-compose` to build the images from the `docker-compose.yml` file included in the distribution:

```
docker-compose build
```

Once completed the images will be available on the local docker machine:

```
docker images
```
```
apollo                          ${apollo.version}            1f22cdeeb226        1 hour ago         374MB
conductor                       ${conductor.version}         a0c5615baa5b        1 hour ago         450MB
daytona                         ${daytona.version}           18d1ab71943b        1 hour ago         387MB
galileo                         ${galileo.version}           cc175dfc2324        1 hour ago         461MB
ishtar                          ${ishtar.version}            023896abd74e        1 hour ago         374MB
nimrod                          ${nimrod.version}            facf6ac62932        1 hour ago         379MB
relay                           ${relay.version}             50e381fc1f84        1 hour ago         369MB
talledega                       ${talledega.version}         8aeb064b3a29        1 hour ago         432MB
watchtower                      ${watchtower.version}        7268ba88d14b        1 hour ago         383MB
lm-configurator                 ${lm-configurator.version}   0434602b9bfc        1 hour ago         683MB
```

## Push to Docker Registry

It is recommended to push the Docker images to a Docker Registry, making them available to pull from any node in your cluster. You can skip the Docker Registry steps if running a single node cluster on which the images were built.

To push the images, first open the `docker-compose.yml` file for editing. Update the `image` value, for each service under `services`, with the host and port of your Docker Registry:

```
...
services:
  apollo:
    image: myregistry:5000/apollo:${apollo.version}
...
```

### Insecure Registry

If your Docker Registry is unsecured you need to ensure it is included in as an insecure registry in your `/etc/docker/daemon.json'`:

```
{
  "insecure-registries": ["myregistry:5000"]
}
```

Now build and push the images with docker-compose:

```
docker-compose build

docker-compose push
```

## Using a Docker Registry

Once docker images exist in the Docker Registry, you will be able to configure the helm charts to pull the images from it when installing TNC-O with `lm-helm-charts`. 

If you skipped the build steps above and are hosting an insecure registry, see [Insecure Registry](#insecure-registry)

To allow Helm to pull images from your registry, it is necessary to add the following to your custom Helm values file, modifying as necessary:

```yaml
global:
  docker:
    registryEnabled: true
    imagePullPolicy: IfNotPresent
    registryIp: "myregistry"
    registryPort: 5000

```


For ICP installations you will have generated an imagePullSecret for the namespace into which lm-configurator is being installed, it will need to be added to your custom Helm values file:

```yaml
imagePullSecrets:
- <your imagePullSecret name>
```
For information on creating an imagePullSecret, see the ICP documentation [here](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_3.1.2/manage_images/imagepullsecret.html)

# Offline Install

If you need to install TNC-O in an environment without internet access, please read through the [Offline Install Instructions]({{< ref "offline" >}}) to pre-pull additional artifacts required during the install.


# Next Steps

Start configuring your installation by reviewing the [Access Configuration]({{< ref "configuration/access-config" >}})
