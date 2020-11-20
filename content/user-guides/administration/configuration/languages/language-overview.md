---
title: Languages Overview
weight: 10
---

The Telco Network Cloud Orchestration (TNC-O) User Interface supports multiple languages via `translation.json` files. A translation file can be provided for each locale the user requires which contains mappings for all text within the TNC-O UI (see sample translation file below for reference).

{{%attachments title="Sample translation file" pattern=".*(json)"/%}}

# Adding Locales to TNC-O

1. To set the translations for each locale of the TNC-O UI you need to produce a `locales.tar` containing the necessary elements. The TAR should include a directory for each potential locale. Each locale is represented by a directory which should include the `translation.json` to be used. The name of the directory should match the ISO language code it targets ([ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), [ISO 3166-2 codes](https://en.wikipedia.org/wiki/ISO_3166-2)).

```
+-- en-GB
|     +-- translation.json
+-- en-US
      +-- translation.json
```

2. Produce a TAR called `locales.tar` (mandatory name) using the `tar` command, including each locales directory:

```
tar -cvzf locales.tar en-GB en-US
```

3. The `locales.tar` must be loaded into your Kubernetes environment by creating a ConfigMap.

```
kubectl create configmap lm-locales --from-file locales.tar
```

4. Multiple language support can be enabled [during TNC-O installation](/user-guides/administration/configuration/languages/language-installation/) or for an [already running TNC-O](/user-guides/administration/configuration/languages/language-running/).