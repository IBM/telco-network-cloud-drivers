---
title: Updating a package
weight: 110
---

## Objectives

* Update a VNF or NS Project after Release

* One a version of a project has been packaged and released it cannot be updated. A new version must be created and tested.

### Pre-requisites

* Existing package

* New package

## Update Project to next version

 In the case where you want to update the last version:

 1. Checkout the project on the develop branch
 2. Edit the projects descriptor (VNF or NS) to increment the version
 3. Edit the the Behaviour test template for the NS or VNF being tested to the new version
 4. make changes to your project for the update.
 5. Ideally add a test to upgrade from the old to the new version
 6. Check the tests all work in your dev env
 7. Commit all changes on develop branch
 8. merge into master and push to origin - this will trigger the CI job on the hub.


## Update/Patch a previous version of the project

 In this case you want to update an existing version, which may not be the latest version (e.g you have released 1.0 and 2.0, but now you find you must fix 1.0, for this you create a 1.0.1 version)

 1. Checkout the tag for the version you must update and create a branch 'fix-[tag]' (don't give the branch the exact same name as the tag.
 2. Edit the version in the descriptor and tests.
 3. make the changes
 4. Check the tests all work in your dev env
 5. In Jenkins add this branch to to the integration pipeline:
 6. In 'Branches to Build, add branch and enter "*/fix-1.0.1" (or whatever you named your branch)
 7. Save the changes
 8. Push your branch to gogs (e.g. git push origin master fix-1.0.1) this should now trigger the release pipeline

 Now test and release this version of the package.

 