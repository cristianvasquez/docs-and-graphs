import { expect } from 'expect'

import toMatchSnapshot from 'expect-mocha-snapshot'
import {
  extractInlineFields,
  removeInlineFields,
} from '../../src/text/inlineFields.js'

const markdown = [
  'inline :: field',
  'nested ( inline :: field )',
  '**Thoughts**:: It was decent.',
  '**Rating**:: 6',
  '(mood:: okay) && (length:: 2 hours)',
  'subject :: inline :: field',
  'nested ( subject :: inline :: field )',
  'subject :: **Thoughts**:: It was decent.',
  'subject :: **Rating**:: 6',
  '(subject :: mood:: okay) && (subject :: length:: 2 hours)',
  'No inline fields',
  'Too :: many :: inline :: fields ',
  '(a::b::c) (a::f::d)',
  '[[Alice]] :: foaf:knows :: [[Bob]]',
  'http://example.org :: is a :: website']

expect.extend({ toMatchSnapshot })

describe('extractInlineFields', async function () {
  for (const current of markdown) {
    it(current, async function () {

      const fields = extractInlineFields(current)

      console.log(current)
      console.log(fields)

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
