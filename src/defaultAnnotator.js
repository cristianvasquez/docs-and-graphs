import yaml from 'js-yaml'
import { extractBlockIds } from './text/blockIds.js'
import { extractInlineFields } from './text/inlineFields.js'
import { normalizeObject } from './text/normalize.js'
import { extractTags } from './text/tags.js'
import { parseLinks } from './text/links.js'

function createNormalizer (options) {
  if (options.normalize) {
    return (value) => normalizeObject(value)
  }
  return (value) => value
}

function extractLinksFromValue(value) {
  if (typeof value === 'string') {
    return parseLinks(value)
  }
  return []
}

function extractLinksFromObject(obj) {
  const links = []
  
  function traverse(value) {
    if (typeof value === 'string') {
      links.push(...parseLinks(value))
    } else if (Array.isArray(value)) {
      value.forEach(traverse)
    } else if (value && typeof value === 'object') {
      Object.values(value).forEach(traverse)
    }
  }
  
  traverse(obj)
  return links
}

function annotateYAML ({ value, currentNode }, options) {
  const maybeNormalize = createNormalizer(options)

  try {
    const doc = yaml.load(value)

    if (doc.tags && doc.tags.length) {
      currentNode.tags = doc.tags
      delete doc.tags
    }

    const links = extractLinksFromObject(doc)
    if (links.length) {
      currentNode.links = links
    }

    currentNode.data = [maybeNormalize(doc)]
  } catch (e) {
    console.log(e)
  }
  return currentNode
}

function annotateTags ({ value, currentNode }, options) {
  const maybeNormalize = (tag) => options.normalize
    ? tag.replace(/^#/, '')
    : tag
  const tags = extractTags(value).map(maybeNormalize)
  if (tags.length) {
    currentNode.tags = tags
  }
  return currentNode
}

function annotateBlockIds ({ value, currentNode }, options) {
  const maybeNormalize = (id) => options.normalize ? id.replace(/^\^/, '') : id

  const ids = extractBlockIds(value).map(maybeNormalize)
  if (ids.length) {
    currentNode.ids = ids
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
  const { inlineAsArray } = options
  const as = inlineAsArray ? (x) => x : arrayToObject

  const data = currentNode.data ?? []

  for (const { chunks, raw } of extractInlineFields(value)) {
    if (chunks.length > 1) {
      data.push(as(maybeNormalize(chunks)))
    }
  }

  if (data.length) {
    currentNode.data = data
  }

  return currentNode
}

export { annotateYAML, annotateInlineFields, annotateBlockIds, annotateTags }
