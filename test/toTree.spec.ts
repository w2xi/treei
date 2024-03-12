import { describe, test, expect } from 'vitest'
import { toTree } from '../src/toTree'
import { Options } from '../src/type'
import { NodeTypes } from '../src/config'
import { getMaxLayer } from '../src/utils'

describe('toTree', () => {
  const options = {
    directory: process.cwd(),
    ignore: '.git,node_modules',
    strategy: 'bfs'
  } as Options
  test('root type', () => {
    const result = toTree(options)
    expect(result.type).toBe(NodeTypes.ROOT)
  })

  test('ignore .git,node_modules', () => {
    const result = toTree(options)
    const ignore = (options.ignore as string).split(',')
    for (let i = 0; i < result.children!.length; i++) {
      expect(ignore.includes(result.children![i].name)).toBe(false)
    }
  })

  test('1 layer', () => {
    const result = toTree({ ...options, layer: 1 })
    const wantedLayer = 1
    const layer = getMaxLayer(result)
    expect(layer).toBe(wantedLayer)
  })

  test('2 layer', () => {
    const result = toTree({ ...options, layer: 2 })
    const wantedLayer = 2
    const layer = getMaxLayer(result)
    expect(layer).toBe(wantedLayer)
  })

  test('only folder', () => {
    const result = toTree({ ...options, onlyFolder: true })
    for (let i = 0; i < result.children!.length; i++) {
      expect(result.children![i].type).toBe(NodeTypes.DIRECTORY)
    }
  })
})
