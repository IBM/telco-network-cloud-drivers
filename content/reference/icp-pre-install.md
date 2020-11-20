---
title: ICP Advice
weight: 0
---

# ICP Pre-Install Considerations

This section details topics that should be considered when installing the CI/CD Hub and/or Telco Network Cloud Orchestration (TNC-O) to ICP.

# Helm

Install the Helm client using the [ICP instructions](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.3/app_center/create_helm_cli.html).

{{%note %}}
NOTE: when using Helm with ICP you may need to include the `--tls` options for all Helm commands.
{{%/note %}}

# Pod Security Policy

If you are installing [CI/CD Hub](/installation/cicdhub/cicd-hub-start.md) or [Telco Network Cloud Orchestration (TNC-O)](/installation/lm/alm-start/) on ICP, you should do so in a namespace that is bound to a less restrictive Pod Security Policy. We recommend creating a new namespace and binding it to an existing policy called `ibm-anyuid-psp`. This can be done through the ICP dashboard, see [ICP - Create a namespace with pod security policy binding](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_3.1.2/user_management/create_namespace_pspbind.html) for more details.

# Docker Images

To pull docker images from Docker Hub and/or docker registries you may need to add an `ImagePolicy`to the namespace you plan to install in (or a ClusterImagePolicy to apply the rules across the cluster).

The policies can be added through the ICP dashboard, see [ICP - Image Security](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_3.1.2/manage_images/image_security.html) for more details.


