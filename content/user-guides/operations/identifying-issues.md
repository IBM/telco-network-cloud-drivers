---
title: Identifying Issues
---

## View Log Files
While Telco Network Cloud Orchestration (TNCO) logs are generated on and can be viewed on individual pods (per service instances) using `kubectl logs`, in real terms this is impractical to do and gain a holistic view of system operation through the logs. Viewing logs from the collective logs in Elasticsearch using Kibana is both more effective and usable.

When viewing logs it is important to first ensure that the log level has the level of detail you require. While that cannot be altered retrospectively, it is possible to increase the logging level on a running system or to set the desired log level as the default. Details of how to do this can be found [here](/user-guides/operations/log-management)


### Tracing Contexts and Transaction Ids
All actions taken by TNCO have an associated `Tracing Context`. This is a collection of Ids (min 1) which can be used to collate information in a log stream to the set of logs specific to the initiating event.

A Tracing Context can be provided in any API call to the API gateway as a header. Likewise in any external API call, such as that to a Resource Manager is passed this tracing context. This allows end-to-end tracing both within the TNCO application and in those which it communicates. 

Should an application on TNCO's northbound interface not provide a tracing context then TNCO will create one on the API gateway so that it is available for the remainder of the transaction.

When an external system provides a tracing context it must at a minimum provide a `Transaction Id`. This Id should be unique from the perspective of the TNCO system. It is incumbent on the calling system to ensure that this is the case. The calling system may not be the only API client and when selecting an Id, it is encouraged (but not enforced) to use a UUID/GUID if it is not possible to ensure the id is not unique. As this is a Transaction Id, it is not sufficient to use an assit id or a customer id as it is possible to have multiple transactions for each within a time window. The TNCO UI generates its own Transaction Ids when communicating with the _'core TNCO microservices'_,

### API transaction id Header
| Key | Value |
|---|---|
| X-TraceCtx-TransactionId | \<any Unique Id\> |


{{%note %}}
NOTE: TNCO and an intent execution do not run in total isolation. Focusing on a tracing context does carry some risk of excluding logs which may be of value. So, while they are useful for isolating logs we should remain mindful of this and there will be cases where looking at the total set of logs within a time window may be beneficial.
{{%/note %}}

Kibana offers such a feature, Opening any log of interest and selecting `'view surrounding documents'` (logs) will have the desired effect.

{{%note %}}
NOTE:  Kibana it is unaware of the fact that we are looking at logs and refers to them by the more generic term 'document'.
{{%/note %}}

An example of such a case is when an operation is being called on a referenced resource while a concurrent intent being run on that same resource. This has a relatively low probability of occurring, but it should not be exclude, `viewing surrounding documents` (logs) will help reveal this.

### Filtering to an Id 
Filtering to an Transaction id Id can be achieved in Kibana by setting an appropriate filter. The tracing context attributes (transactionId etc) are configured as filterable fields for logs. This allows the user to define a filter in Kibana by selecting `Add Filter` on the Discover page, selecting `tracectx.transactionid` and appropriate condition for the filter (`is` , `is one of` - when checking for multiple values ) and the 


For example, the following filter will filter all logs containing the Transaction Id `e5efa064-2043-44dc-95b8-7872c8fc7370`

```
{
  "query": {
    "match": {
      "tracectx.transactionid": {
        "query": "e5efa064-2043-44dc-95b8-7872c8fc7370",
        "type": "phrase"
      }
    }
  }
}
```


{{%note %}}
NOTE: an appropriate Index pattern must be applied.
{{%/note %}}

The transaction logging on any TNCO system can be found with an index pattern of `lm-logs-6*`

### Discovering the transaction id
If an error has been generated on the system as teh result of an API call then the transaction id will be in the response header. And if by the front end then the context id will be displayed in the error dialogue. 

However if it is not possible to provide the transaction id when debugging then secondary information such as 
* Assembly Name
* Time window
* Deployment Location 
* etc

### restricting logs to a subset of TNCO Microservices
Particularly if it is not possible to identify a Transaction Id on which to establish a context it can be beneficial in some cases to restrict the set of log displayed to a subset (one or more) of the TNCO Microservices. This can be done by applying a filter based on `kubernetes.labels.app` this can be set to match one or more of the TNCO microservices or to a Resource Manager instance for example. 

For example to restrict the displayed logs to only those generated by the TNCO Intent Engine the following Kibana filter can be applied

```
{
  "query": {
    "match": {
      "kubernetes.labels.app": {
        "query": "daytona",
        "type": "phrase"
      }
    }
  }
}
```

Or for the TNCO Intent Engine and the Intent Process persistence service 


```
{
  "query": {
    "bool": {
      "should": [
        {
          "match_phrase": {
            "kubernetes.labels.app": "daytona"
          }
        },
        {
          "match_phrase": {
            "kubernetes.labels.app": "talledega"
          }
        }
      ],
      "minimum_should_match": 1
    }
  }
}
```


## View Intent History
Each Assembly instance has an Intent History. By virtue of the assembly existing at least one Intent must have been executed on the Assembly Instance.


One can view the Intent History from the TNCO UI in one of two places
1. From the main `Operations --> Recent Assembly Instance` view
2. From within the `Process Execution View` of an assembly instance

### Intent History from `Operations --> Recent Assembly Instance` view

Each assembly instance in this view has via the ellipsis (`...`) an `Execution History` option. This will bring up a model with every historical Intent execution for the target Assembly Instance listed,  along with timestamps and a result (status).

To view the Intent in detail one should select `Inspect` to be taken to a snapshot of the completed process in a `Process Execution View`.

### Intent History from `Process Execution View` of an assembly instance
From any 'Process Execution View' (PEV) on the target Assembly Instance the user can select `Execution History` from the PEV header. This will bring up a model with every historical Intent execution for the in context Assembly Instance listed,  along with timestamps and a result (status).

To view the Intent in detail one should select `Inspect` to be taken to a snapshot of the completed process in a `Process Execution View`.


### View Designs
The design for an Assembly descriptor can be viewed in the TNCO UI under Designer --> Assembly Designer from which an Assembly descriptor can be selected (searched for) and viewed in detail both in terms of its composition and its Behaviour Tests.


#### Runtime diagnostics
TNCO support the execution fo Behaviour Tests on an instantiated Assembly Instance. This can be performed using the Behaviour Tests defined in the Assembly Design and executed through the [Behaviour Test runner](/user-guides/behaviour-testing/overview). 

