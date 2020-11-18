---
title: Authenticated API Requests
weight: 100
---

This guide details how to connect from a calling system into the Telco Network Cloud Orchestration (TNCO) APIs securely.

# Pre-requisites

- an existing installation of the TNCO
- a valid set of client credentials which can be used for authentication. If not, see [Managing Client Credentials](/user-guides/administration/security/manage-client-credentials)

# Making an API call 

LM uses the standard OAuth 2.0 mechanism to authenticate incoming API requests. This requires some additional tokens to be setup in the headers of any HTTPS request that is made. 

The following steps make use of the Postman Client to demonstrate how to make authenticated API calls.

## Request a new Access Token 

Start by getting a new access token using type OAuth 2.0 and the Access Token URL `https://<app hostname>:<app port>/oauth/token`. If using the default installation, the hostname and port are as shown below.

![Get New Token](/images/security/get-new-token.png "Get New Token")

Enter the following values into these fields: 
 
| Postman Field                                       | Value                              |
| --------------------------------------------------- | ---------------------------------- |
| TYPE                                                | OAuth 2.0                          |
| Add authentication data to                          | `Request Headers`                  |
| Access Token (adjust hostname and port accordingly) | `https://app.lm:32443/oauth/token` |

Click the **[Get New Access Token]** button. Postman will prompt you for the security credentials it needs to encode into the Header of the request: 

![Request Token](/images/security/request-token.png "Request Token")

Enter the following values into these fields:  

| Postman Field         | Value                        |
| --------------------- | ---------------------------- |
| Token Name            | `<Any name you like to use>` |
| Grant Type            | `Client Credentials `        |
| Client ID             | `<The Client ID>`            |
| Client Secret         | `<The Client Secret>`        |
| Scope                 | `all`                        |
| Client Authentication | `Send as Basic Auth Header`  |

The “Client Secret” is the value setup as part of the initial installation of LM matching the “Client ID” you have chosen 

Click the **[Get New Access Token]** button. If your request is successful, then you will get a JSON response similar to this: 

```
{ 
    "access_token": "fdf8e754-1abe-42ae-b064-7969b05788ca", 
    "token_type": "bearer", 
    "expires_in": 1199, 
    "scope": "all" 
} 
```

### Using the new Access Token

Postman will automatically embed the token in the new Access Token in the request headers when an authorization type of OAuth 2.0 is selected. 

To use the token outside of Postman, i.e. as part of your you system-to-system calls, ensure any requests contain the header “Authorization” with the token as the value prefixed with “Bearer “, e.g. `Authorization: Bearer fdf8e754-1abe-42ae-b064-7969b05788ca`