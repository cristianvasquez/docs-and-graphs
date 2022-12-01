import { expect } from 'expect'

import toMatchSnapshot from 'expect-mocha-snapshot'
import {
  extractInlineFields, removeInlineFields,
} from '../../src/text/inlineFields.js'

const markdown = [
  'inline :: field',
  'nested ( inline :: field )',
  '**Thoughts**:: It was decent.',
  '**Rating**:: 6',
  '[mood:: okay] | [length:: 2 hours]',
  'No inline fields',
]

expect.extend({ toMatchSnapshot })

describe('extractInlineFields', async function () {
  for (const current of markdown) {
    it(current, async function () {

      const fields = extractInlineFields(current)

      expect(fields).toMatchSnapshot(this)
    })
  }
})

describe('removeInlineFields', async function () {
  for (const current of markdown) {
    it(current, async function () {

      const text = removeInlineFields(current)

      expect(text).toMatchSnapshot(this)
    })
  }
})
