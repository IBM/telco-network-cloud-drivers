---
title: Access Configuration
weight: 50
---

# Hostnames and Ports

By default, the CI/CD Hub services are configured for access as described below:

| Service         | Type               | Address                                                               |
| --------------- | ------------------ | --------------------------------------------------------------------- |
| nexus           | NodePort           | `<your-cicdhub-host>:32739`                                           |
| gogs            | NodePort & Ingress | `<your-cicdhub-host>:32734` OR `git.cicdhub:<nginx-ingress-port>`     |
| jenkins         | NodePort & Ingress | `<your-cicdhub-host>:32732` OR `jenkins.cicdhub:<nginx-ingress-port>` |
| openldap        | NodePort           | `<your-cicdhub-host>:32737`, SSL: `https://<your-cicdhub-host>:32738` |
| docker registry | NodePort           | `<your-cicdhub-host>:32736`                                           |
| nginx-ingress   | NodePort           | `<your-cicdhub-host>:32080`, SSL: `https://<your-cicdhub-host>:32443` |

All ports and Ingress hosts listed above are configurable through the Helm chart. Add any of the following to your `custom values` to override them:

```
dockerregistry:
  service:
    nodePort: <override-port>

gogs:
  service:
    httpNodePort: <override-port>
    ingress:
      hosts:
        - <override-hostname>

jenkins:
  master:
    nodePort: <override-port>
    ingress:
      hostName: <override-hostname>

openldap:
  service:
    nodePort: <override-port>
    sslNodePort: <override-port>

nexus:
  nodePort: <override-port>

nginx-ingress:
  controller:
    service:
      nodePorts:
        http: <override-port>
        https: <override-port>
```

# Ingress

An Ingress controller is required to allow HTTP and HTTPS Ingress routes from outside the cluster. See [Kubernetes - Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) for more information.

The `nginx-ingress` controller is included with the CI/CD Hub for convenience. If your Kubernetes cluster has an existing Ingress controller then you can disable nginx with:

```
nginx-ingress:
  enabled: false
```

# Next Steps

Continue configuring your installation with [Security]({{< ref "security.md" >}})
