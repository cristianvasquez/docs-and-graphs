import { Parser } from 'n3'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { parseMarkdown } from '../../../index.js'

export const useWorkspaceState = defineStore('workspace-store', () => {

  const currentMarkdown = ref('')
  const currentResultQuads = ref([])

  async function triplifyContents () {
    const resultQuads = await parseMarkdown(currentMarkdown.value)
    currentResultQuads.value = [...resultQuads.dataset]
  }

  async function setExample ({ markdown }) {
    currentMarkdown.value = markdown
  }

  watch(currentMarkdown, () => triplifyContents())

  return {
    currentMarkdown, currentResultQuads, setExample,
  }
})



