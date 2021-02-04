import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { RootLayout as Layout } from '../Layout'
import Helmet from 'react-helmet'

function PageTemplate({ data: { mdx } }: any) {
  const { excerpt } = mdx
  return (
    <Layout sidebarRoot={mdx.frontmatter.root}>
      <Helmet
        title={`${mdx.frontmatter.title} | TalkyJS`}
        meta={[
          {
            name: 'description',
            content:
            excerpt,
          },
          { property: 'og:title', content: `${mdx.frontmatter.title} | TalkyJS` },
          { property: 'og:type', content: 'blog' },
          { property: 'og:url', content: 'https://talkyjs.dev' },
          { property: 'og:site_name', content: `${mdx.frontmatter.title} | TalkyJS`},
          {
            property: 'og:description',
            content:
            excerpt,
          },
        ]}
      />
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  )
}
export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        root
      }
      excerpt
      body
    }
  }
`
export default PageTemplate
