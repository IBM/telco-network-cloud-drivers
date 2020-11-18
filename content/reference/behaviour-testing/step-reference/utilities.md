---
title: Utilities
weight: 50
---

# Delay

![Delay](/images/reference/service-behaviour/step-reference/utilities/delay.png "Delay")

## Description

Delay the scenario from continuing for a specified time period. This does not prevent any background tasks, such as metric recording, from continuing. 

## Properties

| Property | Description |
| ---- | ---- |
| sleepTime | Numeric value representing the amount of time to delay (unit specified by timeUnit property) |
| timeUnit | Unit of measurement for the sleepTime property: milliseconds, seconds, minutes |
