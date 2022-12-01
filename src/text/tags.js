const HASH_REGEXP = /(?!\s)#[A-Za-z]\w*\b/g
const user = /((?=[^\w!])@\w+\b)/g

function extractTags (str) {
  return [...str.matchAll(HASH_REGEXP)].map(x=>x[0])
}

function removeTags (str) {
  return str.replace(HASH_REGEXP, '')
}

export { extractTags, removeTags }
