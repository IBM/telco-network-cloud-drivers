---
title: Onboarding
weight: 40
---

# Onboard Drivers

You can onboard drivers with the `resourcedriver add` command from [LMCTL](/reference/lmctl) v2.1+. Read more about all the commands from [LMCTL resourcedriver command reference](https://github.com/accanto-systems/lmctl/tree/master/docs/command-reference/resourcedriver)

Drivers by default run with SSL enabled and need to be onboarded with an SSL certificate that allows Brent to communicate with them. To retrieve the SSL certificate for a deployed driver (in base64-encoded PEM format), run the following command:

```
kubectl get secret <secretName> -o 'go-template={{index .data "tls.crt"}}' | base64 -d > <secretName>.pem
```

Where `<secretName>` is the name of the secret holding the SSL certificate for the driver, as show in the table below:

| Driver     | SSL Secret     |
|------------|----------------|
| Ansible    | ald-tls        |
| Openstack  | ovd-tls        |
| Kubernetes | kubedriver-tls |

And `<secretName>.pem` is the local file in which you store the driver's certificate. 

Use this file name again as the `--certificate` parameter for `lmctl` onboarding commands. Ensure the `--type` assigned is the same as the `infrastructure-type` in your resource package. The `--url` must be a valid endpoint that is reachable from your installation of [Brent](/installation/resource-manager/rm-overview/#brent); in a Kubernetes cluster you can use the internal service name and port:

```
lmctl resourcedriver add --type openstack --url https://os-vim-driver:8292 dev-env --certificate ovd-tls.pem
```

```
lmctl resourcedriver add --type ansible --url https://ansible-lifecycle-driver:8293 dev-env --certificate ald-tls.pem
```

```
lmctl resourcedriver add --type kubernetes --url https://kubedriver:8294 dev-env --certificate kubedriver-tls.pem
```

Drivers can be removed at a later time with the `delete` commands:

```
lmctl resourcedriver delete --type openstack dev-env
```


# Next Steps

You should now have an understanding of Resource packages and drivers. You should also have an understanding of how to install and onboard drivers for usage in your environment.

Now is a great time to run through an example of creating a Resource and using it as part of an Assembly in TNC-O. See the [example resource](/user-guides/resource-engineering/example-resource/get-started).