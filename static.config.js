import React, { Component } from 'react'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { renderStylesToString } from './src/lib/emotion-server'
const util = require('util')
const chalk = require('chalk')

const dump = (...params) => {
  for (const param of params) {
    console.log(util.inspect(param, { depth: null, colors: true }))
  }
}

const dumpConfig = (config, title) => {
  console.log(chalk.blue.underline.bold(title))
  dump(
    Object.assign({}, config, {
      plugins: config.plugins.filter(
        (p) =>
          Object.getPrototypeOf(p).constructor.name !== 'EnvironmentPlugin',
      ),
    }),
  )
}

export default {
  getSiteData: () => ({
    title: 'React Static with Netlify CMS',
  }),
  getRoutes: async () => {
    // const posts = await getPosts()
    return [
      {
        path: '/',
        component: 'src/pages/Home.js',
      },
      // {
      //   path: '/about',
      //   component: 'src/containers/About',
      // },
      // {
      //   path: '/blog',
      //   component: 'src/containers/Blog',
      //   getData: () => ({
      //     posts,
      //   }),
      //   children: posts.map((post) => ({
      //     path: `/post/${post.data.slug}`,
      //     component: 'src/containers/Post',
      //     getData: () => ({
      //       post,
      //     }),
      //   })),
      // },
      {
        is404: true,
        component: 'src/pages/404',
      },
    ]
  },
  renderToHtml: (render, Comp) => {
    const rawHtml = render(<Comp />)
    const html = renderStylesToString(rawHtml)
    // console.log(rawHtml)
    // console.log(html)
    // console.log(dump(global.__SECRET_EMOTION__))
    return html
  },
  Document: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
  webpack: [
    // create a cms entry point
    (config, { stage, defaultLoaders }) => {
      // include entry point name in output so we don't get conflics
      if (stage !== 'node') {
        config.output.filename = '[name].[hash].js'

        // add a new entry point for the cms javascript
        config.entry = {
          app: config.entry,
          cms: require.resolve('./src/cms/cms.js'),
        }

        // exclude CMS chunk from main html
        config.plugins = config.plugins.map((plugin) => {
          if (
            Object.getPrototypeOf(plugin).constructor.name ===
            HtmlWebpackPlugin.name
          ) {
            plugin.options.excludeChunks.push('cms')
          }
          return plugin
        })

        // generate the cms html
        config.plugins.push(
          new HtmlWebpackPlugin({
            title: `Content Manager`,
            filename: `admin/index.html`,
            template:
              '!!raw-loader!' + require.resolve('./public/admin/index.html'),
            chunks: [`cms`],
          }),
        )

        // interate over loader rules till we find the rule for css
        config.module.rules[0].oneOf = config.module.rules[0].oneOf.map(
          (rule) => {
            if (String(rule.test) !== '/\\.css$/') {
              return rule
            }
            // pass-through other rules
            return rule
          },
        )

        return config
      }
    },
  ],
  bundleAnalyzer: false,
}
