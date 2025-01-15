import { NodeTypes } from './config'

export interface Options {
  directory: string
  ignore?: string | string[]
  onlyFolder?: boolean
  layer?: number
  icon?: boolean
  output?: string
  clipboard?: boolean
}

export interface TreeNode {
  type: (typeof NodeTypes)[keyof typeof NodeTypes]
  name: string
  path?: string
  children?: TreeNode[]
}

export interface SortCategory {
  HIDDEN_FILES: string[]
  HIDDEN_DIRECTORIES: string[]
  FILES: string[]
  DIRECTORIES: string[]
}
