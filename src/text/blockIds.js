import { trim } from './string.js'

const BLOCK_ID_REGEXP = /(^|\s)\^[A-Za-z0-9]\w*\b/g

function extractBlockIds (str) {
  return [...str.matchAll(BLOCK_ID_REGEXP)].map(x => x[0]).map(trim)
}

function removeBlockIds (str) {
  return str.replace(BLOCK_ID_REGEXP, '')
}

export { extractBlockIds, removeBlockIds }
