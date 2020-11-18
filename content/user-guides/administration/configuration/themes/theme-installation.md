---
title: Theme Installation
weight: 20
---

The following steps explain how to alter the installation process to change the theme used by the Telco Network Cloud Orchestration (TNCO) User Interface.

# Installing a Theme

1. Follow the steps in [theme overview](/user-guides/administration/configuration/themes/theme-overview/#changing-the-theme-of-the-stratoss-lm-ui) before doing the following.

2. When installing the `lm-configurator` helm chart you must include the following values, changing the value of `theme.name` to be the name of theme to be used:

```
    configurator:
      lmConfigImport:
        nimrod:
          alm.nimrod.theme.name: mytheme
```

3. When installing the `lm-helm` helm chart you must include the following values so the ConfigMap with `theme.tar` can be loaded by TNCO:

```
    nimrod:
      app:
        config:
          themesConfigMap: lm-themes
```

4. Once TNCO has started you will be able to view the UI with your chosen theme.