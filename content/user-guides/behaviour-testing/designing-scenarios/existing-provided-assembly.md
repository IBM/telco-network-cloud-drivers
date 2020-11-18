---
title: Existing Provided Assembly
weight: 0
---

The "Existing Provided Assembly" entry, found in the "Assembly Configurations" section of the scenario palette, is available to all scenarios. Adding it to the scenario will add an input property to the scenario, which must be set each time it is executed. 

The following guide shows you to use the "Existing Provided Assembly" configuration in your scenarios.

# Add Existing Provided Assembly

1. Add the "Existing Provided Assembly" entry by dragging it from the scenario palette into the "Assemblies" panel at the top of the scenario

    ![Add Existing Provided Assembly](/images/user-guides/behaviour-testing/designing-scenarios/existing-provided-assembly/add-existing-provided-assembly.png "Add Existing Provided Assembly")

2. Set the name of the input Assembly in the step. This name is of your choosing and is not supposed to match an existing Assembly. It is a reference to the Assembly which will be provided at runtime and used to refer to this Assembly throughout the scenario.

    ![Set Existing Provided Assembly Name](/images/user-guides/behaviour-testing/designing-scenarios/existing-provided-assembly/set-existing-provided-assembly-name.png "Set Existing Provided Assembly Name")

# Execute Steps Against Existing Provided Assembly 

You may reference the existing provided assembly in any steps requiring the name of an Assembly.

1. Add a step which requires an Assembly name. Set the name to the same value as your "Existing Provided Assembly" entry

    ![Refer to Existing Provided Assembly](/images/user-guides/behaviour-testing/designing-scenarios/existing-provided-assembly/refer-to-existing-provided-assembly.png "Refer to Existing Provided Assembly")

# Execute Scenario

When executing a scenario with an "Existing Provided Assembly" you will be prompted to provide the name of an existing Assembly, which will play the role of the provided Assembly. Any steps referring to the provided Assembly will execute against the Assembly given.

1. Execute the scenario by clicking the "Run Scenario" button at the top of the designer

2. A dialog box will appear requesting the name of an Assembly to use as the "Existing Provided Assembly"

    ![Provided Assembly Dialog](/images/user-guides/behaviour-testing/designing-scenarios/existing-provided-assembly/execute-input-provided-assembly.png "Provided Assembly Dialog")

3. Provide the name of an Assembly you want to execute this scenario with

    ![Set Provided Assembly](/images/user-guides/behaviour-testing/designing-scenarios/existing-provided-assembly/execute-input-provided-assembly-set.png "Set Provided Assembly")

4. Click "Execute" to be taken to the execution screen. You will see an additional step has been added to your scenario which identifies the Assembly you provided exists. 

    ![Execute Scenario](/images/user-guides/behaviour-testing/designing-scenarios/existing-provided-assembly/execute-scenario.png "Execution Scenario")


In our example, as the "Change State" step executes we will see the process is executed against the "ExternalExample" Assembly we provided.

