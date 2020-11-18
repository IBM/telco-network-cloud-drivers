---
title: Security
weight: 60
---

# Access Credentials

Many of the CI/CD Hub services have default usernames and passwords that may only be changed after installation. However, a few allow a value to be provided through the `custom values`.

The default values for each service are shown below. Override any defaults by adding them to your `custom values`.

```
global:
  ## Note that the Openldap password is set through a global variable
  ldap:
    managerPassword: admin
    domain: lm.com

gogs:
  postgresql:
    postgresUser: admin
    postgresPassword: admin

jenkins:
  master:
    adminUser: admin
    adminPassword: admin
```

Default credentials for any service not shown here will be detailed later in the installation.

# Next Steps

You may now complete your [installation of the CI/CD Hub]({{< ref "install-cicdhub.md" >}})
