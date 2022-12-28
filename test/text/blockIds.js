import { expect } from 'expect'

import toMatchSnapshot from 'expect-mocha-snapshot'
import {
  extractBlockIds, removeBlockIds,
} from '../../src/text/blockIds.js'

const tweets = [
  '## A header with some ^id',
  '^id1 and ^id2']


expect.extend({ toMatchSnapshot })

describe('extractBlockIds', async function () {
  for (const current of tweets) {
    it(current, async function () {
      const tags = extractBlockIds(current)
      expect(tags).toMatchSnapshot(this)
    })
  }
})

describe('removeBlockIds', async function () {
  for (const current of tweets) {
    it(current, async function () {

      const txt = removeBlockIds(current)
      expect(txt).toMatchSnapshot(this)
    })
  }
})
