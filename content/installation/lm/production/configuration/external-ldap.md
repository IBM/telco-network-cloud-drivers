---
title: External LDAP
weight: 70
---

Telco Network Cloud Orchestration (TNCO) makes use of LDAP as its user store for secure access. It is configured by default to connect to the OpenLDAP service which is part of installation. Is is possible to disable this installation of this OpenLDAP service, and to connect to an external LDAP implementation. This includes support for Active Directory.

# Configuring an External LDAP Server

To use an LDAP Server other than the pre-configured OpenLDAP instance which comes as part of the TNCO installation, follow these steps.

## Disable Installation and Set Up of OpenLDAP

To disable the installation and set up of OpenLDAP when using an existing LDAP, add the following to the custom Helm values file:

```yaml
openldap:
  enabled: false
configurator:
  security:
    ldap:
      enabled: false
```

## Modify LDAP connection configuration

TNCO comes with configuration based on the directory structure which exists in the pre-configured install of OpenLDAP.

When using an existing LDAP server which uses a different directory structure, the LDAP directory queries can be configured as per the example below. 

For a full range of configuration options for external LDAP sources, including how to use LDAP Bind mechanisms and Active Directory, see [Configuring External LDAP Connections]({{< ref "configuring-external-ldap" >}}).

In the following example, TNCO is configured to point to an external LDAP source by changing the configuration within Ishtar. This configuration is imported into Vault to be made available to Ishtar by adding the following to the custom Helm values file during installation:

```yaml
configurator:
  lmConfigImport:
    ishtar:
      alm:
        ishtar:
          security:
            ldap:
              url: ldap://openldap:389
              base: dc=lm,dc=com
              managerDn: cn=admin,dc=lm,dc=com
              managerPassword: lmadmin
              userSearchBase: ou=people
              userSearchFilter: (&(uid={0})(!(isSuspended=true)))
              groupSearchBase: ou=groups
              groupSearchFilter: member={0}
              passwordAttribute: userPassword
              passwordEncoding: BCRYPT 
```


The purpose of each configuration item is as follows:

- `url` - the url of an LDAP server listening with the LDAP protocol
- `base` - the base suffix from which all operations should origin. If set, then this base should not be included in userSearchBase or groupSearchBase.
- `managerDn` - the Username (DN) of the "manager" user identity (i.e. "uid=admin,ou=system") which will be used to authenticate to the LDAP server. If omitted, anonymous access will be used
- `managerPassword` - the password for the manager DN
- `userSearchBase` - the base used during directory searches for a user, i.e. the context name to search in
- `userSearchFilter` - the filter expression used in the user search. This is an LDAP search filter (as defined in 'RFC 2254') with optional arguments
- `groupSearchBase` - the base DN from which the search for group membership should be performed
- `groupSearchFilter` - the pattern to be used for the group members search. {0} is the user's DN
- `passwordAttribute` - the attribute in the directory which contains the user password
- `passwordEncoding` - the encoding on the stored password (only BCRYPT and PLAIN are supported)



# Next Steps

Continue to [Scaling TNCO](/installation/lm/production/configuration/scaling-policy).