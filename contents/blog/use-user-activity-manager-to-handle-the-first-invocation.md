---
date: '2021-01-24'
title: Use UserActivityManager class to handle the first skill invocation
root: '/blog'
---

# Use UserActivityManager class to handle the first skill invocation

Talkyjs will record the user activity automatically when enabled 

```typescript
const config: TalkyJSSkillConfig = {
    database: {                             // [Optional] Database configuration
        type: "s3",                       // [Optional] Database type (none / s3 / dynamodb)
        tableName: 'ExampleSKill',                      // [Optional] Database table name
        s3PathPrefix: 'prefix'                    // [Optional] [Only S3] S3 path prefix
    },
```

## Get the skill invocation status in the handler

If you want to handle the skill response depends on the skill invocation count,  
we can get the status by using the `UserActivityManager` class.

```typescript
import { Router, UserActivityManager } from "@talkyjs/core";
import { LaunchRequestScript } from './LaunchRequest.speech'
export const LaunchRequestRouter: Router = {
    requestType: "LaunchRequest",
    
    handler: async (handlerInput) => {
        const userActivity = new UserActivityManager(handlerInput)
        const script = new LaunchRequestScript(handlerInput, {
            // If the user has no activity, it will returns true
            isFirstSession: await userActivity.isFirstSkillInvocation()

            // If the user has not used the skill over 30 days, it will returns true.
            isReturnedUser: await userActivity.isReturnedUser(),
        })
        return script
            .createResponseBuilder()
            .getResponse();
    }
}

export default LaunchRequestRouter
```

And the speech script can handle the optional props.


```tsx
import React from 'react';
import { SpeechScriptJSXWithOption } from '@talkyjs/ssml'

export class LaunchRequestScript extends SpeechScriptJSXWithOption<{
    isFirstSession: boolean;
    isReturnedUser: boolean;
}> {
    speech() {
        return (
            <speak>
                <p>
                    {this.options.isReturnedUser? 
                        'Hello': 
                        'Welcomeback'
                    }
                </p>
                    
                <p>
                    {this.options.isFirstSession ? 
                        'Thank you for launch the Skill!': 
                        'Welcome back to my Skill!'
                    }
                </p>
            </speak>
        )
    }
}
```