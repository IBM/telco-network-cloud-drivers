---
title: Configuring External LDAP Connections
weight: 70
---

Agile Lifecycle Manager (ALM) makes use of LDAP as its user store for secure access. It is configured by default to connect to the OpenLDAP service which is part of the installation. It is possible to disable this installation of this OpenLDAP service, and to connect to an external LDAP implementation using different mechanisms including support for Active Directory.

# Configuring an External LDAP Server

To use an LDAP Server other than the pre-configured OpenLDAP instance which comes as part of the LM installation, follow these steps.

## Modify LDAP connection configuration

ALM comes with configuration based on the directory structure which exists in the pre-configured install of OpenLDAP.

When using an existing LDAP server which uses a different directory structure, the LDAP directory queries can be configured as below.

ALM supports 2 distinct LDAP authentication strategies which are as follows:

- `ldapBind` - (default) this mechanism binds to LDAP using manager credentials to initially locate the user's DN record using search filters, then attempting to bind this user with their password once found. This method should be selected in order to authenticate against Active Directory.
- `ldapSimple` - this mechanism binds to LDAP either using manager credentials, or anonymously if this is allowed. Once connected, the user's DN record is located using search filters and a password compare is performed against the password attribute within this record.

Once the most appropriate strategy is selected, follow the relevant configuration section below.

### LDAP Bind (default)

The `ldapBind` authentication strategy is the default during an installation of LM. It can be customised with the following configuration, which can be set in Vault:

```yaml
alm:
  ishtar:
    security:
      authenticationProvider: ldapBind
      ldap:
        url: ldap://ldap-server:389
        base: null        
        managerDn: cn=admin,,dc=lm,dc=com
        managerPassword: adminpassword  
        userSearchBase: ou=people
        userSearchFilter: uid={0}
        groupSearchBase: ou=groups
        groupSearchFilter: member={0}
```

The purpose of each configuration item is as follows:

- `url` - the URL of an LDAP server listening with the LDAP protocol
- `base` - the base suffix from which all operations should origin. If set, then this base should not be included in userSearchBase or groupSearchBase.
- `managerDn` - the Username (DN) of the "manager" user identity (i.e. "uid=admin,ou=system") which will be used to authenticate to the LDAP server. If omitted, anonymous access will be used
- `managerPassword` - the password for the manager DN
- `userSearchBase` - the base used during directory searches for a user, i.e. the context name to search in
- `userSearchFilter` - the filter expression used in the user search. This is an LDAP search filter (as defined in 'RFC 2254') with optional arguments
- `groupSearchBase` - the search string used during directory searches for a group. If this is an empty string the search will be performed from the root DN of the context factory. If null, no search will be performed.
- `groupSearchFilter` - the pattern to be used for the group members search. {0} is the user's DN

### LDAP Simple

The `ldapSimple` authentication strategy relies on LM using a manager password to bind to LDAP, upon which it queries the user’s DN record and compares the password.  The following configuration is required, which can be set in Vault:

```yaml
alm:
  ishtar:
    security:
      ldap:
        url: ldap://ldap-server:389
        base: dc=lm,dc=com
        managerDn: cn=admin,dc=lm,dc=com
        managerPassword: adminpassword
        userSearchBase: ou=people
        userSearchFilter: (&(uid={0})(!(isSuspended=true)))
        groupSearchBase: ou=groups
        groupSearchFilter: member={0}
        passwordAttribute: userPassword
        passwordEncoding: BCRYPT 
```


The purpose of each configuration item is as follows:

- `url` - the URL of an LDAP server listening with the LDAP protocol
- `base` - the base suffix from which all operations should origin. If set, then this base should not be included in userSearchBase or groupSearchBase.
- `managerDn` - the Username (DN) of the "manager" user identity (i.e. "uid=admin,ou=system") which will be used to authenticate to the LDAP server. If omitted, anonymous access will be used
- `managerPassword` - the password for the manager DN
- `userSearchBase` - the base used during directory searches for a user, i.e. the context name to search in
- `userSearchFilter` - the filter expression used in the user search. This is an LDAP search filter (as defined in 'RFC 2254') with optional arguments. The user query can be used to filter for suspended users based upon the value of a certain field if this exists or has been defined as a custom type in the LDAP schema (e.g. isSuspended)
- `groupSearchBase` - the base DN from which the search for group membership should be performed
- `groupSearchFilter` - the pattern to be used for the group members search. {0} is the user's DN
- `passwordAttribute` - the attribute in the directory which contains the user password
- `passwordEncoding` - the encoding on the stored password (only BCRYPT and PLAIN are supported)

If using passwordEncoding of BCRYPT, the user's password must be provided as a BCrypt encoded value. The BCrypt hashing library used in ALM currently only supports hashed passwords with the `$2a` prefix. It should be ensured that any LDAP passwords generated make use of a BCrypt hashing algorithm which only generates password hashes with the `$2a` prefix, otherwise login attempts will fail. An example tool that may be used to convert plain-text passwords to BCrypt is the [bcrypt-cli](https://github.com/bitnami/bcrypt-cli).

## Revoke user access

An existing user may be suspended in order to disable their access

### Suspension using groups

Suspension can be performed by making a user a members of a group called Suspended:

```
dn: cn=Suspended,ou=groups,dc=lm,dc=com
objectclass: groupOfNames
cn: Suspended
member: uid=TestUserA,ou=people,dc=lm,dc=com
```

### Suspension using Password Policy

The default installation of LM, which comes with an instance of OpenLDAP, will have a password policy installed and enforced. This meachanism can be used to lockout users. The easiest way to lockout a user is to set a value within the pwdAccountLockedTime attribute under the user's DN record. An example of this is shown below:

#### Lock User

Execute the following command on the OpenLDAP pod to lockout the user 'jack':
```
ldapmodify -D cn=admin,dc=lm,dc=com -W

dn: uid=Jack,ou=people,dc=lm,dc=com
changetype: modify
delete: pwdAccountLockedTime
```

#### Unlock User

Execute the following command on the OpenLDAP pod to unlock the user 'jack':
```
ldapmodify -D cn=admin,dc=lm,dc=com -W

dn: uid=Jack,ou=people,dc=lm,dc=com
changetype: modify
add: pwdAccountLockedTime
pwdAccountLockedTime: 22000101000000Z
```

## Active Directory

To connect to active directory as an LDAP source, the ldapBind mechanism should be used. The following is an example of a configuration that might typically work with Active Directory.

```yaml
alm:
  ishtar:
    security:
      authenticationProvider: ldapBind
      ldap:
        url: ldap://active-directory-server:389
        base: null        
        managerDn: cn=Administrator,cn=Users,dc=lm,dc=local
        managerPassword: adminpassword  
        userSearchBase: cn=Users,dc=lm,dc=local
        userSearchFilter: cn={0}
        groupSearchBase: dc=lm,dc=local
        groupSearchFilter: member={0}
```