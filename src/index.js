#!/usr/bin/env node

const fs = require('fs')
const { program } = require('commander')
const { fileExistSync } = require('./utils')
const toTree = require('./toTree')
const generate = require('./generate')
const package = require('../package.json')
const { defaultOptions } = require('./config')

program
  .name('treei')
  .version(package.version)
  .description('Generate a directory structure tree')
  .option('-i, --ignore <ig>', 'ignore specific directory name, separated by comma or \'|\'')
  .option('-l, --layer <layer>', 'specify the layer of output')
  .option('-d, --directory <dir>', 'specify the directory to generate structure tree', process.cwd())
  .option('-f, --only-folder', 'output folder only')
  .option('--icon', 'output emoji icon, prefixing filename or directory')
  .option('-o, --output <output>', 'export content into a file, appending mode by default')
  .parse(process.argv)

let options = program.opts()

const onExits = []

function handleOptions() {
  if (options.ignore) {
    options.ignore = options.ignore.replace(/\s*/g, '').split(/,|\|/)
  }
  if (options.layer && !Number.isNaN(parseInt(options.layer))) {
    options.layer = parseInt(options.layer)
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

  // merge options
  options = Object.assign(defaultOptions, options)
}

handleOptions()

const root = toTree(options)
const result = generate(root.children, options)

onExits.forEach(onExit => onExit(result))

console.log(root.name)
console.log(result)