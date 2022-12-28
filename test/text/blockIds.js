import { expect } from 'expect'

import toMatchSnapshot from 'expect-mocha-snapshot'
import {
  extractBlockIds, removeBlockIds,
} from '../../src/text/blockIds.js'

const strings = [
  '^bla ',
  ' ^bla',
  '^bla',
  'Me either^bla',
  '[[NotMe#^bla]]',
  '## Section ^bla',
  '## Section ^1',
  '## A header with some ^id',
  '^id1 and ^id2']


expect.extend({ toMatchSnapshot })

describe('extractBlockIds', async function () {
  for (const current of strings) {
    it(current, async function () {
      const tags = extractBlockIds(current)
      expect(tags).toMatchSnapshot(this)
    })
  }
})

describe('removeBlockIds', async function () {
  for (const current of strings) {
    it(current, async function () {

      const txt = removeBlockIds(current)
      expect(txt).toMatchSnapshot(this)
    })
  }
})
