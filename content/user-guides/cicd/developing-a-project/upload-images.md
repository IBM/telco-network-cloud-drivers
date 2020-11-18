---
title: Uploading Images
weight: 60
---

## Objectives

Manage versions of all VNF or test software images in a general repository.  Making the images available in a formal manner to the CI/CD tools.

### Pre-requisites

* You are provided with the software images to upload on your local machine.

## Repository Structure

The image directory structure in the CI/CD nexus general repository is as follows:
```
.
├── raw
    └── vdus
        └── <vdu-name>
            ├── <image-name-version>.<type>
            ├── image-3.4.12.qcow2
            ├── image-3.4.00.tar			
			
```
To upload an image into nexus:

  * Log into the Nexus repository UI
  * Check the image does not already exist under the image name. Assuming it required...
  * On the left nav-bar, select 'Upload'
  * Select 'raw' as the repository to upload to.
  * Select the image file from your local machine
  * Enter 'VDUs/\<vnfname\> in the 'Directory' field e.g. 'VDUs/myvnf'
  * press 'Upload'

You can also curl the images in, e.g.:  
```
  $ curl -v -u <username>:<password> --upload-file ./image-3.4.12.qcow2 http://<hub_nexus_url>/repository/raw/vdus/firewall/image-3.4.12.qcow2
```
Load images into target VIM:

Follow instructions from the target VIM to load images, e.g. for 
[openstack](https://docs.openstack.org/ocata/user-guide/common/cli-manage-images.html)

```
  $ openstack image create --disk-format qcow2 --container-format bare \
  --public --file ./image-3.4.12.qcow2 image-3.4.12
```