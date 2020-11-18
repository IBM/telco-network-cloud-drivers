---
title: Assembly Configurations
weight: 20
---

Assembly configurations are pre-configured instances of a VNF/Network Service you will make use of in your scenarios. They hold a reference to an assembly descriptor you wish to create and the values to set on the properties of that descriptor. Essentially they are re-usable plans for creating an instance of an assembly at a later time. 

In your scenarios you will select the assembly configurations to be used. As the scenario begins, the instances will be created based on the planned configuration, then as the scenario completes they may be optionally uninstalled to keep the environment clean for the next execution. 

# Create an Assembly Configuration

![Assembly Configuration](/images/user-guides/behaviour-testing/assembly-configuration.png "Assembly Configuration")

To create a test assembly click the "Create Assembly Configuration" button. This opens up a new screen that allows you to select the assembly you want to use, and provide a name and description. Once you select the assembly descriptor, the properties for it are shown within the same popup window, giving you the chance to set values for them (or leave to make use of the defaults).

![Create Assembly Configuration](/images/user-guides/behaviour-testing/create-test-assembly.png "Create Assembly Configuration")

Click "Save" to finish creating the configuration.

# Modifying Assembly Configurations

You may change the descriptor or properties on an assembly configuration by opening the actions menu and selecting "Edit":

![Edit Assembly Configuration](/images/user-guides/behaviour-testing/edit-or-delete-assembly-configuration.png "Edit Assembly Configuration")

{{%note %}}
NOTE: changes made to a configuration will affect the next execution of any scenario which includes it.
{{%/note %}}

# Removing Assembly Configurations

You may remove an assembly configuration by opening the actions menu and selecting "Delete":

![Delete Assembly Configuration](/images/user-guides/behaviour-testing/edit-or-delete-assembly-configuration.png "Delete Assembly Configuration")

{{%note %}}
NOTE: removing an assembly configuration will cause any scenarios using it to no longer be valid. These scenarios must be updated to remove the usage of the deleted configuration before they may be executed again.
{{%/note %}}
