const { render } = require('./build/static/js/bundle')
const chalk = require('chalk')
const fs = require('mz/fs')
const path = require('path')

const paths = ['/']

console.log(chalk.blue('rendering HTML ==>'))

const template = fs.readFile(path.join(__dirname, './build/tpl.html'), {
  encoding: 'utf8',
})

const { html, css } = render({ path })
template.then(index => {
  return fs.writeFile(
    path.join(__dirname, './build/index.html'),
    index
      .replace('</head>', css + '</head>')
      .replace('<div id="root">', '<div id="root">' + html),
  )
})

console.log(chalk.green('Done!'))
