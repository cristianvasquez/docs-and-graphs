import { simpleAst as sa } from './src/simpleAst.js'
import { createMarkdownParser } from './src/markdown/markdownParser.js'

function simpleAst (fullText, options = { normalize: false }) {
  const parser = createMarkdownParser()
  const astNode = parser.parse(fullText)
  return sa({ astNode, fullText }, options)
}

export { simpleAst }
