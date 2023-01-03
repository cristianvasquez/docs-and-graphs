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

  it('extractBlockIds of undefined is undefined', async function () {
    const result = extractBlockIds(undefined)
    expect(result).toBe(undefined)
  })

  it('extractBlockIds of null is null', async function () {
    const result = extractBlockIds(null)
    expect(result).toBe(null)
  })
})

describe('removeBlockIds', async function () {
  for (const current of strings) {
    it(current, async function () {
      const txt = removeBlockIds(current)
      expect(txt).toMatchSnapshot(this)
    })
  }

  it('removeBlockIds of undefined is undefined', async function () {
    const result = removeBlockIds(undefined)
    expect(result).toBe(undefined)
  })

  it('removeBlockIds of null is null', async function () {
    const result = removeBlockIds(null)
    expect(result).toBe(null)
  })
})
