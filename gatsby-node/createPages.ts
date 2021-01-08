import path from 'path'
import { GatsbyNode } from 'gatsby'
import { replacePath } from './utils'

const createBlogPostByMDX: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions
  const Template = path.resolve(`src/templates/template.tsx`)
  // sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000
  return graphql<{
    allMdx: {
      edges: Array<{
        node: {
          id: string
          fields: {
            slug: string
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
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    if (!result.data) return
    result.data.allMdx.edges.forEach(({ node }) => {
      if (!node.fields) return
      createPage({
        path: replacePath(node.fields.slug),
        component: Template,
        context: { id: node.id }, // additional data can be passed via context
      })
    })
  })
}

const createNPMPackagePages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions
  const Template = path.resolve(`src/templates/npm.tsx`)
  // sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000
  return graphql<{
    allNpmPackage: {
      edges: Array<{
        node: {
          name: string
          deprecated: 'true' | 'false'
        }
      }>
    }
  }>(`
    query ListNpmPackages {
      allNpmPackage {
        edges {
          node {
            name
            deprecated
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    if (!result.data) return
    result.data.allNpmPackage.edges.forEach(({ node }) => {
      if (node.deprecated === 'true') return
      createPage({
        path: replacePath('packages/' + node.name.replace(/@talkyjs\//gi, '')),
        component: Template,
        context: { name: node.name }, // additional data can be passed via context
      })
    })
  })
}
export const createPages: GatsbyNode['createPages'] = async (props) => {
  await createBlogPostByMDX(props)
  await createNPMPackagePages(props)
}
