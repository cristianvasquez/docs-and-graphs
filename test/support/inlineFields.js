export default {
  title: 'Inline fields', markdown: `

  inline :: field

  nested ( inline :: field )

  **Thoughts**:: It was decent.

  **Rating**:: 6'

  subject :: inline :: field

  nested ( subject :: inline :: field )

  subject :: **Thoughts**:: It was decent.

  subject :: **Rating**:: 6

  No inline fields

  Too :: many :: inline :: fields

  [[Bob]] :: foaf:knows :: [[Alice]]


  `,
}
