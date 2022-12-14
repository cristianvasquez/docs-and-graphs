<script setup>
import '@rdfjs-elements/rdf-editor'
import { storeToRefs } from 'pinia'
import { useWorkspaceState } from '../store/workspaceState.js'
import EditBox from './common/Editbox.vue'

const store = useWorkspaceState()
const {
  currentResultQuads,
} = storeToRefs(store)

</script>

<template>

  <div>
    <template v-if="currentResultQuads.length>0">
      <edit-box format="application/trig" :quads="currentResultQuads"/>
    </template>
  </div>

</template>
