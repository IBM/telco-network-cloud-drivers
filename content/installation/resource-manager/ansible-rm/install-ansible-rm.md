---
title: Install
weight: 100
---

This section assumes you have followed the configuration steps and now have:

- an Ansible RM Helm chart
- a custom values YAML file
- a target Kubernetes namespace with Telco Network Cloud Orchestration (TNC-O) installed

# Installing with Helm

Install the Ansible RM with the `helm install` command.

```
helm install <ansible-rm-helm-chart> --name <your-release-name> --namespace <your-namespace> -f <your-custom-values-file>
```

- `ansible-rm-helm-chart` - path to the Ansible RM Helm chart
- `your-release-name` - unique name used to identify this installation in Helm
- `your-namespace` - Kubernetes namespace with TNC-O already installed
- `your-custom-values-file` - path to the YAML file created with any configuration overrides (if you have any)

For example:

```
helm install osslm-ansible-resource-manager-1.3.6.tgz --name osslm-ansible-rm --namespace lm -f custom-values.yaml
```

Check the status of your installation with helm or kubectl:

```
helm status <your-release-name>
```

```
kubectl get pods -n <your-namespace>
```

Wait for the `osslm-ansible-rm` pod to be marked as ready.

# Accessing the Ansible RM

Once installation is complete the Swagger UI for the Ansible RM can be loaded in the browser at `https://<your-host-ip>:31081/api/v1.0/resource-manager/ui/` (if you changed the HTTPS node port then update the port in the URL to match the value set).

# Initialize Ansible RM Database

Before the Ansible RM can be used you must initialize the database tables. In your browser, navigate to the Swagger UI and expand the `driver additions` APIs. 

Execute the POST API named `/database` to initialize the database.

# Next Steps

Now that the RM is installed it needs to be added/registered to the Lifecycle Manager and Deployment Locations/VIMs need to be registered against the RM in TNC-O. [Register RM](/reference/resource-manager/attach-to-lm)

This will allow TNC-O to make API calls to the appropriate RM instance when seeking to perform Lifecycle Transitions or Operations against a given deployment location/VIM. It is possible to add as many RM instances as may be required by your deployment. 

