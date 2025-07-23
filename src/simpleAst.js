import { getText } from './markdown/markdownAst.js'
import { normalizeText } from './text/normalize.js'
import { findLinks } from './markdown/findLinks.js'
import {
  annotateInlineFields, annotateTags, annotateYAML, annotateBlockIds,
} from './defaultAnnotator.js'

function simpleAst ({ astNode, fullText }, options) {

  if (!options) {
    throw Error('Requires options')
  }

  const root = {
    type: 'root', depth: 0,
  }

  let headersStack = [root]
  astNode.children.reduce((current, astNode) => {

    if (astNode.type === 'yaml') {
      return annotateYAML({ value: astNode.value, currentNode: current },
        options)
    } else if (astNode.type === 'code') {
      const block = createBlock({ astNode, fullText, type: 'code' }, options)
      block.lang = astNode.lang
      if (astNode.meta) {
        block.meta = astNode.meta
      }
      push(current, block)
    } else if (astNode.type === 'heading') {
      // Apply maxDepth flattening if specified
      const effectiveDepth = options.maxDepth && astNode.depth > options.maxDepth 
        ? options.maxDepth 
        : astNode.depth

      const ancesters = headersStack.filter(x => x.depth < effectiveDepth)
      if (ancesters.length) {
        headersStack = ancesters
      }
      const parent = ancesters.length
        ? ancesters[ancesters.length - 1]
        : current

      const block = createBlock({ astNode, fullText, type: 'block' }, options)
      block.depth = effectiveDepth

      if (options.includePosition && astNode.position) {
        block.position = astNode.position
      }

      push(parent, block)
      headersStack.push(block)
      return block
    } else if (astNode.type === 'list') {
      const outline = getOutline({ astNode, fullText, outlineDepth: 0 },
        options)
      push(current, outline)
    } else if (astNode.type === 'paragraph') {
      const block = createBlock({ astNode, fullText, type: 'text' }, options)
      push(current, block)
    } else {
      // Things not yet handled
      //
      // blockquote
      // table
      // thematicBreak
      // code
      // html
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
        // Apply maxDepth to nested lists if specified
        const effectiveOutlineDepth = options.maxDepth && (outlineDepth + 1) > options.maxDepth
          ? options.maxDepth - 1
          : outlineDepth + 1
          
        const outline = getOutline(
          { astNode: child, fullText, outlineDepth: effectiveOutlineDepth }, options)
        children.push(outline)
      } else {
        // console.log(`I don't know how to handle`, child.type)
      }
    }
  }

  const block = {
    type: 'outline', ordered: astNode.ordered, children,
  }

  if (options.includePosition && astNode.position) {
    block.position = astNode.position
  }

  return block
}

function createBlock ({ astNode, fullText, type }, options) {
  const value = type === 'code' ? astNode.value : getText({ astNode, fullText })

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

  block.value = (options.normalize && type !== 'code') ? normalizeText(value) : value

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
