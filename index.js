import { simpleAst as sa } from './src/markdown/simpleAst.js'
import { createMarkdownParser } from './src/markdown/markdownParser.js'

function simpleAst (fullText) {
  const parser = createMarkdownParser()
  const astNode = parser.parse(fullText)
  return sa({ astNode, fullText })
}

export { simpleAst }
