import { expect } from 'expect'

import toMatchSnapshot from 'expect-mocha-snapshot'
import {
  extractTags, removeTags,
} from '../../src/text/tags.js'

const tweets = [
  'An #autumn scene showing a beautiful #horse coming to visit me.',
  'My new favourite eatery in #liverpool and I mean superb! #TheBrunchClub #breakfast #food',
  '#nowplaying Pointer Sisters - Dare Me | #80s #disco #funk #radio']


expect.extend({ toMatchSnapshot })

describe('extractTags', async function () {
  for (const current of tweets) {
    it(current, async function () {
      const tags = extractTags(current)
      expect(tags).toMatchSnapshot(this)
    })
  }
})

describe('removeTags', async function () {
  for (const current of tweets) {
    it(current, async function () {

      const txt = removeTags(current)
      expect(txt).toMatchSnapshot(this)
    })
  }
})
