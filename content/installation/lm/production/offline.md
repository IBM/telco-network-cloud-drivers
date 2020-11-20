---
title: Offline
weight: 20
---

The following guide explains how to pre-prepare the artifacts required by Telco Network Cloud Orchestration (TNC-O) during installation so you may complete installation at a later date without internet access.

# Preparing Offline Install

## Helm Charts

The Helm charts should have already been gathered and copied onto the installation machine.

## Docker Images

1. Create a workspace

```
mkdir lm-docker-images
```

2. Identifying Images

Below is a full list of the docker images used by the sub-charts in v2.0.3 of all the TNC-O helm charts:

```
# Docker Registry
docker pull registry:2.6.2
docker pull cassandra:3
docker pull openjdk:8u181-jre
docker pull quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.20.0
docker pull docker.elastic.co/beats/filebeat-oss:6.4.0
docker pull confluentinc/cp-kafka:4.1.1-2
docker pull osixia/openldap:1.2.1
docker pull vault:0.10.1
docker pull docker.elastic.co/elasticsearch/elasticsearch-oss:6.1.1
docker pull gcr.io/google_samples/k8szk:v3
docker pull k8s.gcr.io/defaultbackend:1.4
docker pull lwolf/kubectl_deployer:0.4
docker pull frapsoft/openssl:latest
```

The following are included in the Helm charts but are for disabled features, so are only required if you intend to enable additional elements of the charts (at your discretion).

```
# Jenkins - optional
docker pull confluentinc/cp-ksql-server:

```

This list was obtained by:

- extracting the Helm chart to access the sub-charts: `tar -xvzf <your-helm-chart>`
- using `helm inspect values` on each sub-chart found in extracted `cicdhub/charts` (be sure to extract each chart and check for sub-charts)
- looking for any docker image related settings such as `image` or `imageName`

These commands should be executed for these 3 Helm charts:
- **helm-foundation** Helm chart
- **lm-configurator** Helm chart
- **lm-helm** - Helm chart

3. Pull Images

Pull each image, identified above, with docker:

```
docker pull <image>
```

4. Build the TNC-O Images

You will need to build the TNC-O images offline. This should already have been covered in [Getting Started]({{< ref "production-start#build-docker-images" >}})

For each image that was built, it will be necessary to pull it, e.g.

```
docker pull nimrod:2.0.3-307
docker pull apollo:2.0.3-294
docker pull watchtower:2.0.3-283
docker pull galileo:2.0.3-299
docker pull ishtar:2.0.3-290
docker pull talledega:2.0.3-82
docker pull lm-configurator:2.0.3-50
docker pull doki:2.0.3-87
docker pull relay:2.0.3-284
docker pull daytona:2.0.3-309
docker pull conductor:2.0.3-284
```

5. Save Images

Save each image into a tarball with docker:

```
docker save <image> -o lm-docker-images/<image>.tar
```

6. Build single archive

Create a single archive of your `lm-docker-images` directory:

```
tar -cvzf lm-2.0.3.tgz lm-docker-images/
```

This single archive can now be transferred to the target install environment to complete an offline installation.

# Performing Offline Install

## Helm Charts

Copy the previously downloaded TNC-O Helm charts to the machine you intend to run the installation from.

## Docker Images

1. Transfer single archive to target

Copy the archive to the machine you intend to install TNC-O on

2. Extract Archive

Extract the archive to access the images inside:

```
tar -xvzf lm-2.0.3.tgz
```

3. Load Images

Load each image tarball with docker:

```
docker load <image> -i lm-docker-images/<image>.tar
```

The images are now available on the local docker system. As each service is installed, it will search the local system and find the image it needs, therefore it will not attempt to pull externally.

# Next Steps

Continue with the configuration of [Access Configuration]({{< ref "configuration/access-config" >}})
