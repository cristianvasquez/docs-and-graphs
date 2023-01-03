import { simpleAst as sa } from './src/simpleAst.js'
import { createMarkdownParser } from './src/markdown/markdownParser.js'

const defaultOptions = {
  normalize: false, inlineAsArray: false, includePosition: false,
}

function simpleAst (fullText, options = {}) {
  const parser = createMarkdownParser()
  const astNode = parser.parse(fullText)
  return sa({ astNode, fullText }, { ...defaultOptions, ...options })
}

export { simpleAst }
