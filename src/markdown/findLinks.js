import { parseWikilink, parseExternalLinks } from '../text/links.js'
import { getText } from './markdownAst.js'

//@TODO do some profiling, if markdown use(wikiLinkPlugin) is too expensive do this externally in one place

const ofInterest = (root) => (root.type === 'link' || root.type ===
  'wikiLink' || root.type === 'image')

function collectChilds (parent, data = []) {
  if (parent.children) {
    return parent.children.reduce((accumulator, currentValue) => {
      if (ofInterest(currentValue)) {
        return [currentValue, ...accumulator]
      } else {
        return collectChilds(currentValue, accumulator)
      }
    }, data)
  } else {
    return ofInterest(parent) ? [parent, ...data] : data
  }
}

function findLinks ({ astNode, fullText }) {

  return collectChilds(astNode).map(node => {

    const text = getText({ astNode: node, fullText })
    if (node.type === 'wikiLink') {
      return {
        type: 'wikiLink', ...parseWikilink(text),
      }
    } else if (node.type === 'link' || node.type === 'image') {
      const link = parseExternalLinks(text)
      if (!link) {
        return {
          type: 'link', value: node.url,
        }
      }
      return {
        type: 'link', ...link,
      }
    }
    return node
  })
}

export { findLinks }
