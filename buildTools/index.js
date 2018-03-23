import path from 'path'
import deepMap from 'deep-map-async'
import isImage from 'is-image'
import util from 'util'
import chalk from 'chalk'
import isRelative from 'is-relative'

import { responsiveSizes } from './imageEngine/'

export const dump = (...params) => {
  for (const param of params) {
    console.log(util.inspect(param, { depth: null, colors: true }))
  }
}

// eslint-disable-next-line no-unused-vars
export const dumpConfig = (config, title) => {
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

export const resolvePath = (value, { relativeRoot, absoluteRoot }) => {
  const resolveRoot = isRelative(value) ? relativeRoot : absoluteRoot
  return path.join(resolveRoot, value)
}

export const transformValue = ({
  relativeRoot,
  absoluteRoot,
  outputDir,
}) => async (value) => {
  if (typeof value !== 'string') {
    return value
  }

  if (!isImage(value)) {
    return value
  }

  const absolutePath = resolvePath(value, { relativeRoot, absoluteRoot })

  return responsiveSizes(absolutePath, {
    outputDir,
  })
}

export const transformData = async (opts, data) => {
  return deepMap(data, transformValue(opts))
}
