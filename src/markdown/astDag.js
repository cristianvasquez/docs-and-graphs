import rdf from 'rdf-ext'
import ns from '../namespaces.js'
import { getList, getText } from './ast.js'
import {extractTags} from '../text/tags.js'

async function getAstDag ({ astNode, fullText }) {

  const dataset = rdf.dataset()

  const root = rdf.blankNode()
  const pointer = rdf.clownface({ term: root, dataset })
  const quads = []
  pointer.addOut(ns.rdf.type,ns.mark.Root)

  let headersStack = [{
    iri: root,
    depth: 0,
  }]

  astNode.children.reduce((currentUri, astNode) => {
    const text = getText({ astNode, fullText })

    if (astNode.type === 'heading') {
      const currentIri = rdf.blankNode()
      const ancesters = headersStack.filter(x => x.depth < astNode.depth)
      if (ancesters.length) {
        headersStack = headersStack.filter(x => x.depth < astNode.depth)
      }

      const parentIri = ancesters.length
        ? ancesters[ancesters.length - 1].iri
        : currentUri

      quads.push(rdf.quad(parentIri, ns.mark.contains, currentIri))
      quads.push(rdf.quad(currentIri, ns.mark.header, rdf.literal(text)))

      for (const tag of extractTags(text)){
        quads.push(rdf.quad(currentIri, ns.mark.tag, rdf.literal(tag)))
      }

      headersStack.push({
        iri: currentIri,
        depth: astNode.depth,
      })
      return currentIri
    } else {
      if (astNode.type === 'list') {
        for (const text of getList({ astNode: astNode, fullText: fullText })) {
          quads.push(rdf.quad(currentUri, ns.mark.listItem, rdf.literal(text)))
        }
      } else if (astNode.type === 'paragraph') {
        quads.push(rdf.quad(currentUri, ns.mark.item, rdf.literal(text)))
      }
    }
    return currentUri
  }, root)
  pointer.dataset.addAll(quads)
  return pointer
}

export { getAstDag }
