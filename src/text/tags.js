import { trim } from './string.js'

const HASH_REGEXP = /(^|\s)#[A-Za-z]\w*\b/g

function extractTags (str) {
  if (str === undefined) {
    return
  }
  return [...str.matchAll(HASH_REGEXP)].map(x => x[0]).map(trim)
}

function removeTags (str) {
  if (str === undefined) {
    return
  }
  return str.replace(HASH_REGEXP, '')
}

export { extractTags, removeTags }
