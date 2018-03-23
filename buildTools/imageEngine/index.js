const path = require('path')
const hasha = require('hasha')
const fs = require('fs-extra')
const sharp = require(`sharp`)
const pMapSeries = require('p-map-series')
const _ = require(`lodash`)
const relativePath = require('relative')
const sigmund = require('sigmund')

const { base64 } = require('./gatsbySharp')

const getContentDigest = async (absolutePath) => {
  return hasha.fromFile(absolutePath, { algorithm: 'md5' }).substr(0, 8)
}

// create a file object in the format gatsby expects
const srcInfo = async (absolutePath) => {
  //eslint-disable-next-line no-unused-vars
  const { dir, root, base, name, ext } = path.parse(absolutePath)

  let metadata
  try {
    metadata = await sharp(absolutePath).metadata()
  } catch (err) {
    throw new Error(`Failed to process image ${absolutePath}`, err)
  }

  return {
    extension: ext,
    absolutePath,
    name,
    base,
    contentDigest: await getContentDigest(absolutePath),
    width: metadata.width,
    height: metadata.height,
    density: metadata.density,
  }
}

const resizeImage = async (srcImg, options) => {
  // create a unique output filename based on the input file and options hash
  const argsDigest = hasha(sigmund(options))
  const fileExtension = options.toFormat || file.extension
  const outputFilename = `${srcImg.name}-${
    srcImg.contentDigest
  }-${argsDigest}.${fileExtension}`

  // src for use on the client
  const prefixedSrc = relativePath(options.publicRoot, path.join(options.outputDir, outputFilename))

  // do the transform

  return {
    src: prefixedSrc,
    absolutePath: file.absolutePath,
    width: ,
    height: ,
    aspectRatio,
    originalName: srcImg.base,
  }
}

export const responsiveSizes = async (file, args) => {
  // load a bunch of metadata about the image
  const srcImg = srcInfo(file)

  // normalize args
  const defaultArgs = {
    maxWidth: 3840,
    quality: 50,
    jpegProgressive: true,
    pngCompressionLevel: 9,
    grayscale: false,
    duotone: false,
    pathPrefix: ``,
    toFormat: ``,
    sizeByPixelDensity: false,
    sizes: `(max-width: ${srcImg.width}px) 100vw, ${srcImg.height}px`,
  }
  const options = Object.assign({}, defaultArgs, args)

  // make space for the output file
  if (options.outputDir) {
    fs.mkdirp(options.outputDir)
  }

  const sizes = [
    options.maxWidth / 4,
    options.maxWidth / 2,
    options.maxWidth,
    options.maxWidth * 1.5,
    options.maxWidth * 2,
    options.maxWidth * 3,
    srcImg.width,
  ]
    .filter((size) => size <= srcImg.width)
    .sort()
    .map((s) => Math.round(s))

  // create the output files
  const images = await pMapSeries(sizes, async (size) => {
    return resizeImage(srcImg, { ...options, width: size })
  })

  // create srcSet
  const srcSet = images
    .map((image) => `${image.src} ${Math.round(image.width)}w`)
    .join(`,\n`)

  // use the closest image to our optimal width as fallback
  const fallbackSrc = _.minBy(images, (image) =>
    Math.abs(options.maxWidth - image.width),
  ).src

  // get base64
  const base64Width = 20
  const base64Height = Math.max(
    1,
    Math.round(base64Width * srcImg.height / srcImg.width),
  )
  const base64Image = await base64({
    file,
    args: {
      duotone: options.duotone,
      grayscale: options.grayscale,
      rotate: options.rotate,
      width: 20,
      height: base64Height,
    },
  })

  return {
    base64: base64Image.src,
    aspectRatio: images[0].aspectRatio,
    src: fallbackSrc,
    srcSet,
    sizes: options.sizes,
    density: srcImg.density,
    presentationWidth: srcImg.width,
    presentationHeight: srcImg.height,
  }
}
