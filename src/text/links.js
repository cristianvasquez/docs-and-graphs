import linkify from 'linkify-it'
import { trim } from './string.js'

// [[hello|world]] -> {value:'hello', alias:'world'}
const wikilinkRegex = /(!?)\[\[(.*?)(?:\|(.*?))?]]/g

function parseWikilink (str) {
  const links = []
  let match
  while ((match = wikilinkRegex.exec(str)) !== null) {
    const [, transclude, value, alias] = match
    const link = { type: 'internal', value, alias }
    if (transclude === '!') {
      link.transclude = true
    }
    if (alias) {
      link.alias = alias
    }

    links.push(link)
  }

  return links
}

// Matches things like [something](http://example.com) and [something](/path/file.png)

function captureLinks (string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match
  let links = []

  while (match = regex.exec(string)) {
    links.push({
      alias: match[1], value: match[2],
    })
  }
  return links
}

const linkifier = linkify()

linkifier.tlds('onion', true)            // Add unofficial `.onion` domain
  .add('git:', 'http:')           // Add `git:` protocol as "alias"
  .add('ftp:', null)              // Disable `ftp:` protocol
  .set({ fuzzyIP: true, fuzzyLink: false })        // Enable IPs in fuzzy links (without schema)

// @TODO find a lib to do these sort of things.
function parseNormalLinks (str) {

  const links = []
  const urls = linkifier.match(str) ?? []

  for (const { alias, value } of captureLinks(str)) {
    const candidate = urls.find(x => x.raw === trim(value))
    if (candidate) {
      links.push({
        type: 'external', alias, value: candidate.url,
      })
    } else {
      links.push({
        type: 'internal', alias, value,
      })
    }
  }
  const mapped = new Set(
    links.filter(x => x.type === 'external').map(x => x.value))

  for (const current of urls) {
    if (!mapped.has(current.url)) {
      links.push({
        type: 'external', alias: undefined, value: current.url,
      })
    }
  }

  return links
}

function parseLinks (str) {
  if (str === undefined || str === null) {
    return []
  }

  return [...parseWikilink(str), ...parseNormalLinks(str)]
}

export { parseLinks }
