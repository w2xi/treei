# treei

[![npm](https://img.shields.io/npm/v/treei)](https://www.npmjs.com/package/treei)

`treei` is a node command line tool to generate directory structure tree.

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
  -l, --layer <layer>    specify the layer of output
  -d, --directory <dir>  specify the directory to generate structure tree
  -f, --only-folder      output folder only
  --icon                 output emoji icon, prefixing filename or directory
  -o, --output <output>  export content into a file, appending mode by default
  -c, --clipboard        copy the output to clipboard
  -h, --help             display help for command
```

## Examples

Ignore `.git` and `node_modules` directory.

```bash
$ treei -i '.git|node_modules' # or treei -i '.git,node_modules'
├──.github
|   └──workflows
|   |   ├──release.yml
|   |   └──test.yml
├──.vscode
|   └──settings.json
├──dist
|   └──index.js
├──src
|   ├──config.ts
|   ├──generate.ts
|   ├──handleOptions.ts
|   ├──index.ts
|   ├──sort.ts
|   ├──toTree.ts
|   ├──type.ts
|   └──utils.ts
├──test
|   ├──handleOptions.spec.ts
|   ├──sort.spec.ts
|   └──toTree.spec.ts
├──.editorconfig
├──.eslintrc
├──.gitignore
├──.prettierignore
├──.prettierrc.mjs
├──CHANGELOG.md
├──LICENSE
├──package.json
├──pnpm-lock.yaml
├──README.md
└──tsconfig.json
```

Show emoji icon, prefixing filename or directory.

```bash
$ treei -i '.git,node_modules' --icon
├──📁.github
|   └──📁workflows
|   |   ├──📄release.yml
|   |   └──📄test.yml
├──📁.vscode
|   └──📄settings.json
├──📁dist
|   └──📄index.js
├──📁src
|   ├──📄config.ts
|   ├──📄generate.ts
|   ├──📄handleOptions.ts
|   ├──📄index.ts
|   ├──📄sort.ts
|   ├──📄toTree.ts
|   ├──📄type.ts
|   └──📄utils.ts
├──📁test
|   ├──📄handleOptions.spec.ts
|   ├──📄sort.spec.ts
|   └──📄toTree.spec.ts
├──📄.editorconfig
├──📄.eslintrc
├──📄.gitignore
├──📄.prettierignore
├──📄.prettierrc.mjs
├──📄CHANGELOG.md
├──📄LICENSE
├──📄package.json
├──📄pnpm-lock.yaml
├──📄README.md
└──📄tsconfig.json
```

Export output into `result.md`, and append mode by default.

```bash
$ treei -i '.git,node_modules' --icon -o result.md
├──📁.github
|   └──📁workflows
|   |   ├──📄release.yml
|   |   └──📄test.yml
├──📁.vscode
|   └──📄settings.json
├──📁dist
|   └──📄index.js
├──📁src
|   ├──📄config.ts
|   ├──📄generate.ts
|   ├──📄handleOptions.ts
|   ├──📄index.ts
|   ├──📄sort.ts
|   ├──📄toTree.ts
|   ├──📄type.ts
|   └──📄utils.ts
├──📁test
|   ├──📄handleOptions.spec.ts
|   ├──📄sort.spec.ts
|   └──📄toTree.spec.ts
├──📄.editorconfig
├──📄.eslintrc
├──📄.gitignore
├──📄.prettierignore
├──📄.prettierrc.mjs
├──📄CHANGELOG.md
├──📄LICENSE
├──📄package.json
├──📄pnpm-lock.yaml
├──📄README.md
└──📄tsconfig.json
```

Copy the output to clipboard.

```bash
$ treei -i '.git,node_modules' --icon -c
```

## License

[MIT](./LICENSE)