---
title: Installing ALM
weight: 40
---

This section assumes you have followed the configuration steps and now have:

- a **helm-foundation** Helm chart
- an **lm-configurator** Helm chart
- an **lm-helm** - Helm chart
- a custom values YAML file

# Installing with Helm

You can now install the various LM Helm charts in the order listed above, using the `helm install` command

```
helm install <your-helm-chart> --name <your-release-name> --namespace <your-namespace> -f <your-custom-values-file> -f <your-additional-flavour-files>
```

- `cicdhub-helm-chart` - path to the Helm chart
- `your-release-name` - unique name used to identify this installation in Helm
- `your-namespace` - Kubernetes namespace to install into (leave out to use default). This namespace must be repeated for all 3 helm installs.
- `your-custom-values-file` - path to the YAML file created with any configuration overrides (if you have any)
- `your-additional-flavour-files` - path to the YAML file created with any configuration overrides (if you have any). The same flavour must be repeated for all 3 helm installs.

This should be done as follows:

## Foundation Install

Install helm-foundation first.

For example, to install with a namespace of lm and a flavour of Basic HA:

```
helm install helm-foundation-2.0.3-45.tgz --name foundation --namespace lm -f custom-values.yaml -f ./flavours/ha/ha-values.yaml
```

Now check the status of the pods. If you have `kubectl` installed you can use the `get pods` commands:

```
kubectl get pods

NAME                                                    READY     STATUS      RESTARTS   AGE
foundation-cassandra-0                                  1/1       Running     0          11m
foundation-elasticsearch-client-7bf56fd98-f5th8         1/1       Running     0          11m
foundation-elasticsearch-data-0                         1/1       Running     0          11m
foundation-elasticsearch-master-0                       1/1       Running     0          11m
foundation-elasticsearch-master-1                       1/1       Running     0          10m
foundation-filebeat-xbxh2                               1/1       Running     0          11m
foundation-kafka-0                                      1/1       Running     0          11m
foundation-openldap-585489f595-4gf28                    1/1       Running     1          11m
foundation-vault-7c96bfdf6d-7nthc                       1/1       Running     0          11m
foundation-vault-init-rsh7c                             0/1       Completed   0          11m
foundation-zookeeper-0                                  1/1       Running     0          11m
```

Once the installation of Foundation is complete, you can proceed to the installation of lm-configurator.

## LM Configurator Install

Next, install LM Configurator.

For example, to install with a namespace of lm and again using the flavour of Basic HA:

```
helm install lm-configurator-2.0.3-50.tgz --name lm-configurator --namespace lm -f custom-values.yaml -f ./flavours/ha/ha-values.yaml
```

Now check the status of the running lm-configurator job and wait for it to show as completed.

```
NAME                                                    READY     STATUS      RESTARTS   AGE
lm-configurator-qw5wd                                   0/1       Completed   0          10m
```

Once this is complete, proceed to the installation of LM

## LM Install

Finally, the LM Helm chart can be installed.

For example, to install with a namespace of lm and again using the flavour of Basic HA:

```
helm install lm-helm-2.0.3-208.tgz --name lm --namespace lm -f custom-values.yaml -f ./flavours/ha/ha-values.yaml
```

Monitor the status of the pods, waiting for the `ishtar` and `nimrod` pods to show as ready:

```
NAME                                                    READY     STATUS      RESTARTS   AGE
apollo-66485f5f6b-mknbw                                 1/1       Running     0          21m
conductor-0                                             1/1       Running     0          21m
daytona-844fcdd94f-zxhp7                                1/1       Running     0          21m
galileo-0                                               1/1       Running     0          21m
ishtar-659b695bbf-xxlxf                                 1/1       Running     0          21m
nimrod-5f5f5cfb44-hd7hn                                 1/1       Running     0          21m
relay-545cccc7c7-2z8qp                                  1/1       Running     0          21m
simple-rm-74dfd46cb9-wcgl6                              1/1       Running     0          11m
talledega-7c69b75c7b-dq8df                              1/1       Running     0          21m
watchtower-5f6b7f7fb7-2mb4b                             1/1       Running     0          21m
```

