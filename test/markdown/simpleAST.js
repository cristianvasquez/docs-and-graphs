import { expect } from 'expect'

import {simpleAst} from '../../src/markdown/simpleAst.js'
import toMatchSnapshot from 'expect-mocha-snapshot'
import { createMarkdownParser } from '../../src/markdown/markdownParser.js'
import tests from '../tests.js'

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
