import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { simpleAst } from '../../../index.js'

export const useWorkspaceState = defineStore('workspace-store', () => {

  const currentMarkdown = ref('')
  const currentJson = ref({})

  async function triplifyContents () {
    currentJson.value = simpleAst(currentMarkdown.value,
      { includePosition: true })
  }

  async function setExample ({ markdown }) {
    currentMarkdown.value = markdown
  }

  watch(currentMarkdown, () => triplifyContents())

  return {
    currentMarkdown, currentJson, setExample,
  }
})



