---
title: Install Error Links
weight: 90
---

Direct links to a logging dashboard can be enabled in the Telco Network Cloud Orchestration (TNCO) User Interface. This is an optional feature that will generate a link to a relevant search in a logging dashboard based on any error that has occurred in an assembly instance. The link displays like this:

{{%note %}}
NOTE: The only logging dashboard this feature currently supports is Kibana.
{{%/note %}}

## Enabling the dashboard links during TNCO installation

1. Create a values YAML file the following content in order to enable the logging dashboard:  
```
    configurator:
        loggingDashboard:
            enabled: true
            ## The domain used to connect to the logging dashboard UI
            endpoint: http://kibana.lm:31001
            ## Chosen logging dashboard name (currently only 'kibana' is supported)
            application: kibana
            kibana:
                ## Name of index to be created in kibana
                index: lm-logs
                ## Kibana service API endpoint that will be used to create the index
                configurationEndpoint: http://foundation-kibana:443
```

2. Use the values file when installing the lm-configurator helm chart.

Continue to [Install TNCO](/installation/lm/production/install-lm).