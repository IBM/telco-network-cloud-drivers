---
title: Infrastructure Keys
weight: 80
---

The following section details the APIs used to manage Infrastructure Keys.

Associated with each definition are details of the request parameters and responses. These include the name of each field plus a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

For a 40x, 50x or any other error response please see [error response codes](/reference/lm-api/interface-architecture/#possible-http-error-response-codes).

Note: any infrastructure keys (shared or resource) returned in an API response will not include the private key.

# Create Shared Infrastructure Key

Creates a new shared infrastructure key.

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/infrastructure-keys/shared |
| **HTTP Method**  | POST                     |

### Request Headers:

| **Header**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| Content-Type           | Both JSON and YAML requests are supported. application/json is the default. To send YAML, set this header to `application/yaml`. Given that private SSH keys contain newline characters, we recommend you use application/yaml for this. | Yes  |

### Body

| **Field**                        | **Description**                                                 | **Mandatory** |
| -------------------------------- | --------------------------------------------------------------- | ------------- |
| name               | The name of the infrastructure key (must be unique)                           | Yes           |
| description                          | Infrastructure key description | No           |
| publicKey                          | Public key portion of the infrastructure key | No           |
| privateKey                          | Private key portion of the infrastructure key | No           |

### Example (YAML)

```
name: key
description: key
publicKey: ssh-rsa XXAAAAB3NzaC1yc2EAAAADAQABAAABAQDJ1t35uQorDiR8gmXQtbGB6W+NrK4nx+IYj8bTBsQu0gx4jlYNwb2wzaeejLU7QP8FB5G3eclo7emUNK479Eg/UMtPmNzsQhRjlUKonuYLPncLGKtetFgjMnmePvi8mudl9o1alvcdtn41VofNZ4dN8RcgKIJOdS1Xd4vwHEW57PhUNIHs0x2MHfPQ0wsz1vzUrof4B2bxFkXI4f3kTXKV2n3MMfeb736TYfrhBcji4i9OOiQV3jwlrmqeOQyddgrCUB6TEDPJfO6XGqxWSl56CxvbqSSZ3ugplptAoObUHuxJs5P6pMGvC03D5nDq3pSKajAgTix6xjM6Z4LKFHPx accanto@blacktower
privateKey: |
  -----BEGIN RSA PRIVATE KEY-----
  MIIEpAIBAAKCAQEAvdugKkZpDMCrDks78JMQd9KrL7rPkQeUheAob6oUVeLwhyXm
  2q+EQo7oCSc4k2nKXdBTIl2d/ob/jjHQmpeYzjJD3Xk5GHuzRdJy1T+g+j5ZaJMg
  5w8paUqoaFEoJsuZS5zu4dpLEo5htJdbLhtv29LCl0u68V6EnL+WyT4kzxTz3UjX
  BMZTH243dByFjdANEXBQdf0aDcsuregbowV8eUVzC9yd0j3UvZzIFZnkKOE3yDBG
  PX4qtrmYLhEYkn+QY85bRlT2dAP5Gcfff0LMx1IpePAcQSQINMNamX36B4Atsa2u
  +bVsJCmoIZZWcrhxSOeURdZz6xYalPr3sGnUPQIDAQABAoIBAGr6lgU8J3VIGxqy
  ydOFCoJ58nuyh8Lwwn+tDxvcehjrBx0f/jS7MYtPeu+tafOmaKD0AeQbXCtPZjB5
  YVG6mh+VsyfYZpOlIB73tjzy3YIkH70NKj0IDg2GQ96D3Fv/3SD+DJy2pBaQo/1e
  S8JvM1hqKbuWsH/RAmhQjGZY3eTQrtKn2jvM4C/pThKHdeRytmUFuxG8i7MN4YmD
  GfyNGvuNk4YGAXUPwD+5acZfms/nukY5QGQeLI3ma2rl6/psVeQk1Dt20zg/zp5I
  V5FidIqgpJ1zJnevcM+CYO6DlhO6cWpFwTb1BCyHlKy51t+/5UaxVWWYC8uXgfKs
  OV8W4AECgYEA/L4noGF0Y2XDPpa5ym8CPRp7+lM6yo++pKo0tSSe3vSjzlC/1svU
  mbPNp0eX7GAkK6Om2WQtEdlXAk2Cd38hxemH5VMBAB0sV6cUhdMXspvW5E20dJBW
  lWGfjZooH1xzu02z9/RokXvSd5fihpGElo7kUOi7Au/XuA9xq4PJr50CgYEAwE4A
  g5cR2nOAZLTcrtY0HXFvdJYsJQNq5iLymYTI8qS9C/ibLDeKIvj+UEeCZ0K7M8E9
  gtQ5d4FpuwaXyatgyJa0/QwY2g+4+DMYlA8mLkQuL+K/18ERDMl3w1dflUsZuK4h
  WBjjvLLoQ0DW1lt/sBaVexuScoJR0Anf884CpSECgYEAzYkWUKbwL6UiElQg4y9D
  cs2G5RuqQ/CB6QdBtc4CJO5uB+pDGDrKufQu2kqukdvdjl+X4FJHFKzaxVSjNOp+
  XKR9j1DhD2aqGN4XIn14WBfDugY3KlP3FaQ+TLmAx4A33apjINHx993qWrd50FWm
  rYmmwuWAr/K8S0LD/ec+rUECgYEAlkYeFrad5/RsN8Yx0Zpn/T4gl52mf4INLivP
  InJmSV68sDcko0f/dVbX/Mn0uFaoTUhLlgnbomyJv/Hl+V0n83f5lOi4Huc8ZxAe
  u8yezHbRFPB/c81WUoS5RvfnJJYcUnoYamyAwnuYDr4DZFz6ChOL2jjwlvUJk6Wz
  0SSCYqECgYB9DUiP8sLrf5YmzwxzHLXYKJRJKEmhRYgE2ZYBQ+CbhkBcGoJwLk1F
  4WMdzm8hyddPQvE4UU2fVVrbppYtnkkTAaIXdBzQA/hjHnQlpooHr/cMmftE4dPO
  UQ122Zq7AHx3P58o1Q0CVhakGkoa+mc0+VK4O2uYl3sMrKCpVjs2ZQ==
  -----END RSA PRIVATE KEY-----
```

Note the syntax for the private key; it must use the pipe `|` symbol and be indented to conform to the PEM format.

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 201 |

### Response Headers

| **Field**                        | **Description**                                              |
| -------------------------------- | ------------------------------------------------------------ |
| location                         | Endpoint to infrastructure key resource |

### Response Body

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| name               | The name of the infrastructure key                            |
| description               | Infrastructure key description                              |
| privateKey                          | Private key portion of the infrastructure key |
| publicKey                          | Public key portion of the infrastructure key |

# Update Shared Infrastructure Key

Update an existing shared infrastructure key.

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/infrastructure-keys/shared/{name} |
| **HTTP Method**  | PUT                     |

### Request Headers:

| **Header**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| Content-Type           | Both JSON and YAML requests are supported. application/json is the default. To send YAML, set this header to `application/yaml`. Given that private SSH keys contain newline characters, we recommend you use application/yaml for this. | Yes  |

### Path Parameters:

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| name                               | Name of the shared infrastructure key | Yes           |

### Body

| **Field**                        | **Description**                                                 | **Mandatory** |
| -------------------------------- | --------------------------------------------------------------- | ------------- |
| description                          | Infrastructure key description | No           |
| publicKey                          | Public key portion of the infrastructure key | No           |
| privateKey                          | Private key portion of the infrastructure key | No           |

### Example (YAML)

```
description: key
publicKey: ssh-rsa XXAAAAB3NzaC1yc2EAAAADAQABAAABAQDJ1t35uQorDiR8gmXQtbGB6W+NrK4nx+IYj8bTBsQu0gx4jlYNwb2wzaeejLU7QP8FB5G3eclo7emUNK479Eg/UMtPmNzsQhRjlUKonuYLPncLGKtetFgjMnmePvi8mudl9o1alvcdtn41VofNZ4dN8RcgKIJOdS1Xd4vwHEW57PhUNIHs0x2MHfPQ0wsz1vzUrof4B2bxFkXI4f3kTXKV2n3MMfeb736TYfrhBcji4i9OOiQV3jwlrmqeOQyddgrCUB6TEDPJfO6XGqxWSl56CxvbqSSZ3ugplptAoObUHuxJs5P6pMGvC03D5nDq3pSKajAgTix6xjM6Z4LKFHPx accanto@blacktower
privateKey: |
  -----BEGIN RSA PRIVATE KEY-----
  MIIEpAIBAAKCAQEAvdugKkZpDMCrDks78JMQd9KrL7rPkQeUheAob6oUVeLwhyXm
  2q+EQo7oCSc4k2nKXdBTIl2d/ob/jjHQmpeYzjJD3Xk5GHuzRdJy1T+g+j5ZaJMg
  5w8paUqoaFEoJsuZS5zu4dpLEo5htJdbLhtv29LCl0u68V6EnL+WyT4kzxTz3UjX
  BMZTH243dByFjdANEXBQdf0aDcsuregbowV8eUVzC9yd0j3UvZzIFZnkKOE3yDBG
  PX4qtrmYLhEYkn+QY85bRlT2dAP5Gcfff0LMx1IpePAcQSQINMNamX36B4Atsa2u
  +bVsJCmoIZZWcrhxSOeURdZz6xYalPr3sGnUPQIDAQABAoIBAGr6lgU8J3VIGxqy
  ydOFCoJ58nuyh8Lwwn+tDxvcehjrBx0f/jS7MYtPeu+tafOmaKD0AeQbXCtPZjB5
  YVG6mh+VsyfYZpOlIB73tjzy3YIkH70NKj0IDg2GQ96D3Fv/3SD+DJy2pBaQo/1e
  S8JvM1hqKbuWsH/RAmhQjGZY3eTQrtKn2jvM4C/pThKHdeRytmUFuxG8i7MN4YmD
  GfyNGvuNk4YGAXUPwD+5acZfms/nukY5QGQeLI3ma2rl6/psVeQk1Dt20zg/zp5I
  V5FidIqgpJ1zJnevcM+CYO6DlhO6cWpFwTb1BCyHlKy51t+/5UaxVWWYC8uXgfKs
  OV8W4AECgYEA/L4noGF0Y2XDPpa5ym8CPRp7+lM6yo++pKo0tSSe3vSjzlC/1svU
  mbPNp0eX7GAkK6Om2WQtEdlXAk2Cd38hxemH5VMBAB0sV6cUhdMXspvW5E20dJBW
  lWGfjZooH1xzu02z9/RokXvSd5fihpGElo7kUOi7Au/XuA9xq4PJr50CgYEAwE4A
  g5cR2nOAZLTcrtY0HXFvdJYsJQNq5iLymYTI8qS9C/ibLDeKIvj+UEeCZ0K7M8E9
  gtQ5d4FpuwaXyatgyJa0/QwY2g+4+DMYlA8mLkQuL+K/18ERDMl3w1dflUsZuK4h
  WBjjvLLoQ0DW1lt/sBaVexuScoJR0Anf884CpSECgYEAzYkWUKbwL6UiElQg4y9D
  cs2G5RuqQ/CB6QdBtc4CJO5uB+pDGDrKufQu2kqukdvdjl+X4FJHFKzaxVSjNOp+
  XKR9j1DhD2aqGN4XIn14WBfDugY3KlP3FaQ+TLmAx4A33apjINHx993qWrd50FWm
  rYmmwuWAr/K8S0LD/ec+rUECgYEAlkYeFrad5/RsN8Yx0Zpn/T4gl52mf4INLivP
  InJmSV68sDcko0f/dVbX/Mn0uFaoTUhLlgnbomyJv/Hl+V0n83f5lOi4Huc8ZxAe
  u8yezHbRFPB/c81WUoS5RvfnJJYcUnoYamyAwnuYDr4DZFz6ChOL2jjwlvUJk6Wz
  0SSCYqECgYB9DUiP8sLrf5YmzwxzHLXYKJRJKEmhRYgE2ZYBQ+CbhkBcGoJwLk1F
  4WMdzm8hyddPQvE4UU2fVVrbppYtnkkTAaIXdBzQA/hjHnQlpooHr/cMmftE4dPO
  UQ122Zq7AHx3P58o1Q0CVhakGkoa+mc0+VK4O2uYl3sMrKCpVjs2ZQ==
  -----END RSA PRIVATE KEY-----
```

Note the syntax for the private key; it must use the pipe `|` symbol and be indented to conform to the PEM format.

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 204 |

# List Shared Infrastructure Keys

View details of all Shared Infrastructure Keys, sorted by name (ascending).

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/infrastructure-keys/shared |
| **HTTP Method**  | GET                     |

### Request Headers:

| **Header**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| Accept           | Both JSON and YAML requests are supported. JSON is the default. To return YAML, set this header to `application/yaml` | No  |

### Request Parameters:

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| includePrivateKey                | Whether to include private keys (true) or not (false)        | No (default is "false")         |

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 200 |

# Get Shared Infrastructure Key by Name

View details of a shared Infrastructure Key

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/infrastructure-keys/{name} |
| **HTTP Method**  | GET                     |

### Request Headers:

| **Header**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| Accept           | Both JSON and YAML requests are supported. JSON is the default. To return YAML, set this header to `application/yaml` | No  |

### Path Parameters:

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| name                               | Name of the shared infrastructure key | Yes           |

### Request Headers:

| **Header**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| Accept           | Both JSON and YAML requests are supported. JSON is the default. To return YAML, set this header to `application/yaml` | No  |

## Response

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 200 |

# Remove Shared Infrastructure Key

Remove a shared Infrastructure Key

## Request

| **Aspect**         | **Value**                |
| ------------------ | ------------------------ |
| **Endpoint URL** | /api/resource-manager/infrastructure-keys/shared/{name} |
| **HTTP Method**  | DELETE                     |

### Path Parameters:

| **Field**                        | **Description**                                              | **Mandatory** |
| -------------------------------- | ------------------------------------------------------------ | ------------- |
| name                               | Name of the shared infrastructure key | Yes           |

## Response 

| **Aspect**          | **Value** |
| ------------------- | --------- |
| **Content-Type** | application/json  |
| **Success Status Code** | 204 |

