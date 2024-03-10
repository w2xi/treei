import fs from 'fs'

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
