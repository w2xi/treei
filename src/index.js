#!/usr/bin/env node

const fs = require('fs')
const { program } = require('commander')
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
  .option('-i, --ignore <ig>', 'ignore specific directory name')
  .option('-d, --depth <depth>', 'specify the depth of output')
  .option('-f, --only-folder', 'output folder only')
  .option('--icon', 'output emoji icon, prefixing filename or directory')
  .option('-o, --output <output>', 'export content into a file')
  .parse(process.argv)

const options = program.opts()

let ignoreList = []
if (options.ignore) {
  ignoreList = options.ignore.replace(/\s*/g, '').split(/,|\|/)
}

// The difference between statSync and lstatSync
// https://stackoverflow.com/questions/32478698/what-is-the-different-between-stat-fstat-and-lstat-functions-in-node-js

function toTree(path, deep = 0) {
  const stats = fs.lstatSync(path)
  
  if (stats.isDirectory()) {
    let dir = fs.readdirSync(path)

    if (ignoreList.length) {
      dir = dir.filter(child => !ignoreList.includes(child))
    }
    if (options.onlyFolder) {
      dir = dir.filter(child => {
        const childStats = fs.lstatSync(`${path}/${child}`)
        return childStats.isDirectory()
      })
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

const root = toTree(process.cwd())

let depth
if (options.depth && !Number.isNaN(parseInt(options.depth))) {
  depth = parseInt(options.depth)
}

function isReachedDepth(deep) {
  return typeof depth === 'number' && deep >= depth
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
    
    if (item.children) {
      // 目录
      output += currentLineStr
      generateTreeStructure(item.children, deep + 1)
    } else {
      // 文件
      output += currentLineStr
    }
  })
}

generateTreeStructure(root.children)

if (options.output) {
  let outputString = output
  if (fileExistSync(options.output)) { // 追加处理
    outputString = '\n' + output
  }
  fs.appendFile(options.output, outputString, (err) => {
    if (err) throw err
  })
}

// 检测文件或文件夹是否存在
function fileExistSync(path) {
  try {
    fs.accessSync(path, fs.constants.F_OK)
  } catch(e) {
    return false
  }
  return true
}

console.log(root.name)
console.log(output)