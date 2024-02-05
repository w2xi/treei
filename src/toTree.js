const fs = require('fs')
const { isDirectory } = require('./utils')

// The difference between statSync and lstatSync
// https://stackoverflow.com/questions/32478698/what-is-the-different-between-stat-fstat-and-lstat-functions-in-node-js

function toTree(path, options = {}) {
  if (isDirectory(path)) {
    let dir = fs.readdirSync(path)
    const ignoreList = options.ignore || []

    if (ignoreList.length) {
      dir = dir.filter(child => !ignoreList.includes(child))
    }
    if (options.onlyFolder) {
      dir = dir.filter(child => isDirectory(`${path}/${child}`))
    }
    const children = dir.map(child => toTree(`${path}/${child}`))
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

module.exports = toTree