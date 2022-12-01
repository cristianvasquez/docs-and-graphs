function getList ({ astNode, fullText }) {
  const {
    type, children,
  } = astNode
  if (type === 'list') {
    return children.map(astNode => getText({ astNode, fullText }))
  }
}

function getText ({ astNode, fullText }) {
  const {
    position: {
      start: { offset: startOffset }, end: { offset: endOffset },
    },
  } = astNode
  return fullText.substring(startOffset, endOffset)
}


export { getText, getList }
