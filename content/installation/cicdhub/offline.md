---
title: Offline
weight: 15
---

The following guide explains how to pre-prepare the artifacts required by the CI/CD Hub during installation so you may complete installation at a later date without internet access.

# Preparing Offline Install

## Helm Charts

Pre-download the CI/CD Hub Helm chart from the [releases](https://github.com/accanto-systems/lm-cicdhub/releases) page on GitHub.

## Docker Images

### Create a workspace

```
mkdir cicdhub-docker-images
```

### Identify requires images

Below is a full list of the docker images used by the sub-charts in v2.0.5 of the CI/CD Hub helm chart:

```
# Gogs
docker pull gogs/gogs:0.11.79
docker pull postgres:9.6.2

# Jenkins
docker pull jenkins/jenkins:2.182
docker pull jenkins/jnlp-slave:3.27-1

# Openldap
docker pull osixia/openldap:1.2.1

# Nginx Ingress
docker pull quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.20.0
docker pull k8s.gcr.io/defaultbackend:1.4

# Nexus
docker pull quay.io/travelaudience/docker-nexus:3.15.2
```

The following are included in the Helm charts but are for disabled features, so are only required if you intend to enable additional elements of the charts (at your discretion).

```
# Jenkins - optional
docker pull nuvo/kube-tasks:0.1.2
docker pull shadwell/k8s-sidecar:0.0.2
docker pull alpine:3.7

# Gogs - optional
docker pull wrouesnel/postgres_exporter:v0.1.1

# Nexus - optional
docker pull quay.io/travelaudience/docker-nexus-backup:1.4.0
docker pull quay.io/travelaudience/docker-nexus-proxy:2.4.0_8u191
```

This list was obtained by:

- extracting the CI/CD Hub Helm chart to access the sub-charts: `tar -xvzf <your-cicdhub-chart>`
- using `helm inspect values` on each sub-chart found in extracted `cicdhub/charts` (be sure to extract each chart and check for sub-charts)
- looking for any docker image related settings such as `image` or `imageName`

### Pull Images

Pull each image, identified above, with docker:

```
docker pull <image>
```

### Pull LMCTL Jnlp Image

You will also need to pull the LMCTL JNLP slave docker image. Select the version from [Docker Hub](https://hub.docker.com/r/accanto/lmctl-jnlp-slave) and pull the image:

```
docker pull accanto/lmctl-jnlp-slave:2.0.6
```

### Save Images

Save each image into a tarball with docker:

```
docker save <image> -o cicdhub-docker-images/<image>.tar
```

Full list of images pulled in previous steps for convenience:

```
# Gogs
docker save gogs/gogs:0.11.79 -o cicdhub-docker-images/gogs-0.11.79.tar
docker save postgres:9.6.2 -o cicdhub-docker-images/postgres-9.6.2.tar

# Jenkins
docker save jenkins/jenkins:2.182 -o cicdhub-docker-images/jenkins-2.182.tar
docker save jenkins/jnlp-slave:3.27-1 -o cicdhub-docker-images/jnlp-slave-3.27-1.tar

# Openldap
docker save osixia/openldap:1.2.1 -o cicdhub-docker-images/openldap-1.2.1.tar

# Nginx Ingress
docker save quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.20.0 -o cicdhub-docker-images/nginx-ingress-controller-0.20.0.tar
docker save k8s.gcr.io/defaultbackend:1.4 -o cicdhub-docker-images/defaultbackend-1.4.tar

# Nexus
docker save quay.io/travelaudience/docker-nexus:3.15.2 -o cicdhub-docker-images/docker-nexus-3.15.2.tar

# Lmctl
docker save accanto/lmctl-jnlp-slave:2.0.6 -o cicdhub-docker-images/lmctl-jnlp-slave-2.0.6.tar

# Jenkins - optional
docker save nuvo/kube-tasks:0.1.2 -o cicdhub-docker-images/kube-tasks-0.1.2.tar
docker save shadwell/k8s-sidecar:0.0.2 -o cicdhub-docker-images/k8s-sidecar-0.0.2.tar
docker save alpine:3.7 -o cicdhub-docker-images/alpine-3.7.tar

# Gogs - optional
docker save wrouesnel/postgres_exporter:v0.1.1 -o cicdhub-docker-images/postgres_exporter-v0.1.1.tar

# Nexus - optional
docker save quay.io/travelaudience/docker-nexus-backup:1.4.0 -o cicdhub-docker-images/docker-nexus-backup-1.4.0.tar
docker save quay.io/travelaudience/docker-nexus-proxy:2.4.0_8u191 -o cicdhub-docker-images/docker-nexus-proxy-2.4.0_8u191.tar
```

### Build a single archive

Create a single archive of your `cicdhub-docker-images` directory:

```
tar -cvzf cicdhub-docker-images.tgz cicdhub-docker-images/
```

This single archive can now be transferred to the target install environment to complete an offline installation.

# Performing Offline Install

## Helm Charts

Copy the previously downloaded CI/CD Hub Helm chart to the machine you intend to run the installation from.

## Docker Images

### Transfer Archive

Copy the archive to the machine you intend to install the CI/CD Hub on

### Extract Archive

Extract the archive to access the images inside:

```
tar -xvzf cicdhub-docker-images.tgz
```

### Load Images

Load each image tarball with docker:

```
docker load <image> -i cicdhub-docker-images/<image>.tar
```

Full list of images pulled in previous steps for convenience:

```
# Gogs
docker load -i cicdhub-docker-images/gogs-0.11.79.tar
docker load -i cicdhub-docker-images/postgres-9.6.2.tar

# Jenkins
docker load -i cicdhub-docker-images/jenkins-2.182.tar
docker load -i cicdhub-docker-images/jnlp-slave-3.27-1.tar

# Openldap
docker load -i cicdhub-docker-images/openldap-1.2.1.tar

# Nginx Ingress
docker load -i cicdhub-docker-images/nginx-ingress-controller-0.20.0.tar
docker load -i cicdhub-docker-images/defaultbackend-1.4.tar

# Nexus
docker load -i cicdhub-docker-images/docker-nexus-3.15.2.tar

# Lmctl
docker load -i cicdhub-docker-images/lmctl-jnlp-slave-2.0.6.tar

# Jenkins - optional
docker load -i cicdhub-docker-images/kube-tasks-0.1.2.tar
docker load -i cicdhub-docker-images/k8s-sidecar-0.0.2.tar
docker load -i cicdhub-docker-images/alpine-3.7.tar

# Gogs - optional
docker load -i cicdhub-docker-images/postgres_exporter-v0.1.1.tar

# Nexus - optional
docker load -i cicdhub-docker-images/docker-nexus-backup-1.4.0.tar
docker load -i cicdhub-docker-images/docker-nexus-proxy-2.4.0_8u191.tar
```

The images are now available on the local docker system. As each service is installed, it will search the local system and find the image it needs, therefore it will not attempt to pull externally.

## Prepare Jenkins installation
Open-source Jenkins chart used for CI/CD Hub would require access to the Internet for pulling Docker image and pre-installing plugins.

To move forward with offline Jenkins, the following needs to be added to values file for `helm install` command:
```
jenkins:
  master:
    imagePullPolicy: IfNotPresent
    installPlugins: []
```
Be careful not to override your existing values for `jenkins:` in this file.

Next, download from https://updates.jenkins.io/download/plugins/ the following plugins in `.hpi` format
```
  - kubernetes:1.18.2
  - workflow-job:2.33
  - workflow-aggregator:2.6
  - credentials-binding:1.19
  - git:3.11.0
  - gogs-webhook:1.0.15
```
After your `helm install` command goes through (next steps) and Jenkins pod is running with accessible GUI, transfer the `.hpi` files to your offline machine and upload the plugins manually into Jenkins `Manage Jenkins -> Manage Plugins -> Advanced`:
![Uploading plugins to Jenkins](/images/user-guides/cicd/offline-installation/Jenkins-upload-plugins.png "Uploading plugins to Jenkins")

# Next Steps

Continue with the [installation of the CI/CD Hub]({{< ref "cicd-hub-start.md" >}})
