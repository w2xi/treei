<div align="center">

# 🌳 treei

[![npm](https://img.shields.io/npm/v/treei)](https://www.npmjs.com/package/treei)
[![npm downloads](https://img.shields.io/npm/dm/treei.svg?style=flat-square)](https://www.npmjs.com/package/treei)

一个用于生成目录结构树的 Node.js 命令行工具。

[English](./README.md) | 简体中文

</div>

## ✨ 特性

- 输出类似 VSCode 的友好目录树结构
- 使用不同颜色区分文件夹和文件
- 更多...

## 📦 安装

```bash
npm i treei -g
```

## 🚀 使用方法

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

## 📝 示例

忽略 `.git` 和 `node_modules` 目录。

```bash
$ treei -i '.git|node_modules' # 或 treei -i '.git,node_modules'
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

显示文件名或目录前的表情图标。

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

将输出导出到 `result.md`，默认使用追加模式。

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

将输出复制到剪贴板。

```bash
$ treei -i '.git,node_modules' --icon -c
```

## 📄 许可证

[MIT](./LICENSE) 