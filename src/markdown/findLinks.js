import { parseLinks } from '../text/links.js'
import { getText } from './markdownAst.js'

function findLinks ({ astNode, fullText }) {
  const nodeText = getText({ astNode, fullText })
  const result = []

  for (const line of nodeText.split('\n')) {
    for (const link of parseLinks(line)) {
      result.push(link)
    }
  }

  return result
}

export { findLinks }
