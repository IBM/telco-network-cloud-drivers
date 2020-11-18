---
title: Asynchronous State Change Events
weight: 80
---

TNCO emits events when the state of an assembly and its components changes. Messages that are sent asynchronously are put onto a Kafka bus. The exact topics can be configured. These are emitted in response to Intent Requests causing the state of the Assembly Instance, or its associated components, to change. In the event of a failure to change state, an event will also be emitted.

Associated with each example is a table explaining the fields in the example. This includes the name of the field, a brief description and whether the field is mandatory. Whether a field is required or not is based on the context of the examples. The underlying API definition may mark a field as optional, but in some contexts, the fields must be supplied.

In the examples below field names shown in italics are example names and not the real one to be used in messages.

# ProcessStateChangeEvent

 These events are associated with the process that performs the Intent request. These are sent out at the Start of the processing and when completed or failed.

### ProcessStateChangeEvent Examples

Example of an initial state change event:

```
{
   "processId": "e29b86a8-ca75-413b-921b-c4b895996c12",
   "assemblyId": "e4c198d1-2dbb-4557-baae-b5891fa258cf",
   "assemblyName": "example2",
   "assemblyDescriptorName": "assembly::t_single::1.0",
   "intentType": "CreateAssembly",
   "intent": {
      "assemblyName": "example2",
      "descriptorName": "assembly::t_single::1.0",
      "intendedState": "Active",
      "properties": {
         "data": "example data",
         "deplomentLocation": "admin@local"
      }
   },
   "processState": "In Progress",
   "processStartedAt": "2017-09-14T13:06:17.499Z",
   "eventId": "e08039e7-7efd-4b7e-86a3-9d39c48c2dd7",
   "eventCreatedAt": "2017-09-14T13:06:17.499Z",
   "eventType": "ProcessStateChangeEvent"
}
```

The example above shows the first message sent when an intent has been received by TNCO. The processId will be used in all subsequent state change events. These happen when the process changes state.  

Example of the final message on successful completion of the Intent:

```
{
   "processId": "e29b86a8-ca75-413b-921b-c4b895996c12",
   "assemblyId": "e4c198d1-2dbb-4557-baae-b5891fa258cf",
   "assemblyName": "example2",
   "assemblyDescriptorName": "assembly::t_single::1.0",
   "intentType": "CreateAssembly",
   "intent": {
​      "assemblyName": "example2",
​      "descriptorName": "assembly::t_single::1.0",
​      "intendedState": "Active",
​      "properties": {
​         "data": "example data",
​         "deplomentLocation": "admin@local"
​      }
   },
   "processState": "Completed",
   "processStartedAt": "2017-09-14T13:06:17.499Z",
   "processFinishedAt": "2017-09-14T13:06:19.648Z",
   "eventId": "405cf14c-752e-4030-8a4e-6706e04b50f5",
   "eventCreatedAt": "2017-09-14T13:06:19.649Z",
   "eventType": "ProcessStateChangeEvent"
}
```

Example of the final message indicating Intent Failed:

```
{
   "processId": "8c922ec6-7589-4ba8-8b4e-d7841b9a9654",
   "assemblyId": "42ecbe49-0069-41f5-ac38-595b090c3d65",
   "assemblyName": "example3",
   "assemblyDescriptorName": "assembly::t_single::1.0",
   "intentType": "CreateAssembly",
   "intent": {
​      "assemblyName": "example3",
​      "descriptorName": "assembly::t_single::1.0",
​      "intendedState": "Active",
​      "properties": {
​         "data": "Example Data",
​         "deplomentLocation": "admin@local"
​      }
   },
   "processState": "Failed",
   "processStateReason": "Exception …",
   "processStartedAt": "2017-09-14T13:13:58.966Z",
   "processFinishedAt": "2017-09-14T13:13:59.616Z",
   "eventId": "11acf385-e6f9-41cf-9651-38dc3ed6a53a",
   "eventCreatedAt": "2017-09-14T13:13:59.616Z",
   "eventType": "ProcessStateChangeEvent"
}
```

### Field Details

