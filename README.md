# treei

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
  -i, --ignore <ig>      ignore specific directory name
  -d, --depth <depth>    specify the depth of output
  -f, --only-folder      output folder only
  --icon                 output emoji icon, prefixing filename or directory
  -o, --output <output>  export content into a file
  -h, --help             display help for command
```

## Examples

```bash
$ treei -i '.git,node_modules'
treei
├──.gitignore
├──package-lock.json
├──package.json
├──README.md
└──src
|   └──index.js
```

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

```bash
$ treei -i '.git,node_modules' -o result.md
treei
├──.gitignore
├──package-lock.json
├──package.json
├──README.md
└──src
|   └──index.js

# The output has been saved into ./result.md
```