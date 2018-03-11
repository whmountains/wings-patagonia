const fs = require('mz/fs')
const globby = require('globby')
const chalk = require('chalk')
const path = require('path')
const matter = require('gray-matter')
const yaml = require('js-yaml')
const R = require('ramda')
const capitalize = require('capitalize')
const decamelize = require('decamelize')
const titleize = require('titleize')
const stripPath = require('strip-path')

const getFieldTree = (fields) => {
  // if (typeof source === 'object') {
  //   return R.mapObjIndexedIndexed(source)
  // } else if (Array.isArray(source)) {
  //
  // }

  return Object.values(
    R.mapObjIndexed((value, key) => {
      const base = {
        name: key,
        label: decamelize(key, ' '),
      }

      // list of items
      if (Array.isArray(value)) {
        return Object.assign(base, {
          widget: 'list',
          // recursively get field tree
          fields: typeof value[0] === 'object' && getFieldTree(value[0]),
        })
      } else if (typeof value === 'string') {
        if (value.charAt(0) === '.') {
          return Object.assign(base, { widget: 'image' })
        } else if (value.length >= 100) {
          return Object.assign(base, { widget: 'markdown' })
        } else return Object.assign(base, { widget: 'string' })
      } else if (typeof value === 'object') {
        return Object.assign(base, {
          widget: 'object',
          fields: getFieldTree(value),
        })
      } else if (typeof value === 'number') {
        return Object.assign(base, { widget: 'number' })
      } else throw new Error('Unknown data type: ' + typeof value)
    }, fields),
  )
}

const scanFile = async (filePath) => {
  // load file contents
  const fileContents = await fs.readFile(filePath)

  // parse the file
  const parsedFile = matter(fileContents)

  // convert into a tree of fields
  const fieldTree = getFieldTree(parsedFile.data)

  // generate an entry
  const basename = path.basename(filePath, '.md')
  const fileEntry = {
    file: stripPath(filePath, __dirname),
    name: basename,
    label: titleize(basename.replace('-', ' ')),
    fields: fieldTree,
  }

  return fileEntry
}

const main = async () => {
  const filesToScan = await globby(['./src/data/**/*.md'])

  const fieldTree = await Promise.all(
    filesToScan.map((file) => path.join(__dirname, file)).map(scanFile),
  )

  const result = {
    collections: [
      {
        label: 'Pages',
        name: 'pages',
        files: fieldTree,
      },
    ],
  }

  // console.log(JSON.stringify(result))

  console.log(yaml.dump(result))
}

main()