| **Field**        | **Description**                                              | **Mandatory** |
| ---------------- | ------------------------------------------------------------ | ------------- |
| processId        | The id given to the process that was initiated by an Intent request | Yes           |
| assemblyId       | The TNCO internal id for the assembly instance associated with the process | Yes           |
| assemblyName     | The name of the assembly instance as supplied in the Intent request | Yes           |
| intentType       | The name of the intent type. The values correspond to the Intents described in the Managing Assembly section | Yes           |
| intent           | Contains details of the intent request supplied.           | Yes           |
| processState     | The processState may contain – "In Progress", "Completed" or   "Failed". | Yes           |
| processStartedAt | The data and time the process was started                    | Yes           |
| eventId          | The id of this event from the TNCO view point (each message will have a unique Id | Yes           |
| eventCreatedAt   | The date and time when the event happened from the TNCO viewpoint | Yes           |
| eventType        | Will always contain "ProcessStateChangeEvent"                | Yes           |

 
# ComponentStateChangeEvent

These events are sent when the root assembly changes state and when each of its associated resources successfully transitions to a new state.  In the event of a failure of the process no events will be sent.

### ComponentStateChangeEvent Examples

 First message sent indicating first component transitioning to the Installed State:

```
{
   "eventId": "901d4794-7734-4511-8e24-6035ee5cb22a",
   "eventCreatedAt": "2017-09-14T13:06:18.37Z",
   "rootAssemblyId": "e4c198d1-2dbb-4557-baae-b5891fa258cf",
   "rootAssemblyName": "example2",
   "resourceId": "7a03bc63-bccf-4731-b6b2-9389609d9fa5",
   "resourceName": "example2__A",
   "resourceManager": "test-rm",
   "deploymentLocation": "admin@local",
   "externalId": "06d20929-a1c0-44cf-8009-aee47bac3f99",
   "processId": "f4538d94-4c42-4b3b-993a-530f7862120f",
   "previousState": null,
   "newState": "Installed",
   "eventType": "ComponentStateChangeEvent"
}
```

The above message is an example of a resource transitioning to the Installed state.  The previous state is null indicating the resource did not exists before.

An event indicating the root assembly has transitions to Installed State: 

```
{
   "eventId": "33a63fca-2bed-49c3-8615-56e5b35aa3bb",
   "eventCreatedAt": "2017-09-14T13:06:18.572Z",
   "rootAssemblyId": "e4c198d1-2dbb-4557-baae-b5891fa258cf",
   "rootAssemblyName": "example2",
   "processId": "f4538d94-4c42-4b3b-993a-530f7862120f",
   "previousState": null,
   "newState": "Installed",
   "eventType": "ComponentStateChangeEvent"
} 
```

The example above will be sent when all resources associated with the root assembly have successfully transitioned to the Installed State.


### Field Details

| **Field**           | **Description**                                              | **Mandatory**                    |
| ------------------- | ------------------------------------------------------------ | -------------------------------- |
| eventId             | The internal Id generated by TNCO in response to an Orchestration Event request | Yes                              |
| eventCreatedAt      | The date and time when the event happened from the TNCO viewpoint | Yes                              |
| rootAssemblyId      | The internal TNCO id for the root assembly instance         | Yes                              |
| rootAssemblyName    | The name of the root assembly as supplied in the Intent request | Yes                              |
| resourceId          | The id of the resource as defined by TNCO                   | No   (used for resources only) |
| resourceName        | The name of the resource as defined by TNCO                 | No   (used for resources only) |
| resourceManager     | The name of the resource manager that manages the resource | No  (used for resources only)  |
| deploymentLocation  | The location that the resource manager was requested to install the resource | No  (used for resources only) |
| externalId          | The id of the resource as defined by the resource manager  | No  (used for resources only)  |
| processId           | The internal Id of the process created by TNCO to perform the state change. | No                               |
| previousState **‡** | The state that the assembly or component was in before the state change happened. Allowed values: Installed, Inactive, Active. When a Heal event has been requested, TNCO puts the component into the Broken state. This is a temporary state that is used to trigger the Heal processing. This will be set to "null" when the resource or assembly is transitioning t the Installed State | Yes                              |
| newState **‡**      | The state to which the assembly or component instance transitioned in the event of a successful state change or the state that would have resulted if a failure had not occurred. This will be "null" when the resource or assembly is being Uninstalled | Yes                              |
| eventType           | Expected value   ‘ComponentStateChangeEvent’                 | Yes                              |

‡ When TNCO is requested to heal a component, TNCO will indicate this with a set of state transitions from Active to Broken and then Broken to Inactive.
