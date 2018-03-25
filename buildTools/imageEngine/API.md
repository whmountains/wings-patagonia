Ideal image API

## Parameter Currying

Auto-currying to easily generate factories for different image types.

## Smart Image Sizing

Create a size-set by passing percentage of viewport width or height. We refer to a list of known popular device sizes and resolutions and generate a corresponding set.

## How it works

Input inspector. Get's the input hash, dimensions, aspect ratio, etc.

Job Generator, which reads the config and generates transform jobs.

Output filename maker, which takes a transform job and generates a filename.

Job executor, which reads a job and does it.

Base64 creator

svg tracer

```js
const inputFile = getInputInfo
const jobs = generateJobs(inputFile)
const outputImages = pMapSeq(jobs, execJob)

Get srcSet, get fallback, get base64, get svg

Return everything in the proper format
```
