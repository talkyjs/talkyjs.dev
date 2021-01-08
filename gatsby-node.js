/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
})
const nodes = require('./gatsby-node/index')

if (nodes) {
    Object.entries(nodes).forEach(([key, node]) => {
        exports[key] = node
    })
}