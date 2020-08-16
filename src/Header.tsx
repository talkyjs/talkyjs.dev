import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Menu, Row } from 'antd'
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons'
import Img from 'gatsby-image'

interface Props {
  siteTitle: string;
  logoURL: string;
}

export class Header extends Component<Props> {
  render() {
    const { siteTitle, logoURL } = this.props
    return (
      <Row style={{backgroundColor: '#000'}}>
        <Link to="/" style={{
          borderBottom: '1px solid #f0f0f0',
        }}>
          {logoURL ? (
            <Img resolutions={logoURL} title={siteTitle} />
          ) : siteTitle }
        </Link>
        <Menu mode="horizontal" style={{
          backgroundColor: '#000',
        }}>
          <Menu.Item>
            <Link to="/docs/get-started/introduction" style={{
              color: '#f6f6f6',
            }}>Docs</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/blog" style={{
              color: '#f6f6f6',
            }}>Blog</Link>
          </Menu.Item>
          <Menu.Item>
            <a href="https://share.hsforms.com/10iHREWmUTCCTY_6zkYF-_Q3p3o8"
              target="_blank"
              style={{
                color: '#f6f6f6',
              }}>
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
        </Menu>
      </Row>
    )
  }
}
