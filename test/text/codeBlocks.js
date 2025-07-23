import { expect } from 'expect'

import { simpleAst } from '../../index.js'

const fullText = `\`\`\`osg
PREFIX dot: <http://pending.org/dot/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX prov: <http://www.w3.org/ns/prov#>


SELECT DISTINCT ?repository ?document WHERE {  
  GRAPH ?document {
    ?document dot:inRepository ?repository .
    FILTER(STRENDS(STR(?document), ".triplify"))
  }
}

\`\`\``

describe('Code blocks', function () {
  it('should preserve original formatting in code blocks even with normalize=true', function () {
    const result = simpleAst(fullText, { normalize: true })
    const [codeBlock] = result.children
    
    expect(codeBlock.type).toBe('code')
    expect(codeBlock.value).toBe(`PREFIX dot: <http://pending.org/dot/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX prov: <http://www.w3.org/ns/prov#>


SELECT DISTINCT ?repository ?document WHERE {  
  GRAPH ?document {
    ?document dot:inRepository ?repository .
    FILTER(STRENDS(STR(?document), ".triplify"))
  }
}
`)
    expect(codeBlock.lang).toBe('osg')
  })
})
