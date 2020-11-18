---
title: Manage Roles
weight: 20
---

# Pre-requisites

To complete this guide you will need:

- An existing installation of the Telco Network Cloud Orchestration (TNCO)
- An understanding of how to [configure LM using the Vault UI](/user-guides/administration/configuration/configuring-lm)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) client with access to the Kubernetes cluster LM is installed on

# Find Role Configuration

1. Login to the Vault UI for your LM system and navigate to the secrets engine named `lm`

2. Navigate to the secret named `ishtar`

3. Find the existing roles configuration in the JSON at:
    
    ```
    alm:
      roles:
        ...
    ```

# Add a role

Add a role by adding a new entry under the `roles` key:
  
```
alm:
  roles:
    MyNewRole:
      ldapGroups:
      - MyRole
      privileges:
        NsinstsMgt: read,write
```

- MyNewRole - the unique name for this role
- ldapGroups - the LDAP group a user should be assigned in order to acquire this role
- privileges - the privileges given to any user assigned this role and the granted actions (`execute`, `write`, `read`).

You must restart the `ishtar` service for the changes to take affect. 

For a list of available privileges, see [Available Privileges](/reference/security/default-security-users#available-privileges)


