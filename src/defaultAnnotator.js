import yaml from 'js-yaml'
import { extractInlineFields } from './text/inlineFields.js'
import { normalizeObject } from './text/normalize.js'
import { extractTags } from './text/tags.js'

function createNormalizer (options) {
  if (options.normalize) {
    return (value) => normalizeObject(value)
  }
  return (value) => value
}

function annotateYAML ({ value, currentNode }, options) {
  const maybeNormalize = createNormalizer(options)

  try {
    const doc = yaml.load(value)

    if (doc.tags && doc.tags.length) {
      currentNode.tags = doc.tags
      delete doc.tags
    }

    currentNode.data = [maybeNormalize(doc)]
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

function arrayToObject (arr) {
  if (arr.length === 0) return {}
  if (arr.length === 1) return arr[0]

  let obj = {}
  obj[arr[0]] = arrayToObject(arr.slice(1))
  return obj
}

function annotateInlineFields ({ value, currentNode }, options) {
  const maybeNormalize = createNormalizer(options)

  const newData = extractInlineFields(value).
    map(({ chunks, raw }) => chunks.length > 1 ? arrayToObject(chunks.map(maybeNormalize)) : []).
    map(maybeNormalize)

  const data = [...currentNode.inlineFields ?? [], ...newData]

  if (data.flat().length) {
    currentNode.data = data
  }

  return currentNode
}

export { annotateYAML, annotateInlineFields, annotateTags }
