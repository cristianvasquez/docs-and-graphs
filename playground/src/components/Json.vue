<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useWorkspaceState } from '../store/workspaceState.js'

const store = useWorkspaceState()
const {
  currentJson,
} = storeToRefs(store)

const json = computed(() => JSON.stringify(currentJson.value, null, 2))

</script>

<template>
  <div>
    <textarea cols="200" rows="80">{{ json }}</textarea>
  </div>
</template>
