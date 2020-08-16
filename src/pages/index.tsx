import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Button, Row, Col, Card, Layout, Typography } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import Img from 'gatsby-image'
import {
  StaticCardGrid
} from '../templates/StaticCardGrid'

const { Header, Content, Footer } = Layout;

const IndexPage = ({logoImageURL}: {logoImageURL: string}) => {
  return (
    <div align="center" style={{
      padding: 80,
      background: '#000',
     }}>
      <Img resolutions={logoImageURL} title="TalkyJS"/>
      <h2 style={{color:'#f6f6f6'}}>A JavaScript framework for Amazon Alexa Skill development</h2>
      <br />
      <Button.Group size="large">
        <Button
          href="https://github.com/talkyjs/talkyjs-cli"
          target="_blank"
        >
          Github
          <GithubOutlined />
        </Button>
        <Button type="primary">
          <Link to="/docs/get-started/introduction">Get Started</Link>
        </Button>
        <a
          href="https://www.producthunt.com/posts/talkyjs-alexa-custom-skill-framework?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-talkyjs-alexa-custom-skill-framework"
          target="_blank"
        >
          <img 
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=235831&theme=light"
           alt="TalkyJS - Alexa Custom Skill framework - A JavaScript framework for Amazon Alexa Skill development | Product Hunt Embed" 
           style={{width: "225px", height: "40px"}} width="225px" height="40px" /></a>
      </Button.Group>
    </div>
  )
}

export default () => {
  return (
    <StaticQuery
        query={query}
        render={ data => (
          <div style={{
            backgroundColor: 'rgb(240, 242, 245)'
          }}>
            <IndexPage logoImageURL={data.file.childImageSharp.fixed} />
              <Layout>
                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                  }}
                >
                  <Typography.Title level={2}>Features</Typography.Title>
                  <StaticCardGrid items={[{
                    title: "ASK SDK compatible",
                    content: (
                      <>
                      All API is wrapped ASK-SDK.<br/>
                      We can easy to add it into your ask-sdk project.
                      </>
                    )
                  }, {
                    title: "JSX(TSX) Support for SSML",
                    content: (
                      <>
                      We can write SSML by using JSX(TSX).<br/>
                      JSX helps us to markup your speech content more easily.
                      </>
                    )
                  }, {
                    title: "Generate template from CLI",
                    content: (
                      <>
                      TalkyJS ClI can generate any files from template.<br/>
                      We can easy to create handler / router / service with test.
                      </>
                    )
                  }, {
                    title: "Situational Design friendly",
                    content: (
                      <>
                      TalkyJS provides a route component.<br/>
                      It's easy to handle the request denepnds of the situation.
                      </>
                    )
                  }, {
                    title: 'Build-in handler / interceptors',
                    content: (
                      <>
                      TalkyJS includes a commonly used Handler and interceptors<br/>
                      AMAZON.RepeatIntent, ErrorHandler, SessionEndedRequest, and more.
                      </>
                    )
                  }]}/>
                  <hr />
                  <Typography.Title level={2}>Compare from ask-sdk</Typography.Title>
                  <Typography.Title level={3}>Skill Handler</Typography.Title>
                  <Row gutter={16}>
                    <Col span={24} md={12}>
                      <Card title="ASK SDK">
                         <pre>
{`
import { CustomSkillFactory, DefaultApiClient } from 'ask-sdk-core';
import { S3PersistenceAdapter } from 'ask-sdk-s3-persistence-adapter';

export const handler = CustomSkillFactory.init()
.withPersistenceAdapter(new S3PersistenceAdapter({
    bucketName: 'name',
    pathPrefix: 'blah'
}))
.withApiClient(new DefaultApiClient())
.addErrorHandlers({
    canHandle() {
        return true
    },
    handle(handlerInput, error) {
        console.log(error)
        return handlerInput.responseBuilder
          .speak('Sorry I could not understand the meaning. Please tell me again')
          .reprompt('Could you tell me onece more?')
          .getResponse();
    }
})
.lambda()
`}
</pre>
                      </Card>
                    </Col>
                    <Col span={24} md={12}>
                       <Card title="TalkyJS">
                         <pre>
{`
import { SkillFactory, TalkyJSSkillConfig } from '@talkyjs/core'
const config: TalkyJSSkillConfig = {
  database: {
      type: "s3",
      tableName: "name",
      s3PathPrefix: 'blah'
  },
  apiClient: {
      useDefault: true,
  },
  errorHandler: {
      usePreset: true,
  }
}

export const handler = SkillFactory.launch(config)
  .getSkill().lambda()
`}
</pre>
                        </Card>
                    </Col>
                  </Row>
                  <Typography.Title level={3}>Request Handler</Typography.Title>
                  <Row gutter={16}>
                    <Col span={24} md={12}>
                      <Card title="ASK SDK">
                         <pre>
{`
import { RequestHandler, getRequest } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
const StopAndCancelAndNoIntentHandler: RequestHandler = {
  canHandle(handlerInput) {
      const request = getRequest<IntentRequest>(handlerInput.requestEnvelope)
      if (request.type !== 'IntentRequest') return false;
      return ["AMAZON.StopIntent","AMAZON.CancelIntent","AMAZON.NoIntent"].includes(request.intent.name)
  },
  handle(handlerInput) {
      return handlerInput.responseBuilder
          .speak("Bye")
          .getResponse()
  }
}
`}
</pre>
                      </Card>
                    </Col>
                    <Col span={24} md={12}>
                       <Card title="TalkyJS">
                         <pre>
{`
import { Router } from "@talkyjs/core";
export const StopAndCancelAndNoIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: ["AMAZON.StopIntent","AMAZON.CancelIntent","AMAZON.NoIntent"],
    handler: async (handlerInput) => {
      return handlerInput.responseBuilder
          .speak("Bye")
          .getResponse()
    }
}

export default StopAndCancelAndNoIntentRouter
`}
</pre>
                        </Card>
                    </Col>
                    </Row>
                  <Typography.Title level={3}>SSML</Typography.Title>
                  <Row gutter={16}>
                    <Col span={24} md={12}>
                      <Card title="ASK SDK">
                         <pre>
{`

return handlerInput.responseBuilder
  .speak([
    "<p>Hello! It's a nice development. </p>",
    "<p>You can use a timer after permitted the Timer permission.</p>",
    "<p>Can I use the Timer?</p>",
  ].join(''))
  .reprompt('How are you?')
  .getResponse()
`}
</pre>
                      </Card>
                    </Col>
                    <Col span={24} md={12}>
                       <Card title="TalkyJS">
                         <pre>
{`
/** @jsx ssml */
import {
    ssml,
    SpeechScriptJSX,
} from '@ask-utils/speech-script'

export class InitialLaunchRequestScript extends SpeechScriptJSX {
    speech() {
        return (
            <speak>
                <p>Hello! It's a nice development. </p>
                <p>You can use a timer after permitted the Timer permission.</p>
                <p>Can I use the Timer?</p>
            </speak>
        )
    }
    
    reprompt() {
        return (
            <speak>
                <p>How are you?</p>
            </speak>
        )
    }   
}
`}
</pre>
                        </Card>
                    </Col>
                    </Row>
                </Content>
              </Layout>
          </div>
        )}
      />
  )
}

const query = graphql`
    query {
        file(relativePath: {eq: "logo.png"}) {
            childImageSharp{
                fixed(width: 640) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }
`