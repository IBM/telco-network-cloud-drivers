---
title: Enable Error Links
weight: 40
---

## Enabling the dashboard links for a running ALM

1. Add the following to the `nimrod` secret in [vault](https://vault.lm:32443/ui/vault/secrets/lm/show/nimrod):

```
  "alm.nimrod.loggingDashboard.application": "kibana",
  "alm.nimrod.loggingDashboard.enabled": "true",
  "alm.nimrod.loggingDashboard.endpoint": "http://kibana.lm:31001",
  "alm.nimrod.loggingDashboard.kibana.index": "lm-logs"
```

2. Create an index in Kibana named `lm-logs`

3. Delete the Nimrod pod
```
kubectl delete pod <nimrod pod id>>
```