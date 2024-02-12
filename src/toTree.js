const fs = require('fs')
const { isDirectory } = require('./utils')

// The difference between statSync and lstatSync
// https://stackoverflow.com/questions/32478698/what-is-the-different-between-stat-fstat-and-lstat-functions-in-node-js

// strategy: dfs or bfs, but bfs by default
function toTree(options = {}) {
  const { strategy, directory } = options
  
  if (strategy === 'bfs') {
    return bfs(directory, options)
  } else {
    return dfs(directory, options)
  }
}

function dfs(path, options = {}) {
  if (isDirectory(path)) {
    let dir = fs.readdirSync(path)
    const ignore = options.ignore || []

    if (ignore.length) {
      dir = dir.filter(child => !ignore.includes(child))
    }
    if (options.onlyFolder) {
      dir = dir.filter(child => isDirectory(`${path}/${child}`))
    }
    const children = dir.map(child => dfs(`${path}/${child}`, options))
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

function bfs(path, options = {}) {
  let deep = 0
  const { ignore, onlyFolder, layer } = options
  const root = {
    path,
    name: path,
    type: 'root',
    children: [],
  }
  const queue = [root]

  while (queue.length) {
    const node = queue.shift()
    const { path, children } = node
    const dir = fs.readdirSync(path)

    if (layer && deep >= layer) break

    deep++

    for (let i = 0; i < dir.length; i++) {
      const item = dir[i]
      if (ignore && ignore.includes(item)) continue
      const childPath = `${path}/${item}`
      const isDir = isDirectory(childPath)
      if (onlyFolder && !isDir) continue

      const childItem = {
        path: childPath,
        name: item,
        type: isDir ? 'directory' : 'file',
      }
      if (isDir) {
        queue.push(childItem)
        childItem.children = []
      }
      children.push(childItem)
    }
  }

  return root
}

module.exports = toTree