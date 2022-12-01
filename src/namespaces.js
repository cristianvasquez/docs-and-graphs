import rdf from 'rdf-ext'

const ns = {
  rdf: rdf.namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
  schema: rdf.namespace('http://schema.org/'),
  sh: rdf.namespace('http://www.w3.org/ns/shacl#'),
  xsd: rdf.namespace('http://www.w3.org/2001/XMLSchema#'),
  foaf: rdf.namespace('http://xmlns.com/foaf/0.1/'),
  purl: rdf.namespace('http://purl.org/dc/terms/'),
  rdfs: rdf.namespace('http://www.w3.org/2000/01/rdf-schema#'),
  ex: rdf.namespace('http://example.org/'),
  dot: rdf.namespace('http://dottriples.org/'),
  mark: rdf.namespace('http://markdown.org/'),
}

export default ns
