---
title: Scale a Running TNCO
weight: 50
---

The following guide explains how to upgrade a running Telco Network Cloud Orchestration (TNCO) to scale with CPU usage.

## Pre-requisites:

- The [Kubernetes metrics server](https://kubernetes.io/docs/tasks/debug-application-cluster/resource-metrics-pipeline/#metrics-server) must be running in your Kubernetes environment for scaling of TNCO to work.

## Configure TNCO

Existing installations of TNCO can be scaled by adding an [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) via `kubectl`.  
For each service that you want to scale do the following:

1. Ensure that the service has resources set, you can do this by running:
```
kubectl describe deployment <service name>
```
If the deployment has resources set then you will see the following:
```
Containers:
  <service name>:
    ...
    Limits:
      cpu:     <maximum CPU to allocate to pod>
      memory:  <maximum memory to allocate to pod>
    Requests:
      cpu:      <initial CPU to allocate to pod>
      memory:   <initial memory to allocate to pod>
```

2. If there are `Limits` and `Requests` for your chosen service then skip to Step 3 otherwise in order to add these to a service you can add the following to a custom values file:
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
```
For example if you wanted to scale Apollo your custom values would look as follows:
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
```
And do a helm upgrade:
```
helm upgrade lm <helm chart> --values <custom values file>
```

3. Once your service has resources then you can create an autoscaler using a command like this:
```
kubectl autoscale deployment <TNCO service deployment> --min=<minimum pods> --max=<maximum pods> --cpu-percent=<cpu target percentage>
```
For example if you want to scale Apollo between 1 and 3 pods whenever a pod exceeds 80% CPU you would use this command:
```
kubectl autoscale deployment apollo --min=1 --max=3 --cpu-percent=80
```

4. You can inspect your Horizontal Pod Autoscalers by running:
```
kubectl get hpa
```

{{%note %}}
NOTE: the names of TNCO services can be viewed by inspecting Kubernetes deployments (kubectl get deployments)
{{%/note %}}