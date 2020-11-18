---
title: Error Responses
weight: 100
---

All the API calls described in this section will return the following information in the Response Body when an error is encountered (e.g. for a 404, 403, 500 Response Code):

```
{
  "details": {},
  "localizedMessage": "string",
  "url": "string"
}
```

**Response properties** 

| **Field**         | **Description** |
| ----------------- | ------------------------------------------------------------ | 
| details           | Any additional information related to the error that may be useful during debugging |
| localizedMessage  | User-friendly description of the error that has occurred | 
| url               | the URL of the root cause of the problem or null if unknown | 