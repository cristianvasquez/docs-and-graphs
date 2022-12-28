const PARENTHESIS_TYPES = [
  {
    left: '(', right: ')',
  }, // Removing support for [] as I haven't seen it in the wild
  // {
  //   left: '[', right: ']',
  // }
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

  const extractFromLine = (line) => {
    const content = parseWithParenthesis(line)
    return content.length ? content : parseWithoutParenthesis(line)
  }

  return str.split('\n').map(extractFromLine).flat()

}

function removeInlineFields (str) {
  let result = str
  for (const { chunks, raw } of extractInlineFields(str)) {
    if (chunks.length > 1) {
      result = result.replaceAll(raw, '')
    }
  }
  return result
}

export { extractInlineFields, removeInlineFields }
