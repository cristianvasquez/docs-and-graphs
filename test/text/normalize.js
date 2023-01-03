import { expect } from 'expect'

import toMatchSnapshot from 'expect-mocha-snapshot'
import {
  normalizeText,
  normalizeObject
} from '../../src/text/normalize.js'

const text = [
  'An #autumn scene showing a beautiful #horse coming to visit me.',
  '#nowplaying Pointer Sisters - Dare Me | #80s #disco #funk #radio',
  '- A list item',
  '## Header',
  '   Trim this  '
]


expect.extend({ toMatchSnapshot })

describe('normalizeText', async function () {
  for (const current of text) {
    it(current, async function () {
      const result = normalizeText(current)
      expect(result).toMatchSnapshot(this)
    })
  }

  it('normalizeText of undefined is undefined', async function () {
    const result = normalizeText(undefined)
    expect(result).toBe(undefined)
  })

  it('normalizeText of null is null', async function () {
    const result = normalizeText(null)
    expect(result).toBe(null)
  })
})

describe('normalizeObject', async function () {

  it('normalizeObject of undefined is undefined', async function () {
    const result = normalizeObject(undefined)
    expect(result).toBe(undefined)
  })
  it('normalizeObject of null is null', async function () {
    const result = normalizeObject(null)
    expect(result).toBe(null)
  })
})

