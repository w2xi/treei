import fs from 'fs'
import { fileExistSync } from './utils'
import type { Options } from './type'

export const onExits: ((output: string) => void)[] = []

export function handleOptions(options: Options) {
  if (options.ignore) {
    options.ignore = (options.ignore as string)
      .replace(/\s*/g, '')
      .split(/,|\|/)
  }
  if (
    options.layer &&
    !Number.isNaN(parseInt(options.layer as unknown as string))
  ) {
    options.layer = parseInt(options.layer as unknown as string)
  }
  if (options.output) {
    onExits.push((result) => {
      let outputString = result
      if (fileExistSync(options.output!)) {
        // appending mode
        outputString = '\n```\n' + result + '```'
      }
      fs.appendFile(options.output!, outputString, (err) => {
        if (err) throw err
      })
    })
  }

  return options
}
