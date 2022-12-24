import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { toRdf, toJson } from '../../../index.js'
import { ast2RDF } from '../../../src/rdf/ast2RDF.js'

export const useWorkspaceState = defineStore('workspace-store', () => {

  const currentMarkdown = ref('')
  const currentResultQuads = ref([])
  const currentJson = ref({})

  async function triplifyContents () {
    currentJson.value = toJson(currentMarkdown.value)

    const pointer = toRdf(currentMarkdown.value)
    currentResultQuads.value = [...pointer.dataset]
  }

  async function setExample ({ markdown }) {
    currentMarkdown.value = markdown
  }

  watch(currentMarkdown, () => triplifyContents())

  return {
    currentMarkdown, currentResultQuads, currentJson, setExample,
  }
})



