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
const cacache = require('cacache/en')

const { notMemoizedbase64 } = require('./gatsbySharp')

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
      const outputName = `${srcFile.name}-${
        srcFile.contentDigest
      }-${argsDigest}.${format}`
      const outputFile = path.join(options.outputDir, outputName)

      // add that to the list
      jobs.push({
        format,
        original: srcFile.absolutePath,
        width,
        quality: options.quality,
        absolutePath: outputFile,
        clientSrc: getClientSrc(outputFile, options),
        cacheDir: options.cacheDir,
        slug: outputName,
      })
    })
  })

  return jobs
}

export const runJob = async ({
  original,
  width,
  quality,
  absolutePath,
  format,
  cacheDir,
  slug,
}) => {
  if (await fs.pathExists(absolutePath)) {
    return
  }

  try {
    const { data } = await cacache.get(cacheDir, slug)
    await fs.writeFile(absolutePath, data)
    return true
  } catch (e) {
    let pipeline = sharp(original).resize(width)

    if (format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality })
    } else if (format === 'webp') {
      pipeline = pipeline.webp({ quality })
    }

    await pipeline.toFile(absolutePath)
    return false
  }
}

// runs the jobs while updating the progress bar
const runJobs = async (srcImg, jobs) => {
  // don't show the progress bar until we know we don't have a cached file
  let bar
  let ticks = 0
  const maybeTick = (wasCached) => {
    ticks++
    if (bar) {
      bar.tick()
    } else if (!wasCached) {
      bar = new ProgressBar(
        `Generating responsive sizes for ${
          srcImg.base
        } [:bar] :current/:total :elapsed secs :percent`,
        {
          total: jobs.length,
          curr: ticks,
        },
      )
    }
  }

  // run each job in turn
  // (technically we don't need map, it's there for historical reasons.)
  return pMapSeries(jobs, async (job) => {
    const wasCached = await runJob(job)
    maybeTick(wasCached)
  })
}

export const getBase64 = async (srcImg, options) => {
  const base64Height = Math.max(
    1,
    Math.round(options.base64Width * srcImg.aspectRatio),
  )
  return await notMemoizedbase64({
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
    cacheDir: path.join(process.cwd(), '.cache'),
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

  // set defaults undefined options and run some basic sanity checks
  const options = optsFromArgs(srcImg, args)

  // make space for the output files
  if (options.outputDir) {
    fs.mkdirp(options.outputDir)
  }

  // get a list of transformation jobs
  const transformJobs = getJobList(srcImg, options)

  // run the jobs (we'll make some other calcs while we wait)
  const runningJobs = runJobs(srcImg, transformJobs)

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

  const retVal = {
    base64: base64Image.src,
    aspectRatio: srcImg.aspectRatio,
    src: fallbackSrc,
    srcSet,
    sizes: options.sizes,
    density: srcImg.density,
    presentationWidth: srcImg.width,
    presentationHeight: srcImg.height,
  }

  // console.log(retVal)

  return retVal
}
