---
title: Theme Updates
weight: 30
---

The following steps explain how to change the theme used by the Telco Network Cloud Orchestration (TNC-O) User Interface when it is running.

# Updating a Theme

1. Follow the steps in [theme overview](/user-guides/administration/configuration/themes/theme-overview/#changing-the-theme-of-the-stratoss-lm-ui) before doing the following.

2. Add the following configuration to [vault](https://vault.lm:32443/ui) for `lm/nimrod`, changing the value of `theme.name` to be the name of the theme to be used:

```
"alm.nimrod.theme.name": "mytheme"
```

3. Create a values file with the following configuration:

```
    nimrod:
      app:
        config:
          themesConfigMap: lm-themes
```

4. Run a `helm upgrade` of the TNC-O helm chart with the custom values file above.



