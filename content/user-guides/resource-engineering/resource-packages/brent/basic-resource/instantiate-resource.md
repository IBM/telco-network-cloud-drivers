---
title: Instantiate Resource
weight: 50
---

## Push Resource

Push the Resource project to your [target environment](/reference/lmctl) with LMCTL
    
```
lmctl project push example-env
```

## Add Resource to design

Create a new Assembly in the Telco Network Cloud Orchestration (TNC-O) UI

![Create Assembly](/images/user-guides/resource-engineering/basic-resource/instantiate-resource/create-assembly.png "Create Assembly")

Open the Assembly design and click "Add Element" in the top right

Add an element using the hw-apache2 Resource descriptor now available in the environment

![Add Element](/images/user-guides/resource-engineering/basic-resource/instantiate-resource/add-element.png "Add Element")

Select the "apache2-service" node in the designer and open the right hand panel by selecting the menu icon in the top right

![Assembly Prorpeties](/images/user-guides/resource-engineering/basic-resource/instantiate-resource/assembly-properties.png "Assembly Properties")

Click "Add New Property" from the right hand panel to add a new `resourceManager` property

![Resource Manager Property](/images/user-guides/resource-engineering/basic-resource/instantiate-resource/resource-manager-property.png "Resource Manager Property")

Repeat step 5 to create a deploymentLocation property (set the default value to the name your intended deployment location)

![Deployment Location Property](/images/user-guides/resource-engineering/basic-resource/instantiate-resource/dl-property.png "Deployment Location Property")

Map the resourceManager and deploymentLocation property from the service node to the server Resource added earlier, by dragging from the blue connection point of the properties to the connection point of the same properties on the Resource node

![Connected Properties](/images/user-guides/resource-engineering/basic-resource/instantiate-resource/connected-properties.png "Connected Properties")

Save the design using the "Save" button in the top right

## Create Assembly

Navigate to "Recent Assembly Instances" and select "Create" in the top right. Give the new instance a name and select the "apache2-service" descriptor created earlier

![Create Instance](/images/user-guides/resource-engineering/basic-resource/instantiate-resource/create-instance.png "Create Instance")

Ensure the resourceManager property is set to brent and the deploymentLocation property is set to the name of your Openstack deployment location

![RM and Deployment Location properties](/images/user-guides/resource-engineering/basic-resource/instantiate-resource/create-instance-rm-props.png "RM and Deployment Location properties")

Review the settings and click "Create". Once the process has completed you will see the Resource has been created and assigned an internal and public IP

![Instance properties](/images/user-guides/resource-engineering/basic-resource/instantiate-resource/create-instance-resource-properties.png "Instance properties")

Open your Openstack dashboard to see the groups and compute instance created for this Resource

![Openstack instances](/images/user-guides/resource-engineering/basic-resource/instantiate-resource/openstack-instances.png "Openstack instances")

Uninstall the Assembly and wait for the infrastructure to be removed

## Next Steps

You have now successfully created an instance of a Resource with infrastructure. Continue reading to add [lifecycle scripts](/user-guides/resource-engineering/resource-packages/brent/basic-resource/add-lifecycle) to configure software through transitions.