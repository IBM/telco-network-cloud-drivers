---
title: Developing a Package
weight: 90
---

## Objectives

Develop VNF or Network Service project artifacts that, when complete, will constitute a releasable package.

### Pre-requisites

* CI/CD Hub and a development environment with a dedicated Agile Lifecycle Manager (ALM) and VIM
* A [VNF or Network Service project already exists](/user-guides/cicd/developing-a-project/create-new-vnf-project).

## Developing a VNF or Network Service Descriptor

Push your project into dev environment (assume this is called 'dev' in the LMCONFIG file for LMCTL):

```
$ cd <myvnf dir>
$ lmctl project push dev
```

Design the VNF or Network Service  Descriptor

- Log into the ALM UI
- Go to the 'Assembly Designer' and open the descriptor with your project name.
- **Select Add Element** and add resource elements that should be contained in your design. For a Network Service this can be VNFs or other Network Services. For VNFs this will be VNFCs/resource descriptors.  
- Edit the descriptors:
  - Properties
  - Property mappings
  - Relationships
  - Promoted operations
  - Policies
- Save your changes

### Developing VNFC/Resource Lifecycles 

These should be detailed in the VNF or NS design

For a VNF add VNFC artifacts

  * You need to add playbooks for each lifecycle operation of each VNFC that is in your design. Edit the playbooks in the package structure. Remove any that are not used.  
  * Add playbooks for any relationship operations on your VNFC in your design
  * Edit each VNFC descriptor with:
    * Properties
	* Lifecycle Operations
	* Relationship Operations
	* Metrics
	* Policies
    These should be detailed in the VNFC design

Commit changes to the develop branch as you go.

## Creating behaviour Tests

In the ALM designer, you can add Behaviour Tests to your project by performing the following tasks:

   * Design a behaviour test for the VNF or Network Services that installs it to it's active state. 
   * Now run the test above.
   * If the behaviour test is passing run the following commands on your local machine to export the behaviour test to your local machine, and add it to your git project:
      ```
	$ lmctl project pull dev
	$ git add .
	$ git commit -m 'Lifecycle Behaviour Test passed'
	 ```
	
  * If the test is failing, investigate the failure and fix.
  * Retest until all behaviour tests are passing

Push your project changes to the CI/CD Hub. You have now completed a basic VNF or Network Service set of steps. You know that it can be deployed and have tested it's lifecycle. 

```
  $ git push origin master develop
```

Now you have a VNF that can be installed and managed through it's lifecycle. You can add further tests to validate that it is all functioning correctly.


