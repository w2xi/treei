import fs from 'fs'
import { TreeNode } from './type'

// check if a file or directory exists.
export function fileExistSync(path: string) {
  try {
    fs.accessSync(path, fs.constants.F_OK)
  } catch (e) {
    return false
  }
  return true
}

export function isDirectory(path: string) {
  const stats = fs.lstatSync(path)
  return stats.isDirectory()
}

export function getMaxLayer(data: TreeNode) {
  if (!data.children) return 0
  let max = 0
  for (let i = 0; i < data.children.length; i++) {
    const child = data.children[i]
    if (child.children && child.children.length) {
      max = Math.max(max, getMaxLayer(child))
    }
  }
  return max + 1
}
