---
title: Access Configuration
weight: 50
---

# Hostnames and Ports

The Ansible RM is configured to allow access through NodePorts. The default values for the HTTP and HTTPS ports are shown below. Override any defaults by adding them to your `custom values`.

```
service:
  nodePort: 31080
  sslNodePort: 31081
```

# Next Steps

You may now complete your [installation of the Ansible RM](/installation/resource-manager/ansible-rm/install-ansible-rm)

