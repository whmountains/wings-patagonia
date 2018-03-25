import path from 'path'
import sharp from 'sharp'
import fs from 'fs-extra'
import {
  srcInfo,
  getWidthList,
  getClientSrc,
  getJobList,
  runJob,
  getBase64,
  optsFromArgs,
  responsiveSizes,
} from './'

beforeAll(async () => {
  return fs.mkdirp(path.join(__dirname, 'artifacts'))
})

const srcFile = {
  absolutePath: path.join(__dirname, 'simon-matzinger-320332-unsplash.jpg'),
  aspectRatio: 0.6430121527777778,
  base: 'simon-matzinger-320332-unsplash.jpg',
  contentDigest: '23890d28',
  density: 72,
  extension: 'jpg',
  height: 2963,
  name: 'simon-matzinger-320332-unsplash',
  width: 4608,
}

test('loads src metadata', () => {
  expect.assertions(1)

  return expect(
    srcInfo(path.join(__dirname, 'simon-matzinger-320332-unsplash.jpg')),
  ).resolves.toEqual(srcFile)
})

const defaultOptions = {
  maxWidth: 3840,
  quality: 50,
  outputFormats: ['jpeg', 'webp'],
  base64Width: 20,
  sizes: `(max-width: ${srcFile.width}px) 100vw, ${srcFile.height}px`,
  outputDir: path.join(__dirname, 'artifacts'),
  publicRoot: __dirname,
}

test('returns list of widths', () => {
  expect(getWidthList(srcFile, defaultOptions)).toMatchSnapshot()
})

test('creates a client src', () => {
  const imaginaryDstPath = path.join(__dirname, 'artifacts', srcFile.base)
  const desiredClientSrc = '/' + path.join('artifacts', srcFile.base)

  expect(getClientSrc(imaginaryDstPath, defaultOptions)).toBe(desiredClientSrc)
})

test('job list', () => {
  expect(getJobList(srcFile, defaultOptions)).toMatchSnapshot()
})

const job = {
  absolutePath: path.join(
    __dirname,
    'artifacts',
    'simon-matzinger-320332-unsplash-23890d28-0cd635f1.webp',
  ),
  clientSrc:
    '/artifacts/simon-matzinger-320332-unsplash-23890d28-0cd635f1.webp',
  compression: defaultOptions.quality,
  original: srcFile.absolutePath,
  width: 960,
}

test('run job', async () => {
  expect.assertions(1)

  await runJob(job)
  return expect(sharp(job.absolutePath).metadata()).resolves.toMatchSnapshot()
})

test('Base64 preview', () => {
  expect.assertions(1)

  return expect(getBase64(srcFile, defaultOptions)).resolves.toMatchSnapshot()
})

test('optsFromArgs', () => {
  expect(optsFromArgs(srcFile)).toMatchSnapshot()
})

test(
  'responsiveSizes',
  () => {
    expect.assertions(1)

    return expect(
      responsiveSizes(srcFile.absolutePath, {
        outputDir: path.join(__dirname, 'artifacts'),
      }),
    ).resolves.toMatchSnapshot()
  },
  30000,
)
