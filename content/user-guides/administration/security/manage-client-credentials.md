---
title: Manage Client Credentials
weight: 50
---

The following guide details how to configure Client Credentials in Agile Lifecycle Manager (ALM) on a deployed system. These credentials are required to make API requests from external API clients and integrated systems. To assist in maintaining a secure system it is recommended that each external client have its own set of credentials.

# Pre-requisites

To complete this guide you will need:

- An existing installation of the ALM
- A REST client 
- Understanding of how to [make authenticated requests to LM](/user-guides/authenticated-api-requests)

# Add client credentials

Client credentials can be created using the credentials REST API. This API is protected, so authentication is required to access it. You may use the default admin client or any existing client which ultimately has the **SECADMIN** privilege to perform these actions (typically `LmClient`, see [Default Client Credentials](/reference/security/default-client-credentials)) to do this.

To create a new set of credentials, send a `POST` request to `https://<your-lm-api-host>:<your-lm-api-port>/api/credentials` with the following JSON fields:

- clientId - the ID of your new client
- clientSecret - a chosen password for the client
- authorisedGrantTypes - types of authentication allowed
  - `client_credentials` - allows this client to make API requests with just it's own credentials
  - `password` - allows this client to make API requests with it's own credentials combined with a valid LM username/password 
  - `refresh_token` - can only be used with `password`. Allows the client to refresh an expired access token using a refresh token (avoids needing to request a user for their password again)
- accessTokenValidity - time in seconds an access token remains valid for (defaults to 1200)
- refreshTokenValidity - time in seconds a refresh token remains valid for (defaults to 30600)
- [roles](/user-guides/administration/security/manage-roles) - the roles assigned to this client (should only be used in combination with the `client_credentials` grant type, as any client with `password` should assume the roles of the user at runtime)

Example payload:
```
{
    "clientId": "NewClient",
    "clientSecret": "thisisthesecret",
    "authorisedGrantTypes": [
        "client_credentials",
    ],
    "accessTokenValidity": 300,
    "roles": [
        "SLMAdmin"
    ]
}
```

# Updating Client Credentials 

You may update client credentials with a similar request to a create, but instead the payload must be sent in a `PUT` request to: `https://<your-lm-api-host>:<your-lm-api-port>/api/credentials/<client-id>`

# UI login timeout values

Login sessions to the LM UI have the following behaviour which is are governed by the token validity parameters set for the NimrodClient:

* after a set period (default 20 minutes), the user's session token (access token) will be automatically refreshed. At this point LDAP is consulted to verify the current suspended status and roles of the user 
* after a longer set period (default 8.5 hours), the user's session is invalidated and they will be forced to login again

In order to modify front-end timeout values, the UI client credentials (`NimrodClient`) must be updated, adjusting the values of `accessTokenValidity` and `refreshTokenValidity`

