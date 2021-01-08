import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Header } from './Header'
import { pathPrefix } from '../gatsby-config'
import { Layout, Card } from 'antd'
import { Sidebar } from './sidebar'
import { TableOfContents } from './TableOfContents'

const { Sider, Content, Footer } = Layout

export function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
          allMdx {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
          file(relativePath: { eq: "logo.png" }) {
            childImageSharp {
              fixed(width: 180) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={(data) => {
        const allPosts = data.allMdx.edges
          .filter((edge: any) => !!edge.node.fields && !!edge.node.fields.slug)
          .map((edge: any) => edge.node.fields.slug)
        let onPostPage
        if (typeof window !== 'undefined') {
          const path = window.location.pathname.replace(
            pathPrefix.slice(0, -1),
            ''
          )
          if (
            allPosts.indexOf(path) >= 0 ||
            allPosts.indexOf(path.slice(0, -1)) >= 0
          ) {
            onPostPage = true
          } else {
            onPostPage = false
          }
        }

        const { title } = data.site.siteMetadata

        return (
          <div style={{ width: '100%', padding: 0, overflow: 'hidden' }}>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                {
                  name: 'description',
                  content:
                    'TalkyJS is a JavaScript framework for Amazon Alexa Skill development',
                },
                { name: 'keywords', content: 'sample, something' },
                { property: 'og:title', content: `${title}` },
                { property: 'og:type', content: 'blog' },
                { property: 'og:url', content: 'https://talkyjs.dev' },
                { property: 'og:site_name', content: 'TalkyJS' },
                {
                  property: 'og:description',
                  content:
                    'TalkyJS is a JavaScript framework for Amazon Alexa Skill development',
                },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header
              siteTitle={title}
              logoURL={data.file.childImageSharp.fixed}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                height: '100%',
              }}
            >
              <Sidebar />
              <Layout>
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                  }}
                >
                  {children}
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                  <Card title="Vote me on Product Hunt!">
                    <p>
                      If you interested about the project, please vote me on
                      Product Hunt!
                    </p>

                    <a
                      href="https://www.producthunt.com/posts/talkyjs-alexa-custom-skill-framework?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-talkyjs-alexa-custom-skill-framework"
                      target="_blank"
                    >
                      <img
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=235831&theme=light"
                        alt="TalkyJS - Alexa Custom Skill framework - A JavaScript framework for Amazon Alexa Skill development | Product Hunt Embed"
                        style={{ width: '225px', height: '40px' }}
                        width="225px"
                        height="40px"
                      />
                    </a>
                  </Card>
                </Footer>
                <Footer>
                  <p>©2020 Created by TalkyJS team</p>
                </Footer>
              </Layout>
              <TableOfContents />
            </div>
            <Layout>
              <Sider
                width={200}
                style={{ background: '#fff', height: '100%' }}
              />
            </Layout>
          </div>
        )
      }}
    />
  )
}

export default RootLayout
