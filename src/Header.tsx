import React, { Component, useEffect } from 'react'
import { Link } from 'gatsby'
import { Menu, Row , Input } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import Img from 'gatsby-image'

interface Props {
  siteTitle: string
  logoURL: string
}

const Docsearch = () => {
  useEffect(() => {
    if (!window) return;
    // @ts-expect-error
    import('docsearch.js').then(({ default: docsearch}: any) => {
      console.log(docsearch)
      console.log(document.querySelector('#docsearch'))
      docsearch({
        apiKey: 'a6231811126b2bc6445d33a962355d00',
        indexName: 'talkyjs',
        inputSelector: '#docsearch',
        debug: false // Set debug to true if you want to inspect the dropdown
      });
    })
  }, [])
  return <Input id="docsearch" />
}

export class Header extends Component<Props> {
  render() {
    const { siteTitle, logoURL } = this.props
    return (
      <Row style={{ backgroundColor: '#000' }}>
        <Link
          to="/"
          style={{
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          {logoURL ? (
            <Img resolutions={logoURL} title={siteTitle} />
          ) : (
            siteTitle
          )}
        </Link>
        <Menu
          mode="horizontal"
          style={{
            backgroundColor: '#000',
          }}
        >
          <Menu.Item>
            <Link
              to="/docs/get-started/introduction"
              style={{
                color: '#f6f6f6',
              }}
            >
              Docs
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/blog"
              style={{
                color: '#f6f6f6',
              }}
            >
              Blog
            </Link>
          </Menu.Item>
          <Menu.Item>
            <a
              href="https://share.hsforms.com/10iHREWmUTCCTY_6zkYF-_Q3p3o8"
              target="_blank"
              style={{
                color: '#f6f6f6',
              }}
            >
              Contact
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              href="https://github.com/talkyjs"
              target="_blank"
              style={{
                color: '#f6f6f6',
              }}
            >
              <GithubOutlined />
              GitHub
            </a>
          </Menu.Item>
          <Menu.Item>
            <Docsearch />
          </Menu.Item>
        </Menu>
      </Row>
    )
  }
}
