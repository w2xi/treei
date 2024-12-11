import { NodeTypes } from './config'

export interface Options {
  directory: string
  ignore?: string | string[]
  onlyFolder?: boolean
  layer?: number
  strategy?: string
  icon?: boolean
  output?: string
}

export interface TreeNode {
  type: (typeof NodeTypes)[keyof typeof NodeTypes]
  name: string
  path?: string
  children?: TreeNode[]
}
