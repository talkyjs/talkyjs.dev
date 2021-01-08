import path from 'path'
import { GatsbyNode } from "gatsby"
import {replacePath} from './utils'

export const createPages: GatsbyNode['createPages'] = ({ actions, graphql }) => {
  const { createPage } = actions

  const Template = path.resolve(`src/templates/template.tsx`)

  // sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000
  return graphql<{
    allMdx: {
      edges: Array<{
        node: {
          id: string;
          fields: {
            slug: string;
          }
        }
      }>
    }
  }>(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    if (!result.data) return;
    result.data.allMdx.edges.forEach(({ node }) => {
      createPage({
        path: replacePath(node.fields.slug),
        component: Template,
        context: { id: node.id }, // additional data can be passed via context
      })
    })
  })
}
