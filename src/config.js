const emoji = {
  directory: '📁',
  file: '📄',
}

const characters = {
	border: '|',
	contain: '├',
	line: '─',
	last: '└'
}

const defaultOptions = {
  // strategy of finding tree structure, bfs by default
  strategy: 'bfs'
}

module.exports = {
  emoji,
  characters,
  defaultOptions
}