---
title: Manage RM Timeout values
weight: 30
---

## Introduction

Telco Network Cloud Orchestration (TNC-O) can communicate with a number of Resource Managers (RM) when executing the set of tasks of an intent. This communication is through the OSSLM API. There are three timers and three associated timer configurations values which govern this relationship. 

*  `alm.http.clientReadTimeout`
*  `alm.daytona.resource-manager.default-timeout-duration`
*  `alm.daytona.resource-manager.polling-interval`


| Setting | Default Setting | Description |
|---|---|---|
| `alm.http.clientReadTimeout` | 30s  | Defaulting to 30 seconds, `clientReadTimeout` represents the time that the Intent Engine will wait for a response to the task execution request from the RM |
| `alm.daytona.resource-manager.default-timeout-duration` | 15m | The time, once the request has been accepted by the resource manager, that the Intent Engine will give the RM to complete the task before failing it |
| `alm.daytona.resource-manager.polling-interval` | 15s | Once an intent execution request has been positively acknowledged by the resource manager, the Intent Engine will poll the RM at this interval for `polling-interval` to determine if the task has completed |

 ![Intent Engine-RM Interface Timers](/images/user-guides/administration/configuration/IntentEng-ResourceMgr-timers.png "Intent Engine-RM Interface Timers")

 IntentEng-ResourceMgr-timers

Once a request has been accepted by the RM, TNC-O gives it a finite amount of time to complete the task. During this time, the Intent Engine will poll the RM at intervals to determine if the task has been completed. Once the RM responds to the poll indicating that the Task has completed (be it successfully or unsuccessfully), the Intent Engine will cease polling and cancel The default-timeout-duration timer.


All three of these timer values can be set to specific values in Vault following the same procedure should the default values not meet the needs of a specific deployment. They can be set collectively or individually as required. There is no requirement to set all three. In the following example we look at setting `clientReadTimeout` but this can be applied to all three timers.

## Procedure to set a custom RM Response timeout value

Setting the value requires two steps 
1. Setting the `alm.http.clientReadTimeout` property in Vault
2. Restarting the *daytona* microservice instances

These are achieved as follows;

1. Setting the `alm.http.clientReadTimeout` property in Vault

    The general details of how to make a configuration change in vault are detailed [here](/user-guides/administration/configuration/configuring-lm) but the specific details for this setting are as follows  
    
    a. Log in to Vault UI using the appropriate vault security token for your environment.  
    b. Navigate to the TNC-O secrets ( ui/vault/secrets/lm/list ).  
    c. If an existing ‘secret’ does not exist for daytona then one must be created. By default a daytona secret does not exist. A new one can be created using the ‘Create Secret’ button on the top right-hand side of the UI. Should a daytona secret already exist then it should be edited.  
    d. Add a key/value to the secret with the new timeout period. The provided value is in milliseconds. 
    ```
    Key: alm.http.clientReadTimeout 
    value: <newclientReadTimeoutValue> 
    ```
    For example; 
    ```
    alm.http.clientReadTimeout: 900000 
    ```
    This will alter the desired clientReadTimeout to 900000ms (15 minutes) from its default of 300000 (5 minutes). The default is held in the code and clientReadTimeout only needs to be present in Vault if this is to be overridden.

    The values for `alm.daytona.resource-manager.default-timeout-duration` & `alm.daytona.resource-manager.polling-interval` can be supplied with units thus a one hour timer can, for example, be set using:
    - 1h
    - 60m
    - 360s ( default thus 360 without a unit is 360s )
    - 360000ms

2.   Restarting the *daytona* microservice instances
   
    With the new setting made, the individual daytona microservice instances must be restarted to adopt the new setting

    a. With kubectl configured for the correct cluster perform the following query to obtain a list of daytona microservice instances
    ```
    kubectl get pods | grep -i daytona | awk  '{print $1}';
    ```
    b. 'Bounce' each *daytona* microservice pod in turn making sure that each pod comes back into service before bouncing the next. This will ensure that the system does not lose engineered capacity
    ```
    kubectl delete pod <output>
    ```
