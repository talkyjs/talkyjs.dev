import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import Img from 'gatsby-image'

const IndexPage = ({logoImageURL}: {logoImageURL: string}) => {
  return (
    <div align="center" style={{ padding: 80 }}>
      <Img resolutions={logoImageURL} title="TalkyJS"/>
      <h2>A JavaScript framework for Amazon Alexa Skill development</h2>
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
          <>
          <IndexPage logoImageURL={data.file.childImageSharp.fixed} />
          </>
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