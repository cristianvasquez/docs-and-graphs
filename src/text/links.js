// [[hello|world]] -> {value:'hello', alias:'world'}
const wikilinkRegex = /(!?)\[\[(.*?)(?:\|(.*?))?]]/

function parseWikilink (str) {

  const match = str.match(wikilinkRegex)
  if (match) {
    const transclude = match[1] === '!'
    const result = {
      value: match[2], alias: match[3],
    }
    if (transclude) {
      result.transclude = transclude
    }
    return result
  }
}

const linkRegex = /(?:\[([^\]]+)\]\((https?:\/\/[^\s]+)\))|(https?:\/\/[^\s]+)$/

function parseExternalLinks (text) {
  const matches = text.match(linkRegex)
  if (matches) {
    return {
      alias: matches[1], value: matches[2] || matches[3],
    }

  }
}

export { parseWikilink, parseExternalLinks }