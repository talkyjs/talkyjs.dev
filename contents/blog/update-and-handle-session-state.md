---
date: '2021-01-24'
title: Update and handle talkyjs state situation
root: '/blog'
---

# Update and handle talkyjs state situation

Talkyjs has a request router.

We can easy to handle the request by using it.

```typescript
import { Router } from "@talkyjs/core";

export const RandomSCPRouter: Router = {
    requestType: "IntentRequest",
    intentName: "RandomSCPIntent",
    handler: async (handlerInput) => {
...
```

## Handle session state by using Router

When we want to handle `AMAZON.YesIntent` by any state, we can easy to handle it.

```typescript
import { Router } from "@talkyjs/core";
export const YesRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.YesIntent",
    handler: RandomSCPRouter.handler
}

export const YesRandomSCPRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.YesIntent",
    situation: {
        state: "randomSCP"
    },
    handler: RandomSCPRouter.handler
}
```

The `YesRandomSCPRouter` will call when the session state is `randomSCP`.
And if the session state is not `randomSCP` or null, the `YesRouter` will be called instead.

## Update / set the session state

And the session state can set by any other handlers.

```typescript
import { Router, SituationService } from "@talkyjs/core";

export const LaunchRequestRouter: Router = {
    requestType: "LaunchRequest",
    handler: async (handlerInput) => {
        const situationManager = new SituationService(handlerInput)
        situationManager.updateState('randomSCP')
        return handlerInput
            .responseBuilder
            .speak('hello')
            .reprompt('world')
            .getResponse()
    }
}

export default LaunchRequestRouter
```

