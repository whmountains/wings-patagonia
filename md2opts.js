const grayMatter = require('gray-matter')
const fs = require('mz/fs')
const path = require('path')
const decamelize = require('decamelize')
const titleize = require('titleize')
const PrettyError = require('pretty-error')

const pe = new PrettyError()

async function main() {
  const input = await fs.readFile(path.resolve(process.argv[2]), {
    encoding: 'utf8',
  })

  const params = grayMatter(input).data

  Object.keys(params).forEach(key => {
    const title = titleize(decamelize(key, ' '))
    console.log(`- {label: ${title}, name: ${key}, widget: string}`)
  })
}

main().catch(e => console.log(pe.render(e)))
