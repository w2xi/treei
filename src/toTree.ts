import fs from 'fs'
import { resolve } from 'path'
import { isDirectory } from './utils'
import { NodeTypes } from './config'
import { sort } from './sort'
import type { Options, TreeNode } from './type'

// The difference between statSync and lstatSync
// https://stackoverflow.com/questions/32478698/what-is-the-different-between-stat-fstat-and-lstat-functions-in-node-js

// strategy: dfs or bfs, but bfs by default
export function toTree(options: Options) {
  const { strategy, directory } = options

  if (strategy === 'bfs') {
    return bfs(directory, options)
  } else {
    return dfs(directory, options)
  }
}

function dfs(path: string, options: Options): TreeNode {
  const dirName = path.split('/').pop()
  if (isDirectory(path)) {
    let dir = fs.readdirSync(path)
    const ignore = options.ignore || []

    if (ignore.length) {
      dir = dir.filter((child) => !ignore.includes(child))
    }
    if (options.onlyFolder) {
      dir = dir.filter((child) => isDirectory(resolve(path, child)))
    }
    const children = dir.map((child) => dfs(resolve(path, child), options))

    return {
      type: NodeTypes.DIRECTORY,
      name: dirName!,
      children,
    }
  } else {
    return {
      type: NodeTypes.FILE,
      name: dirName!,
    }
  }
}

function bfs(path: string, options: Options) {
  const { ignore, onlyFolder, layer } = options
  const root: TreeNode = {
    path,
    name: path,
    type: NodeTypes.ROOT,
    children: [],
  }
  const queue = [root]

  let deep = 0

  while (queue.length) {
    if (layer && deep >= layer) break
    deep++

    let size = queue.length

    while (size--) {
      const node = queue.shift()
      const { path, children } = node!

      let dir = fs.readdirSync(path!)
      dir = sort(dir, path!)

      for (let i = 0; i < dir.length; i++) {
        const item = dir[i]

        if (ignore && ignore.includes(item)) continue

        const childPath = resolve(path!, item)
        const isDir = isDirectory(childPath)

        if (onlyFolder && !isDir) continue

        const childItem = {
          path: childPath,
          name: item,
          type: isDir ? NodeTypes.DIRECTORY : NodeTypes.FILE,
        } as TreeNode
        if (isDir) {
          queue.push(childItem)
          childItem.children = []
        }
        children && children.push(childItem)
      }
    }
  }

  return root
}
