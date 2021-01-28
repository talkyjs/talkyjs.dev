---
date: '2021-01-27'
title: talkyjs/ssml version 0.5.0 will support progressive response API
root: '/blog'
---

# @talkyjs/ssml version 0.5.0 will support progressive response API

`@talkyjs/ssml` version 0.5.0 has been released today.

## Features
### add progressive response handler method
[563cce2](https://github.com/talkyjs/ssml/commit/563cce21a8b8118db540264f8678948c04ddb6c6)

In the `SpeechScriptJSX` and `SpeechScriptJSXWithOption` classes are added a new method named `enqueueProgressiveResponse`.

The method will call the Alexa Progressive Response API by using ask-sdk's function.  
(Send the User a Progressive Response)[https://developer.amazon.com/en-US/docs/alexa/custom-skills/send-the-user-a-progressive-response.html]


### Usage

```tsx
class LaunchRequestScript extends SpeechScriptJSX {
  speech() {
    return (
      <speak>
        <p>Hello! It's a nice development. How are you?</p>
      </speak>
    );
  }

  reprompt() {
    return (
      <speak>
        <p>How are you?</p>
      </speak>
    );
  }
  progressiveResponse() {
    return (
      <speak>
        <p>Hello! Hello!!</p>
      </speak>
    );
  }
}

const LaunchRequestHandler = {
  canHandle: () => true,
  handle: async (handlerInput) => {
    const speechScript = new LaunchRequestScript(handlerInput)
    await speechScript.enqueueProgressiveResponse()
    
    // Add a long task.

    return speechScript.createResponse()
  }
}
```

Or, we can create a two components to handle progressive response or normal response.

```tsx

class LaunchInprogress extends SpeechScriptJSX {
  progressiveResponse() {
    return (
      <speak>
        <p>Hello! Hello!!</p>
      </speak>
    );
  }
}


class ScriptWithOptions extends SpeechScriptJSXWithOption<{
    username: string;
    launchCount: number;
}> {
    speech() {
        const {
            username,
            launchCount,
        } = this.options
        return (
            <speak>
                <p>Hello {username}-san. You launch it by {launchCount} times. How are you?</p>
            </speak>
        )
    }
}

const LaunchRequestHandler = {
  canHandle: () => true,
  handle: async (handlerInput) => {
    const progressiveRepsonse = new LaunchInprogress(handlerInput)
    await progressiveRepsonse.enqueueProgressiveResponse()

    // Add a long task.

    const speechScript = new ScriptWithOptions(handlerInput, {
        username: 'John',
        launchCount: 5
    })
    return speechScript.createResponse()
  }
}
```

## Appendix
### Changelog:
[0.5.0](https://github.com/talkyjs/ssml/compare/v0.4.2...v0.5.0) (2021-01-28)
