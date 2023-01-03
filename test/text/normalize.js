import { expect } from 'expect'

import toMatchSnapshot from 'expect-mocha-snapshot'
import {
  normalizeText,
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

  it('normalize of undefined is undefined', async function () {
    const result = normalizeText(undefined)
    expect(result).toBe(undefined)
  })
})


