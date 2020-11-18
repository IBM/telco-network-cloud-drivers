---
title: Executing Intents
weight: 0
---

The following guide shows you how to use the Intent Engine and Intent Request steps to execute lifecycle intents on Assemblies as part of a scenario.

# Executing Synchronous Intents

The steps in the "Intent Engine" group allow you to execute intents on Assemblies and wait for their completion. The target Assembly of the intent can be one created as part of the scenario or an existing Assembly you know exists. 

1. Open an existing scenario and add a step from the "Intent Engine" group. In the below example we have added the "Change State" step to change the state of our Assembly named "Example" to "Active".

    ![Change State Step](/images/user-guides/behaviour-testing/designing-scenarios/executing-intents/sync-change-state.png "Change State Step")

2. To execute the intent against an Assembly not included in the scenario, enter it's name into the "assemblyName" property

    ![Change State Step External Assembly](/images/user-guides/behaviour-testing/designing-scenarios/executing-intents/sync-change-state-ext-assembly.png "Change State Step External Assembly")

3. Execute the scenario and monitor the chosen Assembly (in a new tab navigate to the "Recent Assembly Instances" menu on the left hand menu). As the change state step is executing you will see the change state execution take place.

    ![Change State Step In Progress](/images/user-guides/behaviour-testing/designing-scenarios/executing-intents/sync-change-state-in-progress.png "Change State Step In Progress")

The step will wait to see if the change state (or your chosen intent) process completes successfully.

# Executing Asynchronous Intents

The steps in the "Intent Requests" group allow you to request intents on Assemblies, then proceed to complete other steps whilst the intent process takes place. 

1. Open an existing scenario and add a step from the "Intent Requests" group. In the below example we have added the "Change State" step to change the state of our Assembly named "Example" to "Active". This will request the state change and progress without checking to see if the process is successful. 

    ![Request Change State Step](/images/user-guides/behaviour-testing/designing-scenarios/executing-intents/async-change-state.png "Request Change State Step")

2. We can add another intent after the earlier step, so both intents are started and run in parallel. The second change state request in our example is for an Assembly not created in this scenario, we expect it to already exist.

    ![Multiple Request Change State Step](/images/user-guides/behaviour-testing/designing-scenarios/executing-intents/async-change-state-multi.png "Multiple Request Change State Step")

3. To check the processes completed successfully, add the "Expect Intent Success" step from the "Intent Requests" group. This confirms the last requested intent for the given Assembly completed.

    ![Check Intent Success](/images/user-guides/behaviour-testing/designing-scenarios/executing-intents/async-assert-change-state-success.png "Check Intent Success")

4. Execute the scenario and monitor the Assemblies (in a new tab navigate to the "Recent Assembly Instances" menu on the left hand menu). As the change state steps execute, a process will begin on each Assembly. The "Expect Intent Success" will block until the process completes successfully. If the process has failed, the step will be marked as failed and display the error in the execution screen.

    ![Check Intent In Progress](/images/user-guides/behaviour-testing/designing-scenarios/executing-intents/async-assert-in-progress.png "Check Intent In Progress")
