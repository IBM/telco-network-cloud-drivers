---
title: Managing Vault Tokens
weight: 60
---

# Managing Vault Tokens

Vault tokens do not have an indefinite expiry and will need to be renewed or regenerated after their expiration. By default, the Vault token used by TNCO to access configuration will be created with a duration as per the default value configured in the Vault settings, i.e.

```yaml
vault:  
  vault:
    config:      
      max_lease_ttl: 87600h  # this is the maximum duration a token can exist, before which it can be renewed, after which it will be revoked
      default_lease_ttl: 87600h  # this is the default duration a token will exist, after which it will be revoked, unless renewed
```

## Expired TNCO Vault Tokens

If the Vault token used by TNCO expires, then any services in TNCO will be unable to access configuration, and as such will be unable to start. Most services will just silently fail the startup if this happens, but Conductor should provide a log message if it or another services fails to start for this reason.

If this is the case, then the Vault token should be renewed (or replaced in the case where it can no longer be renewed).

## Renewing Vault Token

If a token is renewed, then its expiry will be extended so that its new TTL is the value in `default_lease_ttl`. A token can only exist up until the value specified `max_lease_ttl`, after which it will be automatically revoked and not able to be renewed. At this point it will be necessary to create a new token. See [Forceful token renewal through the Vault CLI](#forceful-token-renewal-through-the-vault-cli) (skip revoke token command).

### Token renewal through the Vault UI

It is possible to renew a token through the Vault UI. You must login with the token to be renewed, then click the link in the top-right dropdown.

![Renew Vault Token](/images/user-guides/administration/security/vault-token-ui-renewal.png "Renew Vault Token")

### Token renewal through the Vault CLI

Alternatively, it is possible to renew the token through the Vault CLI. Firstly, exec onto the Vault Kubernetes pod, e.g.

```
kubectl exec -it foundation-vault-f46b47456-24cmc /bin/sh
 ```

To use the Vault CLI, it is always necessary to execute the following 

```
export VAULT_ADDR='https://127.0.0.1:8200'
```

Then execute the following commands (substituting in the valid TNCO token ID):

```
vault login <insert TNCO token ID here>
vault renew
```

{{%note %}}
NOTE: there is an issue in Vault whereby tokens which have auto-renewed, or are renewed through the CLI, can no longer be used to login through the Vault UI despite being still valid for login via the CLI or via API authentication. This will not inhibit TNCO's access to Vault. If this presents a problem administering configuration in Vault, either login with the root token (not recommended) or revoke and re-create the token as below (see [Forceful token renewal through the Vault CLI](#forceful-token-renewal-through-the-vault-cli)).
{{%/note %}}

To establish the current expiry time for a given token, execute the following (will display for the currently logged in token)

```
vault token lookup
```

### Forceful token renewal through the Vault CLI

In order to more forcefully renew a token, to reset its max TTL and ensure it is valid for UI login, it will be necessary to revoke and create the token. 

It is possible to create a new token with the same ID as a previously revoked token. However if a new token ID is required, all TNCO services will need to be updated with the new value. This is normally stored in the Kubernetes secret called `vault-token`. Simply replacing the token ID within this secret will be sufficient to enable TNCO's services to use the new token next time they access Vault on restart.

In order to revoke and create tokens, the root Vault token will be required.

Execute the following commands (substituting in the valid root and TNCO token IDs):

```
vault login <insert root token ID here>
vault token revoke <insert TNCO token ID here>
vault token create -policy=lm-policy -id=<insert TNCO token ID here>
```