Once all pods are shown with at least one ready instance, you may continue to [Accessing Services](#accessing-services)

# Accessing Services

Be sure to update any ports, hostnames, usernames and passwords shown if you provided overrides in your `custom values` file.

## LM 

### No Host

If you kept the `noHost` Ingress rules enabled for LM, then the UI and API will be accessible at:

- UI - https://<your-host-ip>:32443/ui (non-secure http://<your-host-ip>:32080/ui)
- API - https://<your-host-ip>:32443 (non-secure http://<your-host-ip>:32080)

The ports shown above are the default for the Ingress controller installed as part of LM, so adjust them if you configured alternative values. 

### Host Based 

If you have kept the `host` Ingress rule enabled, then the UI and API will also be accessible at:

- UI - https://ui.lm:32443/ui (non-secure http://ui.lm:32080/ui)
- API - https://app.lm:32443 (non-secure http://app.lm:32080)

As Ingress uses the hostname to route traffic to the desired service, you will need to either:

- add the hostname(s) to your hosts file
- configure a proxy (such as Apache2) to route traffic to the target Kubernetes ingress controller
- configure a nameserver to route traffic targeting the hostname(s) to your Kubernetes cluster

#### Update Hosts File

Adding hostnames to your hosts file is an easy way to get started but is not suitable long term as this will need to be repeated on every machine that will access the Hub.

If you'd like to configure access to Ingress routes this way, then add the following to your hosts file:

```
<your-host-ip-address>      ui.lm app.lm vault.lm
```

You may now access the UI at `https://ui.lm:32443` and Gogs at `https://app.lm:32443`.

#### Proxy with Apache2

If you have an available Apache2 server (or can install one) then it's possible to make the Ingress hosts available through an IP address.

You will need to add the Ingress hostnames to the hosts file of the machine running Apache2, see [Hostfile](/installation/lm/production/install-lm/#update-hostfile).

Create a site configuration file:

```
touch /etc/apache2/sites-available/lm.conf
```

Add the following configuration to the file, updating the Ingress hostnames and ports if overridden. Replace `<your-lm-ui-proxy-port>`, `<your-lm-api-proxy-port>` with desired ports for your instances.

```
Listen <your-lm-ui-proxy-port>
<VirtualHost *:<your-lm-ui-proxy-port>>
    SSLProxyEngine On
    SSLEngine On
    # Set the path to SSL certificate
    SSLCertificateFile /etc/apache2/ssl/ca.crt
    SSLCertificateKeyFile /etc/apache2/ssl/ca.key
    ProxyPass / https://ui.lm:32443/
    ProxyPassReverse / https://ui.lm:32443/
</VirtualHost>

Listen <your-lm-api-proxy-port>
<VirtualHost *:<your-lm-api-proxy-port>>
    SSLProxyEngine On
    SSLEngine On
    # Set the path to SSL certificate
    SSLCertificateFile /etc/apache2/ssl/ca.crt
    SSLCertificateKeyFile /etc/apache2/ssl/ca.key
    ProxyPass / https://app.lm:32443/
    ProxyPassReverse / https://app.lm:32443/
</VirtualHost>
```

Add the site to Apache2 (you may need to reload the Apache2 service for the changes to take affect):

```
a2ensite lm.conf
```

You may now access the UI at `http://<apache2-server-ip>:<your-lm-ui-proxy-port>` and the API at `http://<apache2-server-ip>:<your-lm-api-proxy-port>`.

### First login 

After the hostnames have been registered visit `http://<your-host-ip>:32443/ui` in a supported browser to access the UI.
{{%note %}}
NOTE: the port used is the NodePort of the ingress controller.
{{%/note %}}
   
The default username and password for UI access is:
   
* Username: `Jack`
* Password: `jack`
   
The default client credentials for API access is:
   
* ClientId: `LmClient`
* Secret: `pass123`

## Vault

To modify or inspect system configuration, access the Vault UI at `https://vault.lm:32443`. As mentioned in [accessing LM](#lm), Ingress uses the hostname to route traffic to the desired service, so you will need to either add the hostname to your hosts file or configure a proxy/nameserver to route traffic to it.

The configured access token will be needed to login to Vault. The value will be output within the logs of the vault-int job, and can be found by inspecting them, for example (replace with correct name of vault-init pod):

```kubectl logs foundation-vault-init-8fkvg```

This will reveal the configured access token at the end of the log statements, e.g. 

```Vault access token is: <vault token shown here>```

## Openldap

To view or configure available system users, access OpenLDAP by determining the randomly allocated NodePort and connecting via your chosen client software as described in this guide [Connecting to OpenLDAP](/user-guides/administration/security/manage-users/#connecting-to-openldap)

## Kibana

Kibana can be accessed at `http://kibana.lm:32080` (or `http://<your-host-ip>:31001` to use NodePort access).

As mentioned in [accessing LM](#lm), Ingress uses the hostname to route traffic to the desired service, so you will need to either add the hostname to your hosts file or configure a proxy/nameserver to route traffic to it.

