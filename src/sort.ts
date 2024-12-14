import { resolve } from 'path'
import { isDirectory } from './utils'
import type { SortCategory } from './type'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
const collator = new Intl.Collator('en', { sensitivity: 'base' })

export function sort(dir: string[], path: string) {
  const map: SortCategory = {
    HIDDEN_FILES: [],
    HIDDEN_DIRECTORIES: [],
    FILES: [],
    DIRECTORIES: [],
  }

  for (let i = 0; i < dir.length; i++) {
    const item = dir[i]
    if (isDirectory(resolve(path, item))) {
      if (item.startsWith('.')) {
        map.HIDDEN_DIRECTORIES.push(item)
      } else {
        map.DIRECTORIES.push(item)
      }
    } else {
      if (item.startsWith('.')) {
        map.HIDDEN_FILES.push(item)
      } else {
        map.FILES.push(item)
      }
    }
  }

  return map.HIDDEN_DIRECTORIES.sort(collator.compare).concat(
    map.DIRECTORIES.sort(collator.compare),
    map.HIDDEN_FILES.sort(collator.compare),
    map.FILES.sort(collator.compare)
  )
}
