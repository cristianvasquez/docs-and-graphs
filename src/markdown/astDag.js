import rdf from 'rdf-ext'
import ns from '../namespaces.js'
import { extractInlineFields } from '../text/inlineFields.js'
import { getList, getText } from './ast.js'
import { extractTags } from '../text/tags.js'

async function getAstDag ({ astNode, fullText }) {

  const dataset = rdf.dataset()

  const root = rdf.blankNode()
  const pointer = rdf.clownface({ term: root, dataset })
  pointer.addOut(ns.rdf.type, ns.mark.DocumentRoot)

  let headersStack = [
    {
      iri: root, depth: 0,
    }]

  astNode.children.reduce((currentUri, astNode) => {
    const text = getText({ astNode, fullText })

    if (astNode.type === 'heading') {
      const ancesters = headersStack.filter(x => x.depth < astNode.depth)
      if (ancesters.length) {
        headersStack = ancesters
      }
      const parentIri = ancesters.length
        ? ancesters[ancesters.length - 1].iri
        : currentUri

      const headerUri =   createItem({pointer,text, type:ns.mark.Header})
      push(pointer.node(parentIri), ns.mark.nodes, headerUri)
      headersStack.push({
        iri: headerUri, depth: astNode.depth,
      })
      return headerUri
    } else if (astNode.type === 'list') {
      const strings = getList({ astNode: astNode, fullText: fullText })
      push(pointer.node(currentUri), ns.mark.nodes, createList(pointer, strings))
    } else if (astNode.type === 'paragraph') {
      push(pointer.node(currentUri), ns.mark.nodes, createItem({pointer,text, type:ns.mark.Paragraph}))
    } else {
      console.log(`I don't know how to handle`, astNode.type)
    }
    return currentUri
  }, root)
  return pointer
}


function createItem({pointer, text, type}){
  const newUri = rdf.blankNode()
  pointer.node(newUri).addOut(ns.rdf.type, type)
  pointer.node(newUri).addOut(ns.mark.value, rdf.literal(text))
  augment(pointer.node(newUri), text)
  return newUri
}

function augment(pointer, text){
  for (const tag of extractTags(text)) {
    pointer.addOut(ns.mark.tag, rdf.literal(tag))
  }
  for (const { property, value } of extractInlineFields(text)){
    const propValue = rdf.blankNode()
    pointer.addOut(ns.mark.inline, propValue)
    pointer.node(propValue).addOut(ns.rdf.type, ns.mark.Inline)
    pointer.node(propValue).addOut(ns.mark.inlineProperty, rdf.literal(property))
    pointer.node(propValue).addOut(ns.mark.inlineValue, rdf.literal(value))

  }
}
function createList (pointer, strings) {
  const listUri = rdf.blankNode()
  pointer.node(listUri).addOut(ns.rdf.type, ns.mark.List)
  for(const text of strings){
    const itemUri = createItem({pointer, text,type:ns.mark.ListItem })
    push(pointer.node(listUri), ns.mark.nodes, itemUri)
  }
  return listUri
}

function push (pointer, predicate, term) {
  if (pointer.out(predicate).isList()) {
    const elements = [...pointer.out(predicate).list(), term]
    pointer.deleteList(predicate)
    pointer.addList(predicate, elements)
  } else {
    pointer.addList(predicate, [term])
  }
}

export { getAstDag }
