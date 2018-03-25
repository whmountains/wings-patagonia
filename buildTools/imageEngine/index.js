const path = require('path')
const hasha = require('hasha')
const fs = require('fs-extra')
const sharp = require(`sharp`)
const pMapSeries = require('p-map-series')
const _ = require(`lodash`)
const relativePath = require('relative')
const sigmund = require('sigmund')
const ProgressBar = require(`progress`)
const isInside = require('path-is-inside')

const { base64 } = require('./gatsbySharp')

const getContentDigest = async (absolutePath) => {
  return (await hasha.fromFile(absolutePath, { algorithm: 'md5' })).substr(0, 8)
}

// create a file object in the format gatsby expects
export const srcInfo = async (absolutePath) => {
  //eslint-disable-next-line no-unused-vars
  const { dir, root, base, name, ext } = path.parse(absolutePath)

  let metadata
  try {
    metadata = await sharp(absolutePath).metadata()
  } catch (err) {
    throw new Error(`Failed to process image ${absolutePath}`, err)
  }
  const { width, height, density } = metadata

  return {
    extension: ext.substr(1),
    absolutePath,
    name,
    base,
    contentDigest: await getContentDigest(absolutePath),
    width,
    height,
    aspectRatio: height / width,
    density: density,
  }
}

export const getWidthList = (srcImg, options) => {
  return (
    options.widths ||
    [
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
  )
}

export const getClientSrc = (absolutePath, options) => {
  return '/' + relativePath(options.publicRoot, absolutePath)
}

export const getJobList = (srcFile, options) => {
  // list of output widths
  const widths = getWidthList(srcFile, options)

  // args hash (used inside the loop to generate output file names)
  const argsDigest = hasha(sigmund(options)).substr(0, 8)

  // jobs to pass to imageSharp
  const jobs = []

  // for each destination width
  widths.forEach((width) => {
    // for each format
    options.outputFormats.forEach((format) => {
      // output file
      const outputFile = path.join(
        options.outputDir,
        `${srcFile.name}-${srcFile.contentDigest}-${argsDigest}.${format}`,
      )

      // add that to the list
      jobs.push({
        original: srcFile.absolutePath,
        width,
        quality: options.quality,
        absolutePath: outputFile,
        clientSrc: getClientSrc(outputFile, options),
      })
    })
  })

  return jobs
}

export const runJob = async ({ original, width, quality, absolutePath }) => {
  return sharp(original)
    .resize(width)
    .jpeg({ quality })
    .webp({ quality })
    .toFile(absolutePath)
}

// note this progress bar is in file-level scope
// and will be shared between multiple resize operations
const bar = new ProgressBar(
  `Generating responsive images [:bar] :current/:total :elapsed secs :percent`,
  {
    total: 0,
    width: 30,
  },
)

// runs the jobs while updating the progress bar
const runJobs = async (jobs) => {
  bar.total += jobs.length

  return pMapSeries(jobs, async (job) => {
    const jobResult = await runJob(job)
    bar.tick()
    return jobResult
  })
}

export const getBase64 = async (srcImg, options) => {
  const base64Height = Math.max(
    1,
    Math.round(options.base64Width * srcImg.aspectRatio),
  )
  return await base64({
    file: srcImg,
    args: {
      // duotone: options.duotone,
      // grayscale: options.grayscale,
      // rotate: options.rotate,
      width: options.base64Width,
      height: base64Height,
    },
  })
}

export const optsFromArgs = (srcImg, args) => {
  // normalize args
  const defaultArgs = {
    maxWidth: 3840,
    quality: 50,
    outputFormats: ['jpeg', 'webp'],
    base64Width: 20,
    outputDir: process.cwd(),
    publicRoot: process.cwd(),
    sizes: `(max-width: ${srcImg.width}px) 100vw, ${srcImg.height}px`,
  }
  const options = Object.assign({}, defaultArgs, args)

  if (!isInside(options.outputDir, options.publicRoot)) {
    throw new Error('Output dir is not inside public root')
  }

  if (!options.outputFormats.length) {
    throw new Error('Need at least one output format.')
  }

  if (Array.isArray(options.widths) && options.widths.lengths === 0) {
    throw new Error('No widths were specified.')
  }

  return options
}

export const responsiveSizes = async (file, args) => {
  // load a bunch of metadata about the image
  const srcImg = await srcInfo(file)

  const options = optsFromArgs(srcImg, args)

  // make space for the output files
  if (options.outputDir) {
    fs.mkdirp(options.outputDir)
  }

  // get a list of transformation jobs
  const transformJobs = getJobList(srcImg, options)

  // run the jobs (we'll make some other calcs while we wait)
  const runningJobs = runJobs(transformJobs)

  // create srcSet
  const srcSet = transformJobs
    .map((image) => `${image.clientSrc} ${Math.round(image.width)}w`)
    .join(`,\n`)

  // use the closest image to our optimal width as fallback
  const fallbackSrc = _.minBy(transformJobs, (image) =>
    Math.abs(options.maxWidth - image.width),
  ).clientSrc

  // get base64
  const base64Image = await getBase64(srcImg, options)

  // wait for all jobs to finish (so output file is valid)
  await runningJobs

  return {
    base64: base64Image.src,
    aspectRatio: srcImg.aspectRatio,
    src: fallbackSrc,
    srcSet,
    sizes: options.sizes,
    density: srcImg.density,
    presentationWidth: srcImg.width,
    presentationHeight: srcImg.height,
  }
}
