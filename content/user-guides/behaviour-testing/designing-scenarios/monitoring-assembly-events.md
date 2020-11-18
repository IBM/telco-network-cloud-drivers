---
title: Monitor Assembly Events
weight: 0
---

The steps in the "Assembly Events" group allow you to check intents have occurred on an Assembly. This is usually done to check a Heal or Scale has taken place on an Assembly when a policy is triggered. 

# Check Assembly Process Success

If you have a scenario which simulates traffic/metrics to trigger a policy on your Assembly, then you can check the expected Heal or Scale takes place by adding the "Check for currently in progress process" or "Check for successful process" steps.

In this example, shown below, we have a scenario which will manually trigger a Scale Out of a cluster named "A" in our example Assembly:

![Base Scenario](/images/user-guides/behaviour-testing/designing-scenarios/assembly-events/base-scenario.png "Base Scenario")

To check a process takes place complete the following steps:

1. Add the "Check for successful process" step from the right hand panel

2. Select the expected process to set the "processType" property and enter the name of the Assembly you expect

    ![Expect Scale Out](/images/user-guides/behaviour-testing/designing-scenarios/assembly-events/expect-scale-out.png "Expect Scale Out")

3. Execute the scenario by clicking the "Run Scenario" button at the top of the designer. In the execution screen you will see the step wait for a successful scale out to complete (in our case it's the scale out we manually triggered)

    ![Execution Expect Scale Out](/images/user-guides/behaviour-testing/designing-scenarios/assembly-events/exec-expect-scale-out.png "Execution Expect Scale Out")


