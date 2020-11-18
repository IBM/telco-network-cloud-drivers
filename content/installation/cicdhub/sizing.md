---
title: Sizing
weight: 21
---

# CPU and Memory

The CPU and memory limits of each service may be configured by adding resource requests and limit values to the `custom values` file. See [Kubernetes - Manage Compute Resources Container](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/) for more information.

The default values for each service are shown below. Override any defaults by adding them to your `custom values`. Blank fields represent deployments without a default value, which will result in no limits being imposed on their usage.

```
dockerregistry:
  resources:
    limits:
      cpu:
      memory:
    requests:
      cpu:
      memory:

gogs:
  resources:
    requests:
        cpu:
        memory:
    limits:
        cpu:
        memory:
  postgresql:
    resources:
      requests:
        cpu: 100m
        memory: 256Mi
      limits:
        cpu:
        memory:  

jenkins:
  master:
    resources:
      requests:
        cpu:
        memory:
      limits:
        cpu:
        memory:

nginx-ingress:
  controller:
    resources:
      requests:
        cpu:
        memory:
      limits:
        cpu:
        memory:
    

nexus:
  resources:
    requests:
      cpu:
      memory:
    limits:
      cpu:
      memory:


openldap:
  resources:
    requests:
      cpu:
      memory:
    limits:
      cpu:
      memory:
```

# Next Steps

Continue configuring your installation with [Storage]({{< ref "storage.md" >}})
