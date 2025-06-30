const PARENTHESIS_TYPES = [
  {
    left: '(', right: ')',
  },
  {
    left: '`', right: '`',
  }
]

function keyValue ({ content, parenthesis }) {
  const chunks = content.split('::')
  return {
    chunks: chunks, raw: `${parenthesis.left}${content}${parenthesis.right}`,
  }
}

function parseParenthesis (str) {
  const result = []
  for (const parenthesis of PARENTHESIS_TYPES) {
    for (const [i, value] of str.split(parenthesis.left).entries()) {
      if (i > 0) {
        const content = value.split(parenthesis.right)[0]
        result.push({
          content, parenthesis,
        })
      }
    }
  }
  return result
}

function parseWithoutParenthesis (str) {
  return [
    keyValue({
      content: str, parenthesis: {
        left: '', right: '',
      },
    })].filter(valid => valid)
}

function parseWithParenthesis (str) {
  return parseParenthesis(str).map(keyValue).filter(valid => valid)
}

// Accepts embedded pairs between parentheses (like::this)
function extractInlineFields (str) {
  if (str === undefined || str === null) {
    return str
  }

  function extract (line) {
    const result = []
    for (const inline of parseWithParenthesis(line)) {
      if (inline.chunks.length > 1) {
        result.push(inline)
      }
    }
    if (result.length === 0) {
      for (const inline of parseWithoutParenthesis(line)) {
        if (inline.chunks.length > 1) {
          result.push(inline)
        }
      }
    }
    return result
  }

  return str.split('\n').map(extract).flat()

}

function removeInlineFields (str) {
  if (str === undefined || str === null) {
    return str
  }
  let result = str
  for (const { chunks, raw } of extractInlineFields(str)) {
    if (chunks.length > 1) {
      result = result.replaceAll(raw, '')
    }
  }
  return result
}

export { extractInlineFields, removeInlineFields }
