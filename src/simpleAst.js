import { extractInlineFields } from './text/inlineFields.js'
import { getText } from './markdown/markdownAst.js'
import { normalizeText } from './text/normalize.js'
import { isString } from './text/string.js'
import { extractTags } from './text/tags.js'
import { findLinks } from './markdown/findLinks.js'
import yaml from 'js-yaml'

const DEFAULT_OPTIONS = {
  normalize: true,
}

function simpleAst ({ astNode, fullText }, options = {}) {

  const _options = { ...DEFAULT_OPTIONS, ...options }

  const root = {
    type: 'root', depth: 0,
  }

  let headersStack = [root]
  astNode.children.reduce((current, astNode) => {

    if (astNode.type === 'yaml') {
      // Prune the children
      processYAML({ astNode, current }, _options)
      // astNode.children = []

      return current
    } else if (astNode.type === 'code') {
      // @TODO implement something beautiful for turtle-publish
    } else if (astNode.type === 'heading') {
      const ancesters = headersStack.filter(x => x.depth < astNode.depth)
      if (ancesters.length) {
        headersStack = ancesters
      }
      const parent = ancesters.length
        ? ancesters[ancesters.length - 1]
        : current

      const block = createBlock({ astNode, fullText, type: 'block' }, _options)
      block.depth = astNode.depth
      push(parent, block)
      headersStack.push(block)
      return block
    } else if (astNode.type === 'list') {
      const outline = getOutline({ astNode, fullText, outlineDepth: 0 },
        _options)
      push(current, outline)
    } else if (astNode.type === 'paragraph') {
      const block = createBlock({ astNode, fullText, type: 'text' }, _options)
      push(current, block)
    } else {
      console.log(`I don't know how to handle`, astNode.type)
    }
    return current
  }, root)
  return root
}

function processYAML ({ astNode, current }, options) {

  const inlineFields = current.inlineFields ?? {}

  try {
    const doc = yaml.load(astNode.value)
    for (const [key, value] of Object.entries(doc)) {

      const shouldNormalize = options.normalize && isString(value)
      inlineFields[key] = shouldNormalize ? normalizeText(value) : value
    }
    current.inlineFields = inlineFields
  } catch (e) {
    console.log(e)
  }
}

function getOutline ({ astNode, fullText, outlineDepth, depth }, options) {
  const children = []
  for (const c of astNode.children) {
    // listItems
    const checked = c.checked
    for (const child of c.children) {

      if (child.type === 'paragraph') {
        const block = createBlock({ astNode: child, fullText, type: 'outline' },
          options)
        // block.outlineDepth = outlineDepth
        if (checked) {
          block.checked = checked
        }
        children.push(block)
      } else if (child.type === 'list') {
        const outline = getOutline(
          { astNode: child, fullText, outlineDepth: outlineDepth + 1 }, options)
        children.push(outline)
      } else {
        console.log(`I don't know how to handle`, child.type)
      }
    }
  }
  return {
    type: 'outline', ordered: astNode.ordered, children,
  }
}

function createBlock ({ astNode, fullText, type }, options) {
  const value = getText({ astNode, fullText })

  const block = {
    type, value: options.normalize ? normalizeText(value) : value,
  }

  const tags = extractTags(value)
  if (tags.length) {
    block.tags = tags
  }

  const inlineFields = extractInlineFields(value)
  if (inlineFields.length) {
    const fields = {}
    for (const { property, value } of inlineFields) {
      fields[property] = value
    }
    block.inlineFields = fields
  }

  const links = findLinks({ astNode, fullText })
  if (links.length) {
    block.links = links
  }

  return block
}

function push (parent, child) {
  if (parent.children) {
    parent.children.push(child)
  } else {
    parent.children = [child]
  }

}

export { simpleAst }
