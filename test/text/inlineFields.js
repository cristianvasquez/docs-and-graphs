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
  'http://example.org :: is a :: website',
  'a::b::c\na::f::d',
  'before\na::b\na::f',
  'a::b\nbetween\nc::d',
  'a::b\nc::d\nafter',
  'lives in :: [Test with relative](../houses/BobHouse.md)',
  'things like `Family Members::John Smith` that is interpreted as',
]

expect.extend({ toMatchSnapshot })

describe('extractInlineFields', async function () {
  for (const current of markdown) {
    it(current, async function () {
      const fields = extractInlineFields(current)
      expect(fields).toMatchSnapshot(this)
    })
  }

  it('extractInlineFields of undefined is undefined', async function () {
    const result = extractInlineFields(undefined)
    expect(result).toBe(undefined)
  })

  it('extractInlineFields of null is null', async function () {
    const result = extractInlineFields(null)
    expect(result).toBe(null)
  })
})

describe('removeInlineFields', async function () {
  for (const current of markdown) {
    it(current, async function () {
      const text = removeInlineFields(current)
      expect(text).toMatchSnapshot(this)
    })
  }

  it('removeInlineFields of undefined is undefined', async function () {
    const result = removeInlineFields(undefined)
    expect(result).toBe(undefined)
  })

  it('removeInlineFields of null is null', async function () {
    const result = removeInlineFields(null)
    expect(result).toBe(null)
  })
})
