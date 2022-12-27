export default {
  title: 'Inline fields', markdown: `

  inline :: field

  nested ( inline :: field )

  **Thoughts**:: It was decent.

  **Rating**:: 6'

  [mood:: okay] | [length:: 2 hours]

  subject :: inline :: field

  nested ( subject :: inline :: field )

  subject :: **Thoughts**:: It was decent.

  subject :: **Rating**:: 6

  [subject :: mood:: okay] | [subject :: length:: 2 hours]

  No inline fields

  Too :: many :: inline :: fields


  `,
}
