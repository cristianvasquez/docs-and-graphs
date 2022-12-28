import { expect } from 'expect'

import toMatchSnapshot from 'expect-mocha-snapshot'
import {
  parseWikilink, parseExternalLinks
} from '../../src/text/links.js'

const markdown = [
  'no link',
  '[[link 1]]',
  '[[/full/path/link 1]]',
  '[[/full/path/link 1.md]]',
  '[Alias 2](http://example.com)',
  'some text http://example.com more text',
  '[Alias 3](https://example.com)',
  'some text2 https://example.com more text',
  'https://example.com',
  'http://example.com',
  '[[link 1 |Alias 1]]',
  '![[link 1]]',
  '![[image.png]]',
  '[protocol unknown](hello)',
  '[protocol unknown](file://)',
  '<http://example.org>',
  '<https://example.org>'
]

expect.extend({ toMatchSnapshot })

describe('parseWikilink', async function () {
  for (const current of markdown) {
    it(current, async function () {
      const result = parseWikilink(current)
      expect(result).toMatchSnapshot(this)
    })
  }
})

describe('parseExternalLinks', async function () {
  for (const current of markdown) {
    it(current, async function () {
      const result = parseExternalLinks(current)
      expect(result).toMatchSnapshot(this)
    })
  }
})
