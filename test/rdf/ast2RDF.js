import { expect } from 'expect'

import { toJson } from '../../index.js'

import toMatchSnapshot from 'expect-mocha-snapshot'
import { ast2RDF } from '../../src/rdf/ast2RDF.js'
import { prettyPrint } from '../util.js'
import tests from '../tests.js'

expect.extend({ toMatchSnapshot })

describe('astDag', async function () {
  for (const current of tests) {
    it(current.title, async function () {
      const simpleAst = toJson(current.markdown)
      const pointer = ast2RDF({ simpleAst })

      const turtle = await prettyPrint(pointer.dataset)
      expect(turtle).toMatchSnapshot(this)
    })
  }
})
