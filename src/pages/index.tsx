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
                  }]}/>
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