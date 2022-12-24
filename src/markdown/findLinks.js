import { getText } from './markdownAst.js'

const ofInterest = (root) => (root.type === 'link' || root.type ===
  'wikiLink' || root.type === 'image')

// @TODO handle embedded [[embedded.png]] -> {embedded:true}

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
        type: 'wikiLink', alias: text, // @TODO go from [[hello|world]] -> world
        value: node.value,
      }
    } else if (node.type === 'link') {
      return {
        type: 'link', alias: text, // @TODO go from [alias](url) -> alias
        value: node.url,
      }
    }

    return node
  })
}

export { findLinks }
