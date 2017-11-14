const chalk = require('chalk')
const fs = require('mz/fs')
const path = require('path')
const globby = require('globby')

const paths = ['/']

main()

async function main() {
  console.log(chalk.blue('Loading render bundle ==>'))
  const outBundles = await globby(['./build/static/js/bundle*.js'])
  const { render } = require(outBundles[0])

  console.log(chalk.blue('rendering HTML ==>'))

  // load the template file
  const template = await fs.readFile(path.join(__dirname, './build/tpl.html'), {
    encoding: 'utf8',
  })

  paths.forEach(p => {
    const { html, css } = render({ p })
    fs.writeFile(
      path.join(__dirname, `./build`, p, `index.html`),
      template
        .replace('</head>', css + '</head>')
        .replace('<div id="root">', '<div id="root">' + html),
    )
  })

  console.log(chalk.green('Done with static rendering!'))
}
