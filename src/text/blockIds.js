const HASH_REGEXP = /(?!\s)\^[A-Za-z]\w*\b/g

function extractBlockIds (str) {
  return [...str.matchAll(HASH_REGEXP)].map(x => x[0])
}

function removeBlockIds (str) {
  return str.replace(HASH_REGEXP, '')
}

export { extractBlockIds, removeBlockIds }
