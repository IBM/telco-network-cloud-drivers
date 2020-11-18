---
title: Finalize a Project
weight: 60
---

At this stage, you have created your NS and behaviour tests, and you are happy with the design. You can pull the project back to your local directory before pushing it to your GIT.


## Pull project to local directory
If you want to pull the design you have made in the ALM UI into your local project directory run the following command:
```
lmctl project pull dev
```
This will pull all NS artifacts you created in the designer out from your ALM development installation into your local directory.

## Commit, Create and Push Project to GIT
Ones you have pulled your design to your local directory you can push the design to the remote Git that you have setup for this project as follows (from the project directory)
### Commit and push the package

```
  $ git add .
  $ git commit -m 'NS design'
  $ git push
```

## Creating CI Pipeline
To learn how to setup a CI/CD pipeline for your VNF package, read

* [Create CI Pipeline](/user-guides/cicd/pipeline/create-ci-pipeline)
