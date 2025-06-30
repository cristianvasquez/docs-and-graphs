import { expect } from 'expect'
import { simpleAst } from '../index.js'
import toMatchSnapshot from 'expect-mocha-snapshot'
import tests from './tests.js'
import inlineFields from './support/inlineFields.js'
import maxDepth from './support/maxDepth.js'

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

describe('maxDepth', async function () {
  it('maxDepth:2', async function () {
    const fullText = maxDepth.markdown
    const result = simpleAst(fullText, { maxDepth: 2 })

    expect(result).toMatchSnapshot(this)
  })
  it('maxDepth:3', async function () {
    const fullText = maxDepth.markdown
    const result = simpleAst(fullText, { maxDepth: 3 })

    expect(result).toMatchSnapshot(this)
  })
  it('no maxDepth (default)', async function () {
    const fullText = maxDepth.markdown
    const result = simpleAst(fullText)

    expect(result).toMatchSnapshot(this)
  })
})
