import { turtle } from '@rdfjs-elements/formats-pretty/serializers'
import ns from '../src/namespaces.js'
import getStream from 'get-stream'
import { Parser } from 'n3'
import rdf from 'rdf-ext'
function toPlain (prefixes) {
  const result = {}
  for (const [key, value] of Object.entries({ ...ns, ...prefixes })) {
    result[key] = value().value
  }
  return result
}

async function prettyPrint (dataset, prefixes = {}) {
  const sink = await turtle({
    prefixes: toPlain(prefixes),
  })
  const stream = await sink.import(dataset.toStream())
  return await getStream(stream)
}

async function toQuads ({ str }) {
  try {
    const parser = new Parser({factory: rdf})
    return parser.parse(str)
  } catch (error) {
    throw Error(`${str}\n${error.message}`)
  }
}

async function getDataset ({ str }) {
  const quads = await toQuads({ str })
  return rdf.dataset().addAll(quads)
}

export { getDataset, prettyPrint }

