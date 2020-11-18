---
title: Default LM Users 
weight: 20
---

The default installation of Agile Lifecycle Manager (ALM) comes with the following default users, groups, roles and privileges.

# Default users

| Username | Password | Member of Group        | Suspended |
|----------|----------|------------------------|-----------|
| Jack     | jack     | SLMAdmin               | No        |
| Jill     | jill     | Portal                 | No        |
| John     | john     | SLMAdmin               | No        |
| Jane     | jane     | SLMAdmin, RootSecAdmin | No        |
| Derek    | derek    | RootSecAdmin           | No        |
| Lisa     | lisa     | -                      | No        |
| Kim      | kim      | ReadOnly               | No        |
| Steve    | steve    | SLMAdmin               | Yes       |

# Default groups

| Group Name   | Roles Granted |
|--------------|---------------|
| SLMAdmin     | SLMAdmin      |
| Portal       | Portal        |
| RootSecAdmin | RootSecAdmin  |
| ReadOnly     | ReadOnly      |

# Default roles

| SLM Role                 | Description                                                                                                                                                                                                                                                      | Privileges                                                                                                                                                                                                                                                                                                               |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SLM Admin                | A user with the 'SLMAdmin' role can perform the whole range of operations permissible with ALM                                                                                                                                                           | <ul><li>Network Service instances - CRUDE</li><li>VNF Instances - CRUDE</li><li>Network Service Designs - CRUDE</li><li>VNF Designs - CRUDE</li><li>Deployment Locations - CRUDE</li><li>VDUs - CRUDE</li><li>Behaviour Tests - CRUD</li><li>Intent Requests - Read and Execute</li><li>Resource Driver - Read and Write</li></ul>                               |
| Portal                   | As a user with 'Portal' role can create Assembly Instances, but otherwise has read-only access                                                                                                                                                                   | <ul><li>Network Service instances - CRUDE</li><li>VNF Instances - Read-Only</li><li>Network Service Designs - Read-Only</li><li>VNF Designs - NO ACCESS</li><li>Deployment Locations - Read-Only</li><li>VDUs - Read-Only</li><li>Behaviour Tests - CRUDE</li><li>Intent Requests - Read and Execute</li><li>Resource Driver - Read and Write</li></ul> |
| ReadOnly                 | As a user with 'ReadOnly' role has read-only access to all parts of the system                                                                                                                                                                                   | <ul><li>Network Service instances - Read-Only</li><li>VNF Instances - Read-Only</li><li>Network Service Designs - Read-Only</li><li>VNF Designs - Read-Only</li><li>Deployment Locations - Read-Only</li><li>VDUs - Read-Only</li><li>Behaviour Tests - Read-Only</li><li>Resource Driver - Read-Only</li></ul> |
| RootSecAdmin             | 'Root Security Admin'. Only an authenticated LM user with this role can create/update/delete role definitions within ALM and carry out other security admin tasks.<br>A user with only this role cannot perform any other operations within ALM. | <ul><li>User Credentials - CRUDE</li></ul>                                                                                                                                                                                                                                                                                |
| BehaviourScenarioExecute | 'Root Security Admin'. Only an authenticated LM user with this role can create/update/delete role definitions within ALM and carry out other security admin tasks.<br>A user with only this role cannot perform any other operations within ALM. | <ul><li>Network Service instances - Read and Write</li><li>Intent Requests - Execute</li></ul></ul>                                                                                                                                                                                                                           |



# Available privileges

The list of available privileges which can be listed against a role to assign permissions are as follows:

| Category                            | Description                                                                            | Privilege      | Available actions                                    |
|-------------------------------------|----------------------------------------------------------------------------------------|----------------|------------------------------------------------------|
| Security Administration             | Administer the security of the system, i.e. viewing or modifying credentials           | SECADMIN       | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| Intent Request Operations           | Perform intents relating to health operations on an assembly, i.e. scale or heal       | INTENTREQSOPS  | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| Intent Request Management           | Perform intents relating to management of assemblies, e.g. create, delete or upgrade   | INTENTREQSLMGT | <ul><li>execute</li><li>read</li></ul>               |
| Network Service Instance Management | Perform operations reliant on creating or viewing network service instances            | NSINSTSMG      | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| Network Service Design              | Create and view descriptors for network services                                       | NSDESMGT       | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| SLM Administration                  | Manage deployment locations, resource managers and UI themes                           | SLMADMIN       | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| Manage Deployment Locations         | Create and view deployment locations                                                   | DEPLOYLOCMGT   | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| Behaviour Scenario Execute          | Execute behaviour scenarios and view execution results                                 | BEHVRSCENEXEC  | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| Behaviour Scenario Design           | Design behaviour scenarios                                                             | BEHVRSCENDES   | <ul><li>write</li><li>read</li></ul>                 |
| Resource Driver Management          | Manage resource drivers in relations to a resource manager e.g onboard or get location | RMDRVR         | <ul><li>write</li><li>read</li></ul>                 |
| Resource Driver Key Management      | Read (private and public) keys returned by a resource drivers                          | RMDRVRKEYS     | <ul><li>read</li></ul>                               |
| Resource Package Management         | Create resource packages that work with resource drivers                               | RESOURCEPKG    | <ul><li>write</li></ul>                              |
| VNF Instance Management             | View VNF instances                                                                     | VNFINSTSMGT    | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| VNF Instance Design                 | Create and view descriptors for VNF instances                                          | VNFDESMGT      | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| VDU Instance Management             | Manage VDU instances                                                                   | VDUINSTSMGT    | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| VDU Group Management                | Manage VDU groups                                                                      | VDUGRPMGT      | <ul><li>execute</li><li>write</li><li>read</li></ul> |
| VDU Instance Design                 | Manage descriptors for VDU instances                                                   | VDUDESMGT      | <ul><li>execute</li><li>write</li><li>read</li></ul> |