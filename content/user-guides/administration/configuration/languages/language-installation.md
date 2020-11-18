---
title: Language Installation
weight: 20
---

The following steps explain how to alter the installation process to change the language files used by the Telco Network Cloud Orchestration (TNCO) User Interface.

# Installing a Locale

1. Follow the steps in [language overview](/user-guides/administration/configuration/languages/language-overview/#adding-locales-to-stratoss-lm) before doing the following.

2. When installing the `lm-configurator` helm chart you must include the following values:

```
    configurator:
      lmConfigImport:
        nimrod:
          alm.nimrod.localeLocation: /var/lm/locales
```

3. When installing the `lm-helm` helm chart you must include the following values so the ConfigMap with `locales.tar` can be loaded by TNCO:

```
    nimrod:
      app:
        config:
          localesConfigMap: lm-locales
```

4. Once TNCO has started you will be able to view the UI with the updated locales.



