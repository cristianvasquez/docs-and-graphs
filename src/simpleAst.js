import { getText } from './markdown/markdownAst.js'
import { normalizeText } from './text/normalize.js'
import { extractTags } from './text/tags.js'
import { findLinks } from './markdown/findLinks.js'
import {
  annotateInlineFields, annotateTags, annotateYAML, annotateBlockIds,
} from './defaultAnnotator.js'

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
      return annotateYAML({ value: astNode.value, currentNode: current },
        _options)
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
    type,
  }

  annotateTags({ value, currentNode: block }, options)
  annotateInlineFields({ value, currentNode: block }, options)
  annotateBlockIds({ value, currentNode: block }, options)

  const links = findLinks({ astNode, fullText })
  if (links.length) {
    block.links = links
  }

  block.value = options.normalize ? normalizeText(value) : value

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
