import { removeInlineFields } from './inlineFields.js'
import { removeTags } from './tags.js'
import { removeBlockIds } from './blockIds.js'

import { trim, isString } from './string.js'

function normalizeText (str) {
  if (str === undefined) {
    return
  }
  const a = removeInlineFields(str)
  const b = removeTags(a)
  const c = removeBlockIds(b)
  const withoutTagsNoHeader = c.
    split(' ').
    filter(x => !x.startsWith('#')).
    join(' ')
  const withoutList = withoutTagsNoHeader.startsWith('- ')
    ? withoutTagsNoHeader.slice(2)
    : withoutTagsNoHeader
  return trim(withoutList)
}

function apply (obj, fn) {
  if (isString(obj)) {
    return fn(obj)
  }

  if (Array.isArray(obj)) {
    return obj.map(element => apply(element, fn))
  }
  if (typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      result[key] = apply(obj[key], fn)
      return result
    }, {})
  }
  return obj
}

function normalizeObject (obj) {
  return apply(obj, str => normalizeText(str))

}

export { normalizeText, normalizeObject }
