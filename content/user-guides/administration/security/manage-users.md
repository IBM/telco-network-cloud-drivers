---
title: Manage Users and Groups
weight: 30
---

The following guide details how to configure users in the default OpenLDAP installed as part of Telco Network Cloud Orchestration (TNCO). 

TNCO provides no built-in mechanism for managing users. There are many available LDAP clients which can be used for such purposes which makes the management much easier and a lot more visual.

If your environment is connecting to an LDAP managed outside of TNCO, then the system administrator is expected to already understand the connection and user model in use.

If your LDAP server is installed along with LM helm-foundation and you are a first-time user of any LDAP Client, skip to our example [instructions for LDAP Admin](/user-guides/administration/security/users-ldap-admin).

# Pre-requisites

To complete this guide you will need:

- An existing installation of TNCO
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) configured with access to your Kubernetes cluster

# Connecting to OpenLDAP

## Identify NodePort

As part of the helm-foundation install, OpenLDAP should have been installed and should be exposed externally via a NodePort. This NodePort is randomly assigned so it will need to be discovered from the installation environment. The following command should reveal this:
 
```
kubectl get service foundation-openldap | awk '{print $5}' | grep TCP | cut -d ':' -f 2 | cut -d'/'  -f 1
```
 
##  Connect with LDAP client

Having established the port, it should be possible to connect to the environment using the IP address or hostname and this port with your chosen LDAP Client.  

Assuming the default installation values were used, the connection details will be as follows:

| Username | Password                          |
| -------- | --------------------------------- |
| URL      | `ldap://<kubernetes-host>:<port>` |
| Base     | `dc=lm,dc=com`                    |
| Username | `cn=admin,dc=lm,dc=com`           |
| Password | `lmadmin`                         |

# Add a user

Create a new entry for a user in OpenLDAP with the `person` and `uidObject` classes. The entry should have the following properties set:

```
dn: uid=<username>,ou=people,dc=<domain>
objectClass: person
objectClass: uidObject
cn: <username>
sn: <username>
uid: <username>
userPassword: <password>
```

`dn` is the directory path in OpenLDAP this user should be created in. Replace `<username>` with a username of your choice and replace the `<domain>` with the domain set at installation (the default is: `lm.com` which results in `dc=lm,dc=com`)

Below is an example for adding a new user named `TestUser` and password of `secret` (note the password will be encrypted on write by OpenLDAP):

```
dn: uid=TestUser,ou=people,dc=lm,dc=com
objectClass: person
objectClass: uidObject
cn: TestUser
sn: TestUser
uid: TestUser
userPassword: secret
```

# Add a group

Create a new entry for a group in OpenLDAP with the existing `groupOfNames`. The entry should have the following properties set:

```
dn: cn=<group-name>,ou=groups,dc=<domain>
objectclass: groupOfNames
cn: <group-name>
```

`dn` is the directory path in OpenLDAP this group should be created in. Replace `<group-name>` with a name of your choice (this will be needed when managing roles). Replace the `<domain>` with the domain set at installation (the default is: `lm.com` which results in `dc=lm,dc=com`)

Below is an example for adding a new group named `TestGroup`:

```
dn: cn=TestGroup,ou=groups,dc=lm,dc=com
objectclass: groupOfNames
cn: TestGroup
```

# Add user to group

In order to assign a user with roles, the user must be made a member of an appropriate LDAP group. If the LDAP group doesn't already exist, then it should be created. If it does exist, the user should be added as a group member to grant them the role.

The `member` list of a group should contain the users who are part of it. To add a member to a group, add the full identifier of the user entry to the `member` list:

```
dn: cn=<group-name>,ou=groups,dc=<domain>
objectclass: groupOfNames
cn: <group-name>
member: <member1-id>
member: <member2-id>
...
```

Below is an example a group named `TestGroup` with 2 members; TestUserA and TestUserB:

```
dn: cn=TestGroup,ou=groups,dc=lm,dc=com
objectclass: groupOfNames
cn: TestGroup
member: uid=TestUserA,ou=people,dc=lm,dc=com
member: uid=TestUserB,ou=people,dc=lm,dc=com
```

{{%note %}}
NOTE: a user can be a member of multiple groups.
{{%/note %}}

# Revoke user access

An existing user may be suspended in order to disable their access. Suspension can be performed by making a user a members of a group called Suspended:

```
dn: cn=Suspended,ou=groups,dc=lm,dc=com
objectclass: groupOfNames
cn: Suspended
member: uid=TestUserA,ou=people,dc=lm,dc=com
```

This avoids having to make permanent changes to the LDAP configuration (e.g. removing them from group membership). To restore access for this user, simply remove them from this group.

{{%note %}}
NOTE: a logged in user with suspended access will be able to perform operations until any existing access token expires. If using the default expiry time, this could be up to 20 minutes.
{{%/note %}}
