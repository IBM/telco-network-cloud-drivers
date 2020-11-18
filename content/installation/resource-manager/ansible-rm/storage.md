---
title: Storage
weight: 31
---

# Existing Storage Services

Ansible RM requires a connection to Cassandra and Kafka. By default the Helm chart is configured to locate existing persisted services using labels:

- Cassandra - expects a Cassandra service in the same namespace with labels `app=cassandra` and `release=foundation`
- Kafka - expects a Kafka service in the same namespace with labels `app=kafka` and `release=foundation`

Check your existing Cassandra and Kafka have the given labels. If you did not install foundation services from Agile Lifecycle Manager (ALM) with the Helm release name of `foundation`, then the `release` label may have an alternative value. If this is the case, update the labels by adding the following to your `custom values`:

```
app:
  config:
    kafka:
      existingSelectors:
        app: kafka
        release: foundation

    cassandra
      existingSelectors:
        app: cassandra
        release: foundation
```

# Next Steps

Continue configuring your installation with [Access Configuration](/installation/resource-manager/ansible-rm/access-config)
