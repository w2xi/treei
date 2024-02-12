const fs = require('fs')

// check if a file or directory exists.
function fileExistSync(path) {
  try {
    fs.accessSync(path, fs.constants.F_OK)
  } catch(e) {
    return false
  }
  return true
}

function isDirectory(path) {
  const stats = fs.lstatSync(path)
  return stats.isDirectory()
}

function isNumber(value) {
  return typeof value === 'number'
}

module.exports = {
  fileExistSync,
  isDirectory,
  isNumber,
}