---
title: Scaling TNCO
weight: 80
---

The following guide explains how to prepare Telco Network Cloud Orchestration (TNCO) to scale with CPU usage.

# Pre-requisites:

- The [Kubernetes metrics server](https://kubernetes.io/docs/tasks/debug-application-cluster/resource-metrics-pipeline/#metrics-server) must be running in your Kubernetes environment for scaling of TNCO to work.

# Configure TNCO

TNCO services can be setup to scale from the point they are installed by setting some custom helm values. Each service has configurable options for resources and autoscaling thresholds.

Before running a [helm install of TNCO](/installation/lm/production/install-lm/#lm-install) you can create a custom values file with content like the following for each service:
```
<service name>:
  app:
    resources: 
      limits:
        cpu: <maximum CPU to allocate to pod>
        memory: <maximum memory to allocate to pod>
      requests:
        cpu: <initial CPU to allocate to pod>
        memory: <initial memory to allocate to pod>
    autoscaler:
      enabled: <boolean to enable/disable autoscaler>
      maxReplicas: <maximum pods service can scale up to>
      minReplicas: <minumum pods service can scale down to>
      targetCPUUtilizationPercentage: <percent of CPU to trigger scaling>
```
For example if you wanted Apollo to automatically scale you could add this to a custom values file:
```
apollo:
  app:
    resources: 
      limits:
        cpu: 500m
        memory: 4Gi
      requests:
        cpu: 200m
        memory: 2Gi
    autoscaler:
      enabled: true
      maxReplicas: 5
      minReplicas: 1
      targetCPUUtilizationPercentage: 80
```

When `resources` are set and the `autoscaler` is enabled for a service then a [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) will be created for that service.

You can inspect your Horizontal Pod Autoscalers by running:
```
kubectl get hpa
```

{{%note %}}
NOTE: the names of TNCO services can be viewed by inspecting Kubernetes deployments (kubectl get deployments)
{{%/note %}}

Continue to [Installing Error Links](/installation/lm/production/configuration/error-links-install).