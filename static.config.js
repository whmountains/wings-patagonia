import React, { Component } from 'react'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { renderStylesToString } from './src/lib/emotion-server'
import matter from 'gray-matter'
import fs from 'fs-extra'
import path from 'path'

import { transformData } from './buildTools'
import { responsiveSizes } from './buildTools/imageEngine'

const ABS_ROOT = path.join(process.cwd(), 'public')

const sizes = (file, options) => {
  const publicRoot = path.join(process.cwd(), 'dist')
  const outputDir = path.join(publicRoot, 'static')

  return responsiveSizes(
    file,
    Object.assign({ outputDir, publicRoot }, options),
  )
}

const getFrontmatter = async (relativePath) => {
  // resolve to absolute path
  const absPath = require.resolve(relativePath)
  // base dir for resolving relative paths
  const { dir } = path.parse(absPath)

  // read the file
  const fileContents = await fs.readFile(absPath, { encoding: 'utf8' })

  // parse the frontMatter
  const rawMatter = matter(fileContents).data

  // walk and transform to native objects
  const frontmatter = transformData(
    {
      relativeRoot: dir,
      absoluteRoot: ABS_ROOT,
      outputDir: path.join(process.cwd(), 'dist/static'),
      sizes,
    },
    rawMatter,
  )

  return frontmatter
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
        component: 'src/Home/',
        getData: async () => {
          return {
            homeStrings: await getFrontmatter('./src/data/home.md'),
            footerStrings: await getFrontmatter('./src/data/footer.md'),
            seamlessImg: await sizes(
              require.resolve('./src/assets/seamless.jpg'),
              {
                outputDir: path.join(__dirname, './dist/static'),
              },
            ),
          }
        },
      },
      {
        path: '/contact',
        component: 'src/Contact/',
        getData: async () => {
          return {
            strings: await getFrontmatter('./src/data/contact.md'),
            footerStrings: await getFrontmatter('./src/data/footer.md'),
          }
        },
      },
      {
        path: '/flights',
        component: 'src/Flights',
        children: [
          {
            path: '/scenic',
            component: 'src/Flights/scenic',
            getData: async () => {
              return {
                strings: await getFrontmatter('./src/data/scenic-flights.md'),
                footerStrings: await getFrontmatter('./src/data/footer.md'),
              }
            },
          },
          {
            path: '/commercial',
            component: 'src/Flights/commercial',
            getData: async () => {
              return {
                strings: await getFrontmatter(
                  './src/data/commercial-flights.md',
                ),
                footerStrings: await getFrontmatter('./src/data/footer.md'),
              }
            },
          },
          {
            path: '/custom',
            component: 'src/Flights/custom',
            getData: async () => {
              return {
                strings: await getFrontmatter('./src/data/custom-flights.md'),
                footerStrings: await getFrontmatter('./src/data/footer.md'),
              }
            },
          },
        ],
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
        component: 'src/404',
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
    (config, { stage }) => {
      // dumpConfig(config)

      return config

      // include entry point name in output so we don't get conflics
      if (stage !== 'node') {
        config.output.filename = '[name].[hash].js'

        // add a new entry point for the cms javascript
        config.entry = {
          main: config.entry,
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
