import { extractInlineFields } from '../text/inlineFields.js'
import { getText } from './markdownAst.js'
import { extractTags } from '../text/tags.js'
import { findLinks } from './findLinks.js'

function simpleAst ({ astNode, fullText }) {

  const root = {
    type: 'root', depth: 0,
  }

  let headersStack = [root]
  astNode.children.reduce((current, astNode) => {
    if (astNode.type === 'heading') {
      const ancesters = headersStack.filter(x => x.depth < astNode.depth)
      if (ancesters.length) {
        headersStack = ancesters
      }
      const parent = ancesters.length
        ? ancesters[ancesters.length - 1]
        : current

      const block = createBlock({ astNode, fullText, type: 'block' })
      block.depth = astNode.depth
      push(parent, block)
      headersStack.push(block)
      return block
    } else if (astNode.type === 'list') {

      const outline = getOutline({ astNode, fullText, outlineDepth: 0 })
      push(current, outline)
    } else if (astNode.type === 'paragraph') {
      const block = createBlock({ astNode, fullText, type: 'text' })
      push(current, block)
    } else {
      console.log(`I don't know how to handle`, astNode.type)
    }
    return current
  }, root)
  return root
}

function getOutline ({ astNode, fullText, outlineDepth, depth }) {
  const children = []
  for (const c of astNode.children) {
    // listItems
    const checked = c.checked
    for (const child of c.children) {

      if (child.type === 'paragraph') {
        const block = createBlock({ astNode: child, fullText, type: 'outline' })
        // block.outlineDepth = outlineDepth
        if (checked) {
          block.checked = checked
        }
        children.push(block)
      } else if (child.type === 'list') {
        const outline = getOutline(
          { astNode: child, fullText, outlineDepth: outlineDepth + 1 })
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

function createBlock ({ astNode, fullText, type }) {
  const value = getText({ astNode, fullText })

  const block = {
    type, value,
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
