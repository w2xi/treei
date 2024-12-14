import fs from 'fs'
import { basename, resolve } from 'path'
import { isDirectory } from './utils'
import { NodeTypes } from './config'
import { sort } from './sort'
import type { Options, TreeNode } from './type'

export function toTree(options: Options) {
  const { directory, ignore, onlyFolder, layer } = options
  const root: TreeNode = {
    path: directory,
    name: basename(directory),
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
