---
title: Security
weight: 50
---

# Configuring Security in Lifecycle Manager

The recommended installation of Lifecycle Manager is with security enabled. This will give the following benefits:

* HTTPS access to services
* Role-based Access Control to the Lifecycle Manager user interface
* Protected access to TNCO APIs

## Disabling Security

The easiest way to disable security during installation is by including the No Security flavour

### No Security Flavour
Directory: no-security
This flavour disables TNCO security and is intended for development/testing purposes. To be more precise, this flavour disables:

* HTTPS access to the TNCO UI and API
* inclusion of Openldap
* TNCO UI authenticated access
* TNCO API authenticated access

This flavour may be used in combination with other flavours included in the TNCO package.

### Installation
To install TNCO with this flavour, ensure the following values file from the lm-helm-charts package is provided during the Helm install process which is described later in this guide:
`./flavours/no-security/no-security-values.yaml

## Changing default passwords

It is recommended all system passwords are modified from their default values during installation for added security. This can be achieved as follows:

### OpenLDAP Administrator Password

In order to modify the default password for administering OpenLDAP, modify this Helm value in your custom values file.

```yaml
global:
  ldap:
    managerPassword: lmadmin # modify this with your custom password
```

### TNCO API Administration User

In order to administer Client Credentials in TNCO, the system is setup with some default Client Credential. These can be modified or added to by declaring values in the custom Helm values file as follows (change only the clientId and clientSecret, leaving grantTypes and roles as shown below):

```yaml
configurator: 
  security:
    lm:
      clientCredentials:
        - clientId: LmClient
          clientSecret: pass123
          grantTypes: client_credentials
          roles: SLMAdmin
```

### Internal Clients

TNCO installs with some clients configured to allow secure communication internally. These clients are mandatory, but their default passwords can be changed. Additionally their respective token validitity periods can also be configured (all values in seconds). Their meanings are as follows: 

- the value `configurator.security.lm.nimrod.accessTokenValidity` represents the frequency with which the Lifecycle Manager user interface will refresh its authentication session. A refresh involves a seamless reconfirmation of the user's validity and available roles with the LDAP user store. 
- the value `configurator.security.lm.nimrod.refreshTokenValidity` represents the period of time over which the access token can be automatically refreshed. After this has expired, the user will be forced to login again.
- the value `configurator.security.lm.doki.accessTokenValidity` represents the frequency with which the backend will internally reauthenticate itself when executing [Behaviour Testing](/user-guides/behaviour-testing/overview/) scenarios. 

In order to modify the default passwords or timeouts, add these Helm values into your custom values file.

```yaml
configurator: 
  security:
    lm:
      nimrod:
        clientSecret: pass123 # modify this with your custom password
        accessTokenValidity: 1200 # 20 minutes
        refreshTokenValidity: 30600 # 8.5 hours
      doki:
        clientSecret: pass123 # modify this with your custom password
        accessTokenValidity: 1200 # 20 minutes
```



### Keystore Password

Some of the services within TNCO host SSL certificates used for secure internal communications. To configure the password used for this certificate keystore, modify this value:

```yaml
configurator: 
  security:
    lm:
      keyStorePassword: keypass  # modify this with your custom password
```

### Vault Access Token

In order to lookup application configuration, the services of TNCO will need to connect to Vault. They require use of an access token to facilitate this. To modify this from the default value, generate a new UUID and replace it in the following Helm value into your custom values file.

```yaml
vaultInit:
  vaultToken:  # insert your new generated UUID
```
This access token will be automatically setup in Vault during installation, and the services of TNCO will use this for authentication with Vault. This token can be used to login to the Vault UI after installation in order to modify application configuration. 

{{%note %}}
NOTE: Vault tokens do not have an indefinite expiry and will need to be renewed or regenerated after their expiration.
{{%/note %}}

By default, Vault tokens will be created with a duration as specified in the values file for helm-foundation, i.e.

```yaml
vault:  
  vault:
    config:      
      max_lease_ttl: 87600h  # this is the maximum duration a token can exist, before which it can be renewed, after which it will be revoked
      default_lease_ttl: 87600h  # this is the default duration a token will exist, after which it will be revoked, unless renewed
```

See also [Managing Vault Tokens]({{< ref "managing-vault-tokens" >}})

# Next Steps

Continue the configuration of [Storage]({{< ref "storage" >}})