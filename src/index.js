#!/usr/bin/env node

const fs = require('fs')
const { program } = require('commander')
const { fileExistSync } = require('./utils')
const toTree = require('./toTree')
const generate = require('./generate')
const package = require('../package.json')

program
  .name('treei')
  .version(package.version)
  .description('Generate a directory structure tree')
  .option('-i, --ignore <ig>', 'ignore specific directory name, separated by comma or \'|\'')
  .option('-l, --level <level>', 'specify the level of output')
  .option('-d, --directory <dir>', 'specify the directory to generate structure tree', process.cwd())
  .option('-f, --only-folder', 'output folder only')
  .option('--icon', 'output emoji icon, prefixing filename or directory')
  .option('-o, --output <output>', 'export content into a file, appending mode by default')
  .parse(process.argv)

const options = program.opts()

const onExits = []

function handleOptions() {
  if (options.ignore) {
    options.ignore = options.ignore.replace(/\s*/g, '').split(/,|\|/)
  }
  if (options.level && !Number.isNaN(parseInt(options.level))) {
    options.level = parseInt(options.level)
  }
  if (options.output) {
    onExits.push((result) => {
      let outputString = result
      if (fileExistSync(options.output)) { // appending mode
        outputString = '\n' + result
      }
      fs.appendFile(options.output, outputString, (err) => {
        if (err) throw err
      })
    })
  }
}

handleOptions()

const root = toTree(options.directory, options)
const result = generate(root.children, options)

onExits.forEach(onExit => onExit(result))

console.log(root.name)
console.log(result)