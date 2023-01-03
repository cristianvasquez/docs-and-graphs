import { simpleAst } from '../index.js'

const markdown = `---
hello: world
---
 
# Heading 1

Some text under Heading 1

Text that has (inline::variables)

## Inline elements

- Tana and logseq likes 
  - embedded nodes`

const ast = simpleAst(markdown, { normalize: true, includePosition: true })

console.log(JSON.stringify(ast, null, 2))
