function getListText ({ astNode, fullText }) {
  const {
    type, children,
  } = astNode
  if (type === 'list') {
    return children.map(astNode => getText({ astNode, fullText }))
  }
}

function getText ({ astNode, fullText }) {

  // @TODO fix
  // There is a bug with the parser I'm using
  // Try with <www.ge.com/docs/chapters/Industrial_Internet.html>
  if (!astNode.position){
    // console.log(astNode)
    return ''
  }

  const {
    position: {
      start: { offset: startOffset }, end: { offset: endOffset },
    },
  } = astNode
  return fullText.substring(startOffset, endOffset)
}

export { getText, getListText }
