import React from 'react'
import { Link } from 'gatsby'
import { Button } from 'antd'
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons'

const IndexPage = () => {
  return (
    <div align="center" style={{ padding: 80 }}>
      <p
        style={{
          color: 'cornflowerblue',
          fontSize: 50,
          fontWeight: 'bold',
        }}
      >
        Talkyjs
      </p>
      <h2>A JavaScript framework for Amazon Alexa Skill development</h2>
      <p>
        Now WIP
      </p>
      <br />
      <Button.Group size="large">
        <Button href="https://twitter.com/jannikbuschke" target="_blank">
          Twitter
          <TwitterOutlined />
        </Button>
        <Button
          href="https://github.com/jannikbuschke/gatsby-antd-docs"
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

export default IndexPage
