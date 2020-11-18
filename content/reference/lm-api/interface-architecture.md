---
title: Interface Architecture
weight: 100
---

The Telco Network Cloud Orchestration (TNCO) API is responsible for interactions with the operations available from TNCO.

# API Interaction Principles

Each of the major components within TNCO have been built as micro-services using HTTP as the transport mechanism for requests and responses.

The TNCO API uses a combination of REST style interfaces and RPC interfaces.

The RPC-style interface is used to submit Intents to TNCO. All other interfaces use a REST-style.

Because the TNCO API has been designed to provide a combination of REST and RPC interfaces it does not always conform to all the details of the [IETF  RFC 7231](https://tools.ietf.org/html/rfc7231) specification. However, it is our stance that the TNCO API adheres to the spirit of the IETF recommendations.

Unless detailed otherwise, all the message descriptions are in JSON format and should be submitted with the HTTP content-type header of “application/json”.

All Dates will conform to the ISO-8601 standard.

# Supported Methods

Each API Service Endpoint can potentially implement a different set of HTTP request methods. The methods generally supported within TNCO are:

| Method        | Description |
|----------------------|----------------------------------------------------------|
| **GET**        | The GET method requests a representation of the specified resource. Requests using GET only retrieve data and have no other effect. |
| **PUT**    | The PUT method requests that the enclosed entity be stored under the supplied URI. If the URI refers to an existing resource, it is modified; if the URI does not point to an existing resource, then the request will be rejected. |
| **POST**   | The POST method requests that the server accept the entity enclosed in the request as a new instance of the resource identified by the URI |
| **DELETE** | The DELETE method simply removes the specified resource (if it exists). |


# 	API Versioning

Currently the TNCO API does not support API versioning and has no plans to do so.

As far as possible and for as long as possible the API will be maintained to be backwards-compatible.

# Possible HTTP error response codes

The following is a table of HTTP response codes that can be returned in various error scenarios. Any client should expect that any API call can return these codes under exceptional circumstances
 

| **Code**                           | **Description**                                              |
| ---------------------------------- | ------------------------------------------------------------ |
| **400 – Bad Request**              | The request contained   invalid information. This may be an incorrect field, invalid value or an   inconsistent state on a dependent resource. The HTTP response body should   contain a JSON message with further details of the specific issue. |
| **401 – Not Authorized**           | The   user or Client making the API request is not authorized to do so. Check the   role configuration of the user/Client who is making the request |
| **404 – Not Found**                | The requested endpoint   could not be found.                or   Requested Entity cannot be   found |
| **409 - Conflict**                 | TNCO has been unable to process the request due to a   conflict produced by some of the information supplied. For example, attempting   to create two Resource Managers with the same name. |
| **415 – Unsupported Media   Type** | The HTTP request payload   has a Content-Type that is not supported by the TNCO API. |
| **500 – Internal Server   Error**  | An internal error has occurred whilst fulfilling the   request. The HTTP response body should contain a JSON message with further   details. In some situations, it may be necessary for a system administrator   to consult the logs for further information. |
| **502 – Bad Gateway**              | A remote system has failed   to respond correctly causing this request to fail. The HTTP response body   should contain a JSON message with further details. In some situations, it   may be necessary for a system administrator to consult the logs for further   information. |
| **503 – Service Unavailable**      | TNCO is unable to process this request at this time.   The request should not be retried until   the underlying problem is resolved. The   HTTP response body should contain a JSON message with further details. In   some situations, it may be necessary for a system administrator to consult   the logs for further information. |



# Error Responses
 

## TNCO Generated Error

 All the API calls described in this specification will return the following information in the Response Body when an error is encountered (e.g. for a 40x, 50x Response Code):

```
{
  "details": {},
  "localizedMessage": "string",
  "url": "string"
}
```

Response Body content type:             application/json

**Response properties**

| **Property Name** | **Description**                                              | **Mandatory** |
| ----------------- | ------------------------------------------------------------ | ------------- |
| details           | Any additional   information related to the error that may be useful during debugging | Yes           |
| localizedMessage  | The most user-friendly   description of the error that has occurred | Yes           |
| url               | the URL of the root cause   of the problem or null if unknown | No            |

 

A more fully populated TNCO generated error report would look like this:

```
{
  "url": /api/resource-manager/configuration/923227664489862,
  "localizedMessage": "A FATAL TNCO Driver error has occurred: Unknown Resource Manager 923227664489862",
  "details": {
    "responseHttpStatus": 500,
    "errorStatus": "FATAL",
    "responseData": {
      "url": "http://galileo:8283/api/topology/resource-managers/923227664489862";,
      "localizedMessage": "Unknown Resource Manager 923227664489862",
      "details": {}
    }
  }
}
```

More than one set of error details may be included. These will show the errors generated by components internal to TNCO and passed back through the layers of requests that were made.

If a support call becomes necessary, please include all the information from any TNCO generated error reports as this greatly assists with tracking down the root cause of the problem.

## Non-TNCO Generated Error


Very rarely an error may occur within TNCO that for whatever reason cannot be handled gracefully and for which a TNCO specific error response is not available. 

These errors look like this:

```
{
  "timestamp": "2017-08-10T15:28:19.586+0000",
  "status": 500,
  "error": "Internal Server Error",
  "exception": "org.springframework.web.client.ResourceAccessException",
  "message": "I/O error on GET request for \"http://9.20.64.abc:8295/api/resource-manager/configuration\": 9.20.64.abc; nested exception is java.net.UnknownHostException: 9.20.64.abc",
  "path": "/api/resource-managers"
}
```

**Response properties**

| **Property Name** | **Description**                                              | **Mandatory** |
| ----------------- | ------------------------------------------------------------ | ------------- |
| timestamp         | The date and time to   error occurred.                       |               |
| status            | The HTTP status code   returned                              |               |
| error             | A textual description of   the HTTP status code returned     |               |
| exception         | The internal Exception   type that was raised.               |               |
| message           | The actual error reported                                    |               |
| path              | If it was an API call or   web service request that failed, then this field will identify what was being   requested. |               |



# HTTP STATUS CODE USAGE

Within the header of the HTTP response received in reply to an HTTP request there is a 3-digit decimal status code. The first digit of the status code specifies one of five standard classes of responses.
 

*           1xx Informational responses (not used explicitly by TNCO)
*           2xx Success
*           3xx Redirection (not used explicitly by TNCO)
*           4xx Client errors
*           5xx Server errors


The distinction between the HTTP 4xx and 5xx code is intended to make integration easier. An HTTP 404 status code basically means “I cannot find what you are asking for”. An HTTP 400 status code means “The service exists but you have not sent it the information it needs/recognizes” so you have successfully connected with the API end-point and sent it a request but the request itself was not understood. Finally, an HTTP 500 status code means “I understand what you have asked me to do but for some reason I am unable to do it”.


## 2xx Status Codes

This class of status codes indicates the action requested by the client was received, understood, accepted, and processed successfully.

Different TNCO components return different HTTP 2xx status codes dependent on the nature of the request made. To find out which HTTP 2xx status codes will be returned please refer to the individual microservice API guides
 

## 4xx Status Codes

This class of status code is intended for situations in which the error seems to have been caused by the client/user. A client can also mean another system that is sending a request into TNCO.

To understand how the different HTTP 4xx status codes are used we need to separate the definition of a Service Endpoint from the data it is being asked to use.

Our definition of the Service Endpoint is:

*           The full path to the Service required excluding any variable parameters in the URL.


Given this request:
```
http://<hostname>:<Port>/api/resource-manager/configuration/9.20.64.abc 
```
The Service Endpoint is:
```
http://<hostname>:<Port>/api/resource-manager/configuration
```
All **POST** requests will send their data in the body of the HTTP request.

All **GET** and **DELETE** requests will send their data as variable URL parameters.

All **PUT** requests will send their data as variable URL parameters and/or as data in the body of the HTTP request.

## HTTP 400 vs 404 Statuses
 
Within TNCO the handling of HTTP 400 & 404 status codes varies depending on what type of request was made.

Generally, the 4xx HTTP Status codes will be produced by the TNCO functionality concerned with validating and verifying the incoming requests.

This table summarizes the internal “rules” StartOSS TNCO uses regarding when to return an HTTP 400 vs 404 status code:
 

| **Type** | **URL Invalid** | **URL (with variables) refers to an Entity   that does not exist** | **Invalid Body Content** | **Body refers to an Entity that does   not exist** |
| -------- | --------------- | ------------------------------------------------------------ | ------------------------ | -------------------------------------------------- |
| **REST** | 404             | 404                                                          | 400                      | **N/A**                                            |
| **RPC**  | 404             | **N/A**   Has no URLs pointing to Entities                   | 400                      | 400                                                |


### REST-style Requests

An HTTP 404 will be returned if the entire requested Service URL (including any variable parameters) does not exist. This could be for one of the following reasons:

1.         The Service Endpoint requested does not exist or is not available (check your host name and ports).
2.         The requested resource (as identified by the URL variable parameters) does not exist.

The HTTP 400 status code (Bad Request) is used by the REST-style requests if the POST or PUT contains bad data. For example, if TNCO is given a Descriptor that it does not recognize or is unable to use.

 

### RPC-style Requests 

An HTTP 404 will be returned if the requested Service Endpoint does not exist.

An HTTP 400 will be returned if there is incorrect content in the request body sent to the Service Endpoint.

## HTTP 409 Status

The HTTP 409 status code (Conflict) indicates that the request could not be processed because of conflict in the request, such as the requested resource is not in the expected state or the result of processing the request would create a conflict within the resource.

Examples of where an HTTP 409 status code would be used within TNCO are: 

*                  Data constraint violations
*                  Concurrent modification exceptions.

## HTTP 5xx Status

Response status codes beginning with the digit "5" indicate cases in which TNCO is unable to perform the request/action that has been submitted.

It indicates that something internally within TNCO has prevented execution of the request, but that there was nothing syntactically wrong with the request itself. That is, the request is syntactically correct, all the mandatory parameters have been provided and have passed basic validation checks. 

To put it another way the API service is saying:

> “I understand what you have asked me to do and you have provided me with all the information I need/expect but I am unable to do what you have requested.”

The most usual case will be a simple HTTP 500 status code backed up with a JSON payload in the response body. This payload will contain a human-readable error message summarizing the problem and a section containing further technical details if available.

# API Sections

 The API is divided into four sections.  These provide access to the different functionality provided by TNCO. This API is expected to be called by external OSS systems to perform both fulfillment tasks and some fault management tasks.

## Assembly Orchestration

 TNCO allows the creation of Assemblies.  These allow services to be created by TNCO which will interact with resource managers to create and manage virtual resources that need to be provided for the service to work.

This part of the API includes two endpoints; the first allows the External OSS system to request a transition against an assembly instance, including a requesting for a new assembly instance.  The second allows the External OSS to poll TNCO to find out the state of the request.

## Asynchronous Events

In response to Assembly Orchestration requests, TNCO will also place on a Kafka bus messages that describe the key events that occur during the processing of the request and also a message to indicate when the processing has been completed.  It is recommended that the External OSS use this mechanism to check the state of requests rather than using the polling interface defined in the previous section.

## Assembly Topology

External OSS may need details of the assembly instances and of the components that it is comprised.  The topology contains a hierarchy of the components of an assembly.  A component may be either a resource or an assembly.  It is also possible to request details of the events used during the assembly’s life.

## Resource Manager Handling

Resource Managers are responsible for managing the actual resources that needed for a service to work.  TNCO needs to be told which resources managers it will interface to.  This process is known as 'Onboarding a Resource Manager'.  The TNCO API provides a set of calls that allows a new resource manager instance to be onboarded to TNCO, and also removed from TNCO.  When a resource manager is onboarded the set of resource types and locations that they manager will be extracted using the Resource Manager API.  The API also provides an endpoint that will make TNCO request the associated resource manager for a set of updated resources.  Any existing resources will remain unchanged when this update occurs.


# Supported Media Types

The media types supported by the TNCO API are:

*       application/hal+json
*       application/octet-stream
*       text/plain
*       application/xml
*       text/xml
*       application/x-www-form-urlencoded
*       application/*+xml
*       multipart/form-data
*       **application/json**
*       **application/\*+json**

In most cases using JSON to supply information as part of an API request is the preferred option.
