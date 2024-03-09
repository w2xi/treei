const { emoji, characters } = require('./config')

const lastDirStack = []
function generate(data, options = {}, deep = 0) {
  let output = ''

  data.forEach((item, index) => {
    let isParentAllLeaf = false
    if (lastDirStack.length === 1) {
      isParentAllLeaf = lastDirStack[0]
    } else {
      isParentAllLeaf = lastDirStack.length && lastDirStack.slice(0, lastDirStack.length - 1).every(item => item)
    }
    const borderPrefix = ((isParentAllLeaf ? ' ': characters.border) + ' '.repeat(3)).repeat(deep)
    let contentPrefix = index === data.length - 1 ? characters.last : characters.contain 
    contentPrefix += characters.line.repeat(2)
    const content = options.icon ? `${emoji[item.type]}${item.name}` : `${item.name}`

    let currentLineStr = `${borderPrefix}${contentPrefix}${content}`
    currentLineStr += '\n'
    output += currentLineStr

    const isLastItemDirectory = index === data.length - 1 && item.type === 'directory'
    lastDirStack[deep] = isLastItemDirectory
    
    if (item.children && item.children.length > 0) {
      output += generate(item.children, options, deep + 1)
    }
  })
  lastDirStack.pop()

  return output
}

module.exports = generate