const got = require('got')
const matter = require('gray-matter')

function findAnswer(options) {
  console.log('loading content from GitHub')
  return got(
    'https://raw.githubusercontent.com/whmountains/wings-patagonia-data/master/content/home.md',
  ).then(response => {
    const output = {
      code: `
          module.exports = ${JSON.stringify(matter(response.body).data)}
        `,
      // Don't fetch from GitHub on every build
      cacheable: true,
    }
    console.log(output)
    return output
  })
}

module.exports = findAnswer
