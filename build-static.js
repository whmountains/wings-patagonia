const { render } = require('./build/static/js/bundle')
const chalk = require('chalk')
const fs = require('mz/fs')
const path = require('path')

const paths = ['/']

console.log(chalk.blue('rendering HTML ==>'))

const template = fs.readFile(path.join(__dirname, './build/tpl.html'), {
  encoding: 'utf8',
})

paths.forEach(p => {
  const { html, css } = render({ p })
  template.then(tpl => {
    return fs.writeFile(
      path.join(__dirname, `./build`, p, `index.html`),
      tpl
        .replace('</head>', css + '</head>')
        .replace('<div id="root">', '<div id="root">' + html),
    )
  })
})

console.log(chalk.green('Done with static rendering!'))
