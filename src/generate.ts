import { emoji, characters, NodeTypes } from './config'
import { blue } from 'picocolors'
import type { Options, TreeNode } from './type'

const lastDirStack: boolean[] = []

export function generate(
  data: TreeNode['children'],
  options: Options,
  deep = 0
) {
  let output = ''

  data!.forEach((item, index) => {
    let isParentAllLeaf = false
    if (lastDirStack.length === 1) {
      isParentAllLeaf = lastDirStack[0]
    } else {
      isParentAllLeaf =
        !!lastDirStack.length &&
        lastDirStack.slice(0, lastDirStack.length - 1).every((item) => item)
    }
    const borderPrefix = (
      (isParentAllLeaf ? ' ' : characters.border) + ' '.repeat(3)
    ).repeat(deep)
    let contentPrefix =
      index === data!.length - 1 ? characters.last : characters.contain
    contentPrefix += characters.line.repeat(2)

    const name = item.type === NodeTypes.DIRECTORY ? blue(item.name) : item.name
    const content = options.icon
      ? `${emoji[item.type as keyof typeof emoji]}${name}`
      : `${name}`

    let currentLineStr = `${borderPrefix}${contentPrefix}${content}`
    currentLineStr += '\n'
    output += currentLineStr

    const isLastItemDirectory =
      index === data!.length - 1 && item.type === NodeTypes.DIRECTORY
    lastDirStack[deep] = isLastItemDirectory

    if (item.children && item.children.length > 0) {
      output += generate(item.children, options, deep + 1)
    }
  })
  lastDirStack.pop()

  return output
}
