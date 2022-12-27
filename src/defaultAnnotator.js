import yaml from 'js-yaml'
import { extractInlineFields } from './text/inlineFields.js'
import { normalizeText } from './text/normalize.js'
import { isString } from './text/string.js'
import { extractTags } from './text/tags.js'

function createNormalizer (options) {
  if (options.normalize) {
    return (value) => isString(value) ? normalizeText(value) : value
  }
  return (value) => value
}

function annotateYAML ({ value, currentNode }, options) {
  const maybeNormalize = createNormalizer(options)

  const inlineFields = currentNode.inlineFields ?? {}
  try {
    const doc = yaml.load(value)
    for (const [key, value] of Object.entries(doc)) {
      inlineFields[maybeNormalize(key)] = maybeNormalize(value)
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
  const maybeNormalize = createNormalizer(options)

  const inlineFields = extractInlineFields(value)
  if (inlineFields.length) {
    const fields = {}
    for (const { property, value } of inlineFields) {
      fields[maybeNormalize(property)] = maybeNormalize(value)
    }
    currentNode.inlineFields = fields
  }
  return currentNode
}

export { annotateYAML, annotateInlineFields, annotateTags }
