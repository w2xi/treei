#!/usr/bin/env node

const fs = require('fs')
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

function toTree(path) {
  const stats = fs.statSync(path)
  
  if (stats.isDirectory()) {
    const dir = fs.readdirSync(path)
    const temp = dir.filter(child => child !== 'node_modules').map(child => {
      return toTree(`${path}/${child}`)
    })
    const dirName = path.split('/').pop()
    return {
      type: 'directory',
      name: dirName,
      children: temp
    }
  } else {
    return {
      type: 'file',
      name: path.split('/').pop(),
    }
  }
}

const result = toTree(process.cwd())

let output = ''

function generateTreeStructure(data, deep = 0) {
  data.forEach((item, index) => {
    let contentPrefix = index === data.length - 1 ? characters.last : characters.contain 
    contentPrefix += characters.line.repeat(2)
    const borderPrefix = (characters.border + ' '.repeat(2)).repeat(deep)
    const str = borderPrefix + contentPrefix + ' ' + item.name + '\n'
    
    if (item.children) {
      // 目录
      output += str
      generateTreeStructure(item.children, deep + 1)
    } else {
      // 文件
      output += str
    }
  })
}

generateTreeStructure(result.children)

console.log(result.name);
console.log(output);