---
title: Themes Overview
weight: 10
---

Changing the look of the Telco Network Cloud Orchestration (TNCO) User Interface UI is supported via _Theme Packages_. A theme can be provided for each unique look that is needed for the TNCO UI.

# Changing the Theme of the TNCO UI

1. To change the theme of the UI you need to produce a `theme.tar` containing the necessary elements. The TAR should include a directory for each potential theme. Each theme is represented by a directory which should include the favicon, stylesheet and images to be used:

```
+-- mytheme (change to your Theme name)
|     +-- favicon.ico
|     +-- theme.css
|     +-- images (directory)
|         +-- image-file-1.png
|         +-- image-file-2.png
|         +-- <etc. rest of the image files>
+-- myothertheme (change to any other Theme names)
      +-- favicon.ico
      +-- theme.css
      +-- images (directory)
          +-- <etc. rest of the image files>
```

2. Produce a TAR called `theme.tar` (this name is **mandatory**) using the `tar` command, including each Theme directory:

```
tar -cvzf theme.tar mytheme myothertheme
```

3. The `theme.tar` must be loaded into your Kubernetes environment by creating a ConfigMap.

```
kubectl create configmap lm-themes --from-file theme.tar
```

4. The theme can be enabled [during TNCO installation](/user-guides/administration/configuration/themes/theme-installation/) or for an [already running TNCO](/user-guides/administration/configuration/themes/theme-running/).