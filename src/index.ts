#!/usr/bin/env node

import { program } from 'commander'
import { toTree } from './toTree'
import { generate } from './generate'
import pkg from '../package.json'
import { handleOptions, onExits } from './handleOptions'
import { Options } from './type'

program
  .name('treei')
  .version(pkg.version)
  .description('Generate a directory structure tree')
  .option(
    '-i, --ignore <ig>',
    "ignore specific directory name, separated by comma or '|'"
  )
  .option('-l, --layer <layer>', 'specify the layer of output')
  .option(
    '-d, --directory <dir>',
    'specify the directory to generate structure tree',
    process.cwd()
  )
  .option('-f, --only-folder', 'output folder only')
  .option('--icon', 'output emoji icon, prefixing filename or directory')
  .option(
    '-o, --output <output>',
    'export content into a file, appending mode by default'
  )
  .parse(process.argv)

const options = handleOptions(program.opts() as Options)

const root = toTree(options)
const result = generate(root.children, options)

onExits.forEach((onExit) => onExit(result))

console.log(root.path)
console.log(result)
