const { emoji, characters } = require('./config')

function generate(data, options = {}, deep = 0) {
  let output = ''

  data.forEach((item, index) => {
    const borderPrefix = (characters.border + ' '.repeat(3)).repeat(deep)
    let contentPrefix = index === data.length - 1 ? characters.last : characters.contain 
    contentPrefix += characters.line.repeat(2)
    const content = options.icon ? `${emoji[item.type]}${item.name}` : `${item.name}`

    let currentLineStr = `${borderPrefix}${contentPrefix}${content}`
    currentLineStr += '\n'
    output += currentLineStr
    
    if (item.children) { // directory
      output += generate(item.children, options, deep + 1)
    }
  })

  return output
}

module.exports = generate