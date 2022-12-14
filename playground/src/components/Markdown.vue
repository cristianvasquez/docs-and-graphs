<script setup>
import '@rdfjs-elements/rdf-editor'
import { darkTheme, NConfigProvider, NInput } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useWorkspaceState } from '../store/workspaceState.js'

const store = useWorkspaceState()
const {
  currentMarkdown,
} = storeToRefs(store)

</script>

<template>
  <n-config-provider :theme="darkTheme">
    <div>
      <n-input
          type="textarea"
          v-model:value="currentMarkdown"
          :autosize="{
        minRows: 3
      }"
      />
    </div>
  </n-config-provider>
</template>
