import yaml from 'js-yaml'
import { extractInlineFields } from './text/inlineFields.js'
import { normalizeText } from './text/normalize.js'
import { isString } from './text/string.js'
import { extractTags } from './text/tags.js'

function annotateYAML ({ value, currentNode }, options) {
  const inlineFields = currentNode.inlineFields ?? {}
  try {
    const doc = yaml.load(value)
    for (const [key, value] of Object.entries(doc)) {
      const shouldNormalize = options.normalize && isString(value)
      inlineFields[key] = shouldNormalize ? normalizeText(value) : value
    }
    currentNode.inlineFields = inlineFields
  } catch (e) {
    console.log(e)
  }
  return currentNode
}

function annotateTags ({ value, currentNode }, options) {
  const tags = extractTags(value)
  if (tags.length) {
    currentNode.tags = tags
  }
  return currentNode
}

function annotateInlineFields ({ value, currentNode }, options) {
  const inlineFields = extractInlineFields(value)
  if (inlineFields.length) {
    const fields = {}
    for (const { property, value } of inlineFields) {
      fields[property] = value
    }
    currentNode.inlineFields = fields
  }
  return currentNode
}

export { annotateYAML, annotateInlineFields, annotateTags }
