export const emoji = {
  directory: '📁',
  file: '📄',
}

export const characters = {
  border: '|',
  contain: '├',
  line: '─',
  last: '└',
}

export const defaultOptions = {
  // strategy of finding tree structure, bfs by default
  strategy: 'bfs',
}

export const NodeTypes = {
  ROOT: 'root',
  DIRECTORY: 'directory',
  FILE: 'file',
} as const
