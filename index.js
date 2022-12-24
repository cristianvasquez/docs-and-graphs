import { simpleAst } from './src/markdown/simpleAst.js'
import { ast2RDF } from './src/rdf/ast2RDF.js'
import { createMarkdownParser } from './src/markdown/markdownParser.js'

function toJson (fullText) {
  const parser = createMarkdownParser()
  const astNode = parser.parse(fullText)
  return simpleAst({ astNode, fullText })
}

function toRdf (fullText) {
  const simpleAst = toJson(fullText)
  return ast2RDF({ simpleAst })
}

export { toRdf, toJson }
