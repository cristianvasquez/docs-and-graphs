import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

function createMarkdownParser () {
  const parser = unified().
    use(remarkParse).
    use(remarkFrontmatter).
    use(remarkGfm)
  return {
    parse: (string) => {
      return parser.parse(string)
    },
  }
}

export { createMarkdownParser }
