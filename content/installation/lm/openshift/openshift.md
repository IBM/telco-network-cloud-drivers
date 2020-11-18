---
title: OpenShift Origin
weight: 10
---

This section details how to set up a local OpenShift Origin (community distribution of OpenShift) all-in-one cluster and configure that cluster for installing Telco Network Cloud Orchestration (TNCO).

# Pre-requisites
- Previous knowledge of [basic installation process with LM Helm charts](../../production/production-start).
- Linux machine (or Linux VM running on another platform) to install OpenShift cluster.

# OpenShift all-in-one set-up
This guide follows [OpenShift Origin (version 3.11) documentation](https://github.com/openshift/origin/blob/v4.0.0-alpha.0/docs/cluster_up_down.md).

## Docker
- Install [Docker](https://docs.docker.com/install/) (version 1.13 or later) onto your Linux machine.
- Configure the Docker daemon with an insecure registry parameter of `172.30.0.0/16`. Also include the Docker registry from which you will get your LM Docker images  (read more about registry of your Docker images [here](../../production/production-start/#push-to-docker-registry)). Edit file `/etc/docker/daemon.json`:

```json
{
  "insecure-registries": [
    "172.30.0.0/16",
    "myregistry:5000"
  ]
}
```

- Restart the Docker daemon:
```
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Firewall
Ensure that your firewall allows access to the OpenShift master API (8443/tcp) and DNS (53/udp) endpoints. In RHEL and Fedora, you can create a new [firewalld](https://firewalld.org/documentation/man-pages/firewalld.zones.html) zone to enable this access:

- Find Docker bridge network container subnet - you should get a value like `172.17.0.0/16`
```
docker network inspect -f "{{range .IPAM.Config }}{{ .Subnet }}{{end}}" bridge
```
- Create a new firewalld zone for the subnet and grant it access to the correct ports:
```
firewall-cmd --permanent --new-zone dockerc
firewall-cmd --permanent --zone dockerc --add-source 172.17.0.0/16
firewall-cmd --permanent --zone dockerc --add-port 8443/tcp
firewall-cmd --permanent --zone dockerc --add-port 53/udp
firewall-cmd --permanent --zone dockerc --add-port 8053/udp
firewall-cmd --reload
```

## OpenShift Client Tool
- Download the `oc` binary from [OpenShift Origin Releases page](https://github.com/openshift/origin/releases) to your machine. For this set-up we would be using [client tool version 3.11](https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz).
- Place the binary in your path.

## Start an OpenShift cluster
Run the following as a user that has permission to run Docker commands:
```
oc cluster up
```


# Configuration
After your OpenShift cluster has been up, log in as system admin to perform further configuration steps:
```
oc login -u system:admin
```

## Helm
TNCO will be installed using Helm charts, so you would need Helm client and server:

- Go into the project (similar to Kubernetes namespace) meant for Tiller:
```
oc project kube-system
```
- Run the following command (replace with desired Helm version and Tiller namespace):
```
oc process -f https://github.com/openshift/origin/raw/master/examples/helm/tiller-template.yaml -p TILLER_NAMESPACE=kube-system -p HELM_VERSION=v2.14.3 | oc create -f -
```
- Check that Tiller pod is running by command `oc get po`.
- Grant admin cluster role to Helm
```
oc adm policy add-cluster-role-to-user cluster-admin system:serviceaccount:kube-system:tiller
```
- Check that Tiller role is correct by command `helm ls`. There should be an empty output.

## Security policies for LM's Foundation chart
These configuration steps only apply to Telco Network Cloud Orchestration (TNCO) `helm-foundation` chart (version 2.1 GA).

- Grant all authenticated users access to the `anyuid` security context constraint (SCC):
```
oc adm policy add-scc-to-group anyuid system:authenticated
```
- Go to the project (namespace) that you plan to install LM Helm charts in:
```
oc project myproject
```
- Assign `privileged` SCC to specific foundation service accounts (replace `myproject` with your project):
```
oc adm policy add-scc-to-user privileged system:serviceaccount:myproject:default
oc adm policy add-scc-to-user privileged system:serviceaccount:myproject:foundation
oc adm policy add-scc-to-user privileged system:serviceaccount:myproject:foundation-nginx-ingress
oc adm policy add-scc-to-user privileged system:serviceaccount:myproject:foundation-elasticsearch-client
oc adm policy add-scc-to-user privileged system:serviceaccount:myproject:foundation-elasticsearch-data
oc adm policy add-scc-to-user privileged system:serviceaccount:myproject:foundation-elasticsearch-master
```

## Local HostPath storage
OpenShift supports many [Persistent Volume Types](https://docs.openshift.com/container-platform/3.11/architecture/additional_concepts/storage.html#types-of-persistent-volumes) but in this case we'll be looking at `hostPath` Persistent Volumes created by helm-foundation. Read more about LM storage set-up [here](../../production/storage) and `helm inspect` command on your helm-foundation chart.
Default path on the host will be determined by the location from which you run the `oc cluster up` command, most likely `$HOME/openshift.local.clusterup/openshift.local.pv/`.

- Create a sub-directory for LM volumes:
```
sudo mkdir -p $HOME/openshift.local.clusterup/openshift.local.pv/lm
sudo chmod -R 666 $HOME/openshift.local.clusterup/openshift.local.pv/lm
```
- Setup required local directories under `$HOME/openshift.local.clusterup/openshift.local.pv/lm`
- Put the full path in the values file intended for `helm-foundation` chart:

```yaml
volumesInit:
  enabled: true
  hostPath: /home/<your-user>/openshift.local.clusterup/openshift.local.pv/lm
```


# Notes and next steps
- The OpenShift cluster is now ready for installing LM Helm charts. Start your installation by reviewing the [Getting Started guide](../../production/production-start).
- Since this OpenShift cluster is a single-node set-up for development purposes, it is not suitable for production deployment of LM. Choose `minimal` flavour in [the sizing section](../../production/sizing)
- Remember to run `helm install` with `--namespace` option pointing to the project that you configured earlier.