---
date: '2021-02-04'
title: Support new SSML tags to speak as a fun style for Japan
root: '/blog'
---

# Support new SSML tags to speak as a fun style for Japan

On Jan 29, Amazon published a blog post about a new SSML tag for Japan.  
[New Fun Speaking Style for Japan](https://developer.amazon.com/en-US/blogs/alexa/alexa-skills-kit/2021/01/new-fun-speaking-style-for-japan)

We can use the fun speaking style for Japanese Alexa Skill.

```ssml
<amazon:domain name="fun">布団が、ふっとんだ。</amazon:domain>
```

And today, the `@talkyjs/ssml` supports the new SSML tag.

## Usage

We can use the tag as a `amazon-domain` in the React JSX file.

```jsx
import React, { FC } from 'react'

export const Fun: FC = () => (
    <amazon-domain name="fun">布団が、ふっとんだ。</amazon-domain>
);
```

And we can render the component by using the function.

```typescript
import { renderSSMLToString } from '@talkyjs/ssml';

const ssmlString = renderSSMLToString(<Fun />)
// '<amazon:domain name="fun">布団が、ふっとんだ。</amazon:domain>'
```

## The feature is available in version 0.6.0

If you using it older, please upgrade it.