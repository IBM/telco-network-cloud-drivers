---
title: Storage
weight: 60
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

Alternatively, you may explicitly set the storage class for each service by adding `storageClass` fields into your custom values file.

```yaml
cassandra: 
  persistence:
    storageClass: 

elasticsearch:
  master:
    persistence:
      storageClass: 
  data:
    persistence:
      storageClass: 

kafka:
  persistence:
    storageClass: 
  zookeeper:
    persistence:
      storageClass: 

openldap:
  persistence:
    storageClass: 
```

Here is an example of storageClass configuration for **Host Path Persistent Volumes**:
```yaml
cassandra:
  persistence:
    storageClass: cassandra-storage
​
elasticsearch:
  master:
    persistence:
      storageClass: esm-storage
  data:
    persistence:
      storageClass: esd-storage
​
kafka:
  persistence:
    storageClass: kafka-storage
  zookeeper:
    persistence:
      storageClass: zookeeper-storage
​
openldap:
  persistence:
    storageClass: openldap-storage
```

# Storage Size

The size of persistent volume created for each service may be configured by adding resource size settings to the `custom values` file. See [Kubernetes - Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistent-volumes) for more information about how the size of a volume is managed.

The default values for each service are shown below. Override any defaults by adding them to your custom values file.

```yaml
cassandra: 
  persistence:
    size: "60Gi"

elasticsearch:
  master:
    persistence:
      size: "20Gi"
  data:
    persistence:
      size: "30Gi"

kafka:
  persistence:
    size: "150Gi"
  zookeeper:
    persistence:
      size: "15Gi"

openldap:
  persistence:
    size: "5Gi"
```

# Next Steps

Continue configuring your installation with [External LDAP]({{< ref "external-ldap" >}})
