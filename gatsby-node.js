const path = require('path')

// exports.createPages = ({ boundActionCreators, graphql }) => {
//   const { createPage } = boundActionCreators;
//
//   return graphql(`
//     {
//       allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
//         edges {
//           node {
//             excerpt(pruneLength: 400)
//             html
//             id
//             frontmatter {
//               templateKey
//               path
//               date
//               title
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//     if (result.errors) {
//       return Promise.reject(result.errors);
//     }
//     result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//       createPage({
//         path: node.frontmatter.path,
//         component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.js`),
//         context: {} // additional data can be passed via context
//       });
//     });
//   });
// };

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    // TODO: always move the value to fields, even if we aren't porting anything

    for (const key in node.frontmatter) {
      const value = node.frontmatter[key]

      let newValue = value

      if (typeof value === 'string' && value.startsWith('/')) {
        newValue = '../..' + newValue
      }

      createNodeField({
        node,
        name: key,
        value: newValue,
      })
    }
  }
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-html') {
    config.loader('null', {
      test: /mapbox-gl/,
      loader: 'null-loader',
    })
  }
}

exports.modifyBabelrc = ({ babelrc }) => {
  console.log(path.join(__dirname, 'src/lib/emotion.js'))

  return {
    plugins: [
      [
        require.resolve(`babel-plugin-emotion`),
        {
          sourceMap: true,
          autoLabel: true,
          labelFormat: '[local]--[filename]',
          instances: [
            'emotion',
            'react-emotion',
            'preact-emotion',
            path.join(__dirname, 'src/lib/emotion'),
            path.join(__dirname, 'src/lib/react-emotion'),
          ],
          primaryInstance: path.join(__dirname, 'src/lib/emotion'),
        },
      ],
    ].concat(babelrc.plugins),
  }
}
