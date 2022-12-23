import { getAstDag } from './src/markdown/astDag.js'
import { createMarkdownParser } from './src/markdown/markdownParser.js'

async function parseMarkdown (fullText) {
  const parser = createMarkdownParser()
  const astNode = await parser.parse(fullText)
  return await getAstDag({ astNode, fullText })
}

export { parseMarkdown }
