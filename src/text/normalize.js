import { removeInlineFields } from './inlineFields.js'
import { removeTags } from './tags.js'
import { trim } from './string.js'

function normalizeText (str) {
  const a = removeInlineFields(str)
  const b = removeTags(a)
  const withoutTagsNoHeader = b.
    split(' ').
    filter(x => !x.startsWith('#')).
    join(' ')
  const withoutList = withoutTagsNoHeader.startsWith('- ')
    ? withoutTagsNoHeader.slice(2)
    : withoutTagsNoHeader
  return trim(withoutList)
}

export { normalizeText }
