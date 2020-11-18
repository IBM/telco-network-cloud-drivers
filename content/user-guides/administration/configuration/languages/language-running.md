---
title: Language Updates
weight: 30
---

The following steps explain how to change the language files used by the Telco Network Cloud Orchestration (TNCO) User Interface when it is running.

# Updating a Locale

1. Follow the steps in [translation overview](/user-guides/administration/configuration/languages/language-overview/#adding-locales-to-stratoss-lm) before doing the following.

2. Add the following configuration to [vault](https://vault.lm:32443/ui/) for `lm/nimrod`, changing the value of `alm.nimrod.localeLocation` to be the name of the theme to be used:

```
"alm.nimrod.localeLocation": "/var/lm/locales"
```

3. Create a values file with the following configuration:

```
    nimrod:
      app:
        config:
          localesConfigMap: lm-locales
```

4. Run a `helm upgrade` of the TNCO helm chart with the custom values file above.



