import { describe, test, expect } from 'vitest'
import { handleOptions } from '../src/handleOptions'

describe('handleOptions', () => {
  const defaultOptions = {
    directory: process.cwd()
  }
  test('ignore', () => {
    const options = handleOptions({
      ...defaultOptions,
      ignore: '.git,node_modules'
    })
    expect(options.ignore).toEqual(['.git', 'node_modules'])
  })

  test('layer', () => {
    const options = handleOptions({
      ...defaultOptions,
      layer: 1
    })
    expect(options.layer).toBe(1)
  })

  test('directory', () => {
    const options = handleOptions(defaultOptions)
    expect(options.directory).toBe(process.cwd())
  })

  test('onlyFolder', () => {
    const options = handleOptions({
      ...defaultOptions,
      onlyFolder: true
    })
    expect(options.onlyFolder).toBe(true)
  })

  test('icon', () => {
    const options = handleOptions({ ...defaultOptions, icon: true })
    expect(options.icon).toBe(true)
  })

  test('output', () => {
    const options = handleOptions({
      ...defaultOptions,
      output: 'test.md'
    })
    expect(options.output).toBe('test.md')
  })
})
