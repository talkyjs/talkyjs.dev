---
---

<h1 align="center">
  Introduction
</h1>

# Create a new Alexa Skill with TalkyJS and ask-sdk

We can create a new Alexa Custom Skill from ASK CLI(v2)

# Getting started

```
$ ask new  --template-url https://github.com//talkyjs/talkyjs-alexa-skill-template-helloworld.git

? Choose a method to host your skill's backend resources:  (Use arrow keys)
❯ Alexa-hosted skills
  Host your skill code by Alexa (free). 
  AWS with CloudFormation
  Host your skill code with AWS services and provision with AWS CloudFormation (requires AWS account) 
  AWS Lambda
  Host your skill code on AWS Lambda (requires AWS account). 
  ──────────────
  self-hosted and manage your own hosting 
  
[Warn]: CLI is about to download the skill template from unofficial template https://github.com//talkyjs/talkyjs-alexa-skill-template-helloworld.git. Please make sure you understand the source code to best protect yourself
 from malicious usage.
? Would you like to continue download the skill template?  Yes
? Please type in your skill name:  talkyjs-alexa-skill-template-helloworld
? Please type in your folder name for the skill project (alphanumeric):  talkyjs-alexa-skill-template-helloworld

$ cd talkyjs-alexa-skill-template-helloworld
$ ask deploy
```

Edit files in `/talkyjs-alexa-skill-template-helloworld` and deploy AWS and Alexa developer account

# Features

- [x] ASK SDK Compatible
- [x] Typescript
- [x] JSX / TSX
- [x] Jest (with Snapshot Test)

# Roadmap
 
- [ ] Decorator
- [ ] Register generated handler by automatically
- [ ] ESLint / prettier
- [ ] E2E testing

# Testing Lambda function

```
$ cd lambda
$ npm install
$ npm run tesst
```

By default, Jest will create a snapshot.

# License

MIT
