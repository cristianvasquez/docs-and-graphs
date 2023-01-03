import { expect } from 'expect'
import { simpleAst } from '../index.js'
import toMatchSnapshot from 'expect-mocha-snapshot'
import tests from './tests.js'
import inlineFields from './support/inlineFields.js'

expect.extend({ toMatchSnapshot })

describe('astDag', async function () {
  for (const current of tests) {
    it(current.title, async function () {
      const fullText = current.markdown

      const result = simpleAst(fullText)

      expect(result).toMatchSnapshot(this)
    })
  }
})

describe('astDag normalize:true', async function () {
  for (const current of tests) {
    it(current.title, async function () {
      const fullText = current.markdown

      const result = simpleAst(fullText, { normalize: true })

      expect(result).toMatchSnapshot(this)
    })
  }
})

describe('astDag includePosition:true', async function () {
  for (const current of tests) {
    it(current.title, async function () {
      const fullText = current.markdown
      const result = simpleAst(fullText, { includePosition: true })
      expect(result).toMatchSnapshot(this)
    })
  }
})

describe('inLineAsArray', async function () {
  it('inLineAsArray:true', async function () {
    const fullText = inlineFields.markdown
    const result = simpleAst(fullText, { inlineAsArray: true })

    expect(result).toMatchSnapshot(this)
  })
  it('inLineAsArray:false', async function () {
    const fullText = inlineFields.markdown
    const result = simpleAst(fullText, { inlineAsArray: false })

    expect(result).toMatchSnapshot(this)
  })
})
