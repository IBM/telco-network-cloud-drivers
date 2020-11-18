---
title: Getting Started
weight: 11
---

The default installation of Telco Network Cloud Orchestration (TNCO) includes a secure application with protected access and a set of [preconfigured roles](/reference/security/default-security-users#default-roles). It also includes [predefined users](/reference/security/default-security-users#default-users) who are able to perform a variety of the key system roles. These predefined users are suitable for either basic usage of the system in a demonstration capacity, or can act as a template for understanding how to configure users in a more permanent installation. 

{{%note %}}
NOTE: It is recommended that the set of predefined users should be removed for a production deployment.
{{%/note %}}

# Security

User access in TNCO is based on 5 principles: Privilege, Roles, Groups, Users and Clients.

## Privileges

A privilege grants permissions to a user to perform an operation in the system. The set of allowed privileges are built into TNCO, read more information about them at: [Available Privileges](/reference/security/default-security-users#available-privileges)

## Roles

A role is a collection of privileges that represent a responsibility in the system. For example, an "Administrator" role could be created with all possible privileges. 

Each role and it's assigned groups or clients are managed in the configuration for the TNCO installation.

- [Default Roles](/reference/security/default-security-users#default-roles).
- [Configure Roles](/user-guides/administration/security/manage-roles)

## Groups

A group is a collection of users with similar responsibilities. Every role configured on an TNCO installation is assigned a list of the groups that make use of it (a group may be assigned to more than one role). This results in assigning that role to every user in the group, granting them the privileges of that role.

TNCO reads groups from a (potentially external) LDAP server. 

- [Default Groups](/reference/security/default-security-users#default-groups)
- [Manage Groups](/user-guides/administration/security/manage-users)

## Users

A user is a person with access to the system. Their access credentials may be used to make API requests from a valid client and login to the user interface of TNCO. The actions allowed by a user are dictated by the groups they are a part of.

TNCO reads users from a (potentially external) LDAP server. 

- [Default Users](/reference/security/default-security-users#default-users)
- [Manage Users](/user-guides/administration/security/manage-users)

## Clients

A client is a system allowed to make requests on TNCO. Each client is assigned a given grant type, which controls the type of authentication requests it may make and potential roles it is assigned. 

For example a client may be created with roles, allowing it to authenticate with just it's own credentials. Alternatively, a client may be assigned the `password` grant type, so it may only authenticate with it's credentials in combination with a valid username/password, assuming the roles of the user (the TNCO user interface is a good example of this, as it allows users to login with their username/password, combines this with it's own set of credentials to authenticate as the given user) 

Even with username/password credentials, the id and secret of a valid client must be included on **all** authentication requests.

- [Default Client Credentials](/reference/security/default-client-credentials)
- [Manage Client Credentials](/user-guides/administration/security/manage-client-credentials)
- [Making authenticated requests](/user-guides/authenticated-api-requests)
