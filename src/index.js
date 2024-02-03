#!/usr/bin/env node

const fs = require('fs')
const { program } = require('commander')
const { fileExistSync, isDirectory } = require('./utils')
const package = require('../package.json')

const map = {
  directory: '📁',
  file: '📄',
}
const characters = {
	border: '|',
	contain: '├',
	line: '─',
	last: '└'
}

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

let ignoreList = []
if (options.ignore) {
  ignoreList = options.ignore.replace(/\s*/g, '').split(/,|\|/)
}

// The difference between statSync and lstatSync
// https://stackoverflow.com/questions/32478698/what-is-the-different-between-stat-fstat-and-lstat-functions-in-node-js

function toTree(path, deep = 0) {
  if (isDirectory(path)) {
    let dir = fs.readdirSync(path)

    if (ignoreList.length) {
      dir = dir.filter(child => !ignoreList.includes(child))
    }
    if (options.onlyFolder) {
      dir = dir.filter(child => isDirectory(`${path}/${child}`))
    }
    const children = dir.map(child => toTree(`${path}/${child}`, deep + 1))
    const dirName = path.split('/').pop()

    return {
      type: 'directory',
      name: dirName,
      children,
    }
  } else {
    return {
      type: 'file',
      name: path.split('/').pop(),
    }
  }
}

const root = toTree(options.directory)

let level
if (options.level && !Number.isNaN(parseInt(options.level))) {
  level = parseInt(options.level)
}

function isReachedDepth(deep) {
  return typeof level === 'number' && deep >= level
}

let output = ''

function generateTreeStructure(data, deep = 0) {
  if (isReachedDepth(deep)) return

  data.forEach((item, index) => {
    const borderPrefix = (characters.border + ' '.repeat(3)).repeat(deep)
    let contentPrefix = index === data.length - 1 ? characters.last : characters.contain 
    contentPrefix += characters.line.repeat(2)
    const content = options.icon ? `${map[item.type]}${item.name}` : `${item.name}`
    let currentLineStr = `${borderPrefix}${contentPrefix}${content}`

    currentLineStr += '\n'
    
    if (item.children) { // directory
      output += currentLineStr
      generateTreeStructure(item.children, deep + 1)
    } else { // file
      output += currentLineStr
    }
  })
}

generateTreeStructure(root.children)

if (options.output) {
  let outputString = output
  if (fileExistSync(options.output)) { // appending mode
    outputString = '\n' + output
  }
  fs.appendFile(options.output, outputString, (err) => {
    if (err) throw err
  })
}

console.log(root.name)
console.log(output)