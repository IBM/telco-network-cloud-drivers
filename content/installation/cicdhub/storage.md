---
title: Storage
weight: 30
---

# Storage Class

By default, any service requiring persistence is configured to use the default provisioner of your Kubernetes cluster. You can check your default with `kubectl`:

```
kubectl get storageclass
```

The default storage class will be shown with `(default)` alongside it's name. If you have no default, you can mark an existing class as the default with:

```
kubectl patch storageclass <your-class-name> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

Alternatively, you may explicitly set the storage class for each service by adding `storageClass` fields in your `custom values`:

```
dockerregistry:
  persistence:
    storageClass: <override-class-name>

gogs:
  persistence:
    storageClass: <override-class-name>
  postgresql:
    persistence:
      storageClass: <override-class-name>

jenkins:
  persistence:
    storageClass: <override-class-name>

openldap:
  persistence:
    storageClass: <override-class-name>

nexus:
  persistence:
    storageClass: <override-class-name>
```

# Storage Size

The size of persistent volume created for each service may be configured by adding resource size settings to the `custom values` file. See [Kubernetes - Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistent-volumes) for more information about how the size of a volume is managed.

The default values for each service are shown below. Override any defaults by adding them to your `custom values`.

```
dockerregistry:
  persistence:
    size: 100Gi

gogs:
  persistence:
    size: 1Gi
  postgresql:
    persistence:
      size: 5Gi

jenkins:
  persistence:
    size: 1Gi

openldap:
  persistence:
    size: 5Gi

nexus:
  persistence:
    storageSize: 100Gi
```

# Next Steps

Continue configuring your installation with [Access Configuration]({{< ref "access-config.md" >}})
