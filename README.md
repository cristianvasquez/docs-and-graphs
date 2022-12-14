# docs-and-graphs

This lib parses markdown into a simplified Abstract Syntax tree.

## Why?

Several Note-Taking apps are 'node-based,' 'markdown based,' etc.

I use Markdown, and I cannot get used to outlines. However, I recognize the benefits of having node-based systems, where
you can reference a specific node from any other node.

So my question was:  How can I have these nodes, and still use Markdown?

After considering this, I realized that Markdown has some structure. It has headers that can be inside other headings
and lists that can be inside other lists. These are the nodes this library generates.

## Usage

Say you have the following markdown

```markdown
---
hello: world
---

# Heading 1

Some text under Heading 1

Text that has (inline::variables)

## Inline elements

- Tana and logseq likes
    - embedded nodes
```

The lib

```js
import { simpleAst } from 'docs-and-graphs'

const json = simpleAst(yourMarkdownString)
```

will produce the following Json

```json
{
  "type": "root",
  "depth": 0,
  "data": [
    {
      "hello": "world"
    }
  ],
  "children": [
    {
      "type": "block",
      "value": "# Heading 1",
      "depth": 1,
      "children": [
        {
          "type": "text",
          "value": "Some text under Heading 1"
        },
        {
          "type": "text",
          "data": [
            {
              "inline": "variables"
            }
          ],
          "value": "Text that has (inline::variables)"
        },
        {
          "type": "block",
          "value": "## Inline elements",
          "depth": 2,
          "children": [
            {
              "type": "outline",
              "ordered": false,
              "children": [
                {
                  "type": "outline",
                  "value": "Tana and logseq likes "
                },
                {
                  "type": "outline",
                  "ordered": false,
                  "children": [
                    {
                      "type": "outline",
                      "value": "embedded nodes"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

```

## Based on

- [remark](https://github.com/remarkjs/remark)
- [unifiedjs](https://github.com/unifiedjs/unified)

## And then?

I use this structure to later produce [RDF](https://en.wikipedia.org/wiki/Resource_Description_Framework) using
a [vault-triplifier](https://github.com/cristianvasquez/vault-triplifier), but you can use it for whatever you want.
