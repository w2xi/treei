import { describe, expect, test } from 'vitest'
import { sort } from '../src/sort'

describe('sort', () => {
  test("sort it just like vscode's directory structure", () => {
    const dir = [
      '.git',
      '.github',
      '.gitignore',
      '.prettierrc.mjs',
      'CHANGELOG.md',
      'LICENSE',
      'pnpm-lock.yaml',
      'package.json',
      'README.md',
      'src',
      'test',
    ]
    const result = sort(dir, process.cwd())
    expect(result).toEqual([
      '.git',
      '.github',
      'src',
      'test',
      '.gitignore',
      '.prettierrc.mjs',
      'CHANGELOG.md',
      'LICENSE',
      'package.json',
      'pnpm-lock.yaml',
      'README.md',
    ])
  })

  test('empty dir', () => {
    const dir = []
    const result = sort(dir, process.cwd())
    expect(result).toEqual([])
  })
})
