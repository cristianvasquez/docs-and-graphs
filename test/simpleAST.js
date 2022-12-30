import { expect } from 'expect'
import { simpleAst } from '../src/simpleAst.js'
import toMatchSnapshot from 'expect-mocha-snapshot'
import { createMarkdownParser } from '../src/markdown/markdownParser.js'
import tests from './tests.js'
import inlineFields from './support/inlineFields.js'

expect.extend({ toMatchSnapshot })

describe('astDag', async function () {
  for (const current of tests) {
    it(current.title, async function () {
      const fullText = current.markdown
      const parser = createMarkdownParser()
      const astNode = parser.parse(fullText)

      const result = simpleAst({ astNode, fullText })

      expect(result).toMatchSnapshot(this)
    })
  }
})

describe('astDag normalize:false', async function () {
  for (const current of tests) {
    it(current.title, async function () {
      const fullText = current.markdown
      const parser = createMarkdownParser()
      const astNode = parser.parse(fullText)

      const result = simpleAst({ astNode, fullText }, { normalize: false })

      expect(result).toMatchSnapshot(this)
    })
  }
})

describe('inLineAsArray', async function () {
  it('inLineAsArray:true', async function () {
    const fullText = inlineFields.markdown
    const parser = createMarkdownParser()
    const astNode = parser.parse(fullText)
    const result = simpleAst({ astNode, fullText }, { inlineAsArray: true })
    expect(result).toMatchSnapshot(this)
  })
  it('inLineAsArray:false', async function () {
    const fullText = inlineFields.markdown
    const parser = createMarkdownParser()
    const astNode = parser.parse(fullText)
    const result = simpleAst({ astNode, fullText }, { inlineAsArray: false })
    expect(result).toMatchSnapshot(this)
  })
})
