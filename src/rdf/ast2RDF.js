import rdf from 'rdf-ext'
import ns from '../namespaces.js'

function ast2RDF ({ simpleAst }) {

  const dataset = rdf.dataset()

  const root = rdf.blankNode()
  const pointer = rdf.clownface({ term: root, dataset })

  triplifyNode({ pointer, nodeUri: root, json: simpleAst })
  return pointer

}

function triplifyNode ({ pointer, nodeUri, json }) {
  if (json.type) {
    pointer.node(nodeUri).addOut(ns.rdf.type, ns.mark[json.type])

  }
  for (const child of json.children ?? []) {
    const childUri = rdf.blankNode()
    triplifyNode({ pointer, nodeUri: childUri, json: child })
  }
  return pointer
}

// function createItem ({ pointer, text, type }) {
//   const newUri = rdf.blankNode()
//   pointer.node(newUri).addOut(ns.rdf.type, type)
//   pointer.node(newUri).addOut(ns.mark.value, rdf.literal(text))
//   augment(pointer.node(newUri), text)
//   return newUri
// }

// function augment (pointer, text) {
//   for (const tag of extractTags(text)) {
//     pointer.addOut(ns.mark.tag, rdf.literal(tag))
//   }
//   for (const { property, value } of extractInlineFields(text)) {
//     const propValue = rdf.blankNode()
//     pointer.addOut(ns.mark.inline, propValue)
//     pointer.node(propValue).addOut(ns.rdf.type, ns.mark.Inline)
//     pointer.node(propValue).
//       addOut(ns.mark.inlineProperty, rdf.literal(property))
//     pointer.node(propValue).addOut(ns.mark.inlineValue, rdf.literal(value))
//
//   }
// }

// function createList (pointer, strings) {
//   const listUri = rdf.blankNode()
//   pointer.node(listUri).addOut(ns.rdf.type, ns.mark.List)
//   for (const text of strings) {
//     const itemUri = createItem({ pointer, text, type: ns.mark.ListItem })
//     push(pointer.node(listUri), ns.mark.nodes, itemUri)
//   }
//   return listUri
// }

export { ast2RDF }
