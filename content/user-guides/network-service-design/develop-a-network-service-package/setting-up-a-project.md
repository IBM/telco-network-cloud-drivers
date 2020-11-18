---
title: Setting up a project
weight: 30
---

The first step in developing a Network Service (NS) is to create a NS project.

## Create NS Project

On your local environment, you create a NS project by running the following [LMCTL command](/reference/lmctl) in the folder you want the NS to be created in:

```
lmctl project create --name myvns --version 0.1 --servicetype NS ./myns
```

{{%note %}}
NOTE: The name should NOT contain '-' as a separator in the name (this is not a restriction on Agile Lifecycle Manager (ALM), but simplifies pipeline automation later).
{{%/note %}}

This creates a NS directory structure for the NS. The result of this is a NS directory structure that is created that should look like this:

```
├── Descriptor
│   └── assembly.yml
├── Behaviour
│   └── Runtime
│   └── Templates
│   └── Tests
└── lmproject.yml
```

### Project structure explanation

#### Directory structure

A top level project structure can have the following artifacts:

| Directory               | Required | Description                                                                                                                                                                    |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Descriptor**          | Yes      | This directory must contain a descriptor file called **"assembly.yml"**, representing the top level Network Service. The descriptor is pushed to ALM during onboarding |
| **Behaviour**           | optional | This optional directory contains the Assembly Templates and Scenarios used by the test scenarios                                                                               |
| **Behaviour/Tests**     | optional | This optional directory contains the Test Scenarios. These are pushed to ALM automatically during on boarding                                                          |
| **Behaviour/Templates** | optional | This optional directory contains the Assembly Templates. These are pushed to ALM automatically during onboarding                                                       |
| **Behaviour/Runtime**   | optional | This optional directory contains the Runtime Scenarios, such as Diagnostic tests. These are pushed to ALM automatically during on boarding                             |

#### lmproject File

Every project should include a `lmproject.yml` file at root that is automatically created when you create the project using LMCTL. This file will be automatically updated once you add elements and VNFs to the NS in the Designer, so there is no manual action needed for the NS lmproject.yml file.

## Commit, Create and Push Project to GIT

### Commit the project

```
  $ cd ./myvns
  $ git init
  $ echo "_lmctl"  > .gitignore
  $ git add .
  $ git commit -m 'initial project'
```

### Create the project on Git Server (Gogs)

Go to Gogs in the CI/CD hub.

- log in as admin
- create "+ New Repository" named the same as your local project (e.g. "myvns")
- select the organization (e.g. 'marketplace')
- Note the commands that Gogs gives you for 'Push an existing repository from the command line' and use them in the next step.

### Push project to Gogs

On your local machine:

```
  $ git remote add origin http://<gogs ip address>:8001/cicdhub-admin/myvns.git
  $ git push -u origin master
```

### Create git develop branch

```
  $ git checkout -b develop
```

- On Gogs, go to the project, select settings and collaboration
- 'Add New Collaborator' for jenkins and any user you wish to be able the make changes.
  You are now ready to start developing and testing your new project.

### Push Project to Dev Environment

The NS project needs to be pushed to the development environment. Run the following command in the project directory (assuming "dev" is the name of the environment you want to push the NS to):

```
  $ cd <myvns dir>
  $ lmctl project push dev
```

When you login to ALM and go to the Assembly Designer section, you should see an assembly with the project name you created.
