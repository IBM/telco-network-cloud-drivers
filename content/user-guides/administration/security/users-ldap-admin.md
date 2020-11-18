---
title: Manage Users with LDAP Admin
weight: 40
---

The following guide is an extension of [User Configuration with OpenLDAP](/user-guides/administration/security/manage-users) with more detailed instructions for using [LDAP Admin client](http://www.ldapadmin.org/index.html). This guide is tested with version 1.8.3 of the client.

# Pre-requisites

To complete this guide you will need:

- An existing installation of the Telco Network Cloud Orchestration (TNCO)
- OpenLDAP accessible to your client
- [LDAP Admin Client](http://www.ldapadmin.org/download/ldapadmin.html) installed on your environment

# Connecting to OpenLDAP

1. To get LDAP connection details follow [this guide](/user-guides/administration/security/manage-users/#connecting-to-openldap).
2. Open the LDAP Admin window, click Start -> Connect -> New Connection and fill in details collected earlier.
![LDAP Admin - New Connection](/images/user-guides/administration/security/ldap-admin-new-connection.png "LDAP Admin - Example of new connection")
3. Click "Test Connection" to make sure it is working before confirming with "OK".
4. An LDAP server that is configured for TNCO will have a layout of organization units `groups` and `people` on the left-hand panel.
![LDAP Admin - Organization Units](/images/user-guides/administration/security/ldap-admin-units.png "LDAP Admin - Example of organization units")


# Adding new user with access to TNCO
## To add a new user
1. Right click on `ou=people` -> New -> Entry 
2. Add the fields `extendedPerson` and `uidObject` in the left-hand column for `Objectclass`
3. The right-hand panel will be filled with a list of attributes for you to fill in, with `cn` `sn` and `uid` being compulsory. It is recommended that the 3 fields should have the same value - the username of your new user.
4. For userPassword, you need to convert plain-text passwords to BCrypt. Use [bcrypt-cli](https://github.com/bitnami/bcrypt-cli) or [browser-based generator](https://www.browserling.com/tools/bcrypt). Check that password hashes have the `$2a` prefix.
5. Choose `uid=...` in field `Rdn:` in the upper left-hand corner then click the "Save and exit" icon.
![LDAP Admin - New User](/images/user-guides/administration/security/ldap-admin-new-user.png "LDAP Admin - Example of adding new user")

## To grant access to a new user
1. Read about [default groups](/reference/security/default-security-users#default-groups) and decide the group to which you want to add your user.
2. After adding a new user, return to the LDAP Admin main panel and right click on wanted group e.g `cn=Portal` -> Edit Entry.
3. Add a new row, choose `member` as attribute and add as value `uid=<created-user-uid>,ou=people,dc=lm,dc=com`.
4. Save and exit
![LDAP Admin - User to Group](/images/user-guides/administration/security/ldap-admin-user-to-group.png "LDAP Admin - Example of adding new user to group")

## Test access with TNCO
1. Go to the [TNCO UI](/installation/lm/production/install-lm#accessing-services) and log in with created username and password.
2. Verify that your new user has correct access according to their roles.
