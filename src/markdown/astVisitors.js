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

    // sometimes the parser doesn't report a position. Weird.
    // @TODO report bug. example:'mailto:asset+block@lectureslides_chap3NOphantom.pdf'
    const linkText = node.position ? fullText.substring(
      node.position.start.offset, node.position.end.offset) : node.url
    const result = {
      ...node, text: linkText,
    }
    delete result.children
    delete result.position
    return result
  })

}

export { findLinks }
