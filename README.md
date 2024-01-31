# treei

[![npm](https://img.shields.io/badge/npm-1.1.0-blue)](https://www.npmjs.com/package/treei)

`treei` is a node command line tool to generate directory structure tree

## Installation

```bash
npm i treei -g
```

## Usage

```bash
$ treei -h
Usage: treei [options]

Generate a directory structure tree

Options:
  -V, --version          output the version number
  -i, --ignore <ig>      ignore specific directory name, separated by comma or '|'
  -d, --depth <depth>    specify the depth of output
  -f, --only-folder      output folder only
  --icon                 output emoji icon, prefixing filename or directory
  -o, --output <output>  export content into a file, appending mode by default
  -h, --help             display help for command
```

## Examples

Ignore `.git` and `node_modules` directory

```bash
$ treei -i '.git,node_modules' # or treei -i'git|node_modules'
treei
├──.gitignore
├──package-lock.json
├──package.json
├──README.md
└──src
|   └──index.js
```

Show emoji icon, prefixing filename or directory

```bash
$ treei -i '.git,node_modules' --icon
treei
├──📄.gitignore
├──📄package-lock.json
├──📄package.json
├──📄README.md
└──📁src
|   └──📄index.js
```

Export output into result.md, and append mode by default.

```bash
$ treei -i '.git,node_modules' -o result.md
treei
├──.gitignore
├──package-lock.json
├──package.json
├──README.md
└──src
|   └──index.js
```
