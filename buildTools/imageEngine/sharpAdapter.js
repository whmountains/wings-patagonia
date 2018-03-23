const { responsiveSizes } = require('./gatsbySharp')
const path = require('path')
const hasha = require('hasha')
const fs = require('fs-extra')

const getContentDigest = async (absolutePath) => {
  return hasha.fromFile(absolutePath, { algorithm: 'md5' })
}

// create a file object in the format gatsby expects
const createFile = async (absolutePath) => {
  //eslint-disable-next-line no-unused-vars
  const { dir, root, base, name, ext } = path.parse(absolutePath)

  return {
    extension: ext,
    absolutePath: absolutePath,
    name,
    base,
    internal: {
      contentDigest: await getContentDigest(absolutePath),
    },
  }
}

exports.responsiveSizes = async (file, options) => {
  if (options.outputDir) {
    fs.mkdirp(options.outputDir)
  }

  return await responsiveSizes({ file: await createFile(file), args: options })
}
