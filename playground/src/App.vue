<script setup>
import { ref, watch } from 'vue'
import { NInput } from 'naive-ui'
import { simpleAst } from '../../index.js'

const markdown = ref('')
const json = ref({})

watch(markdown, (newValue) => {
  json.value = simpleAst(newValue, { includePosition: true })
})
</script>

<template>
  <n-input
      type="textarea"
      v-model:value="markdown"
      :autosize="{ minRows: 3 }"
  />
  <div>
    <textarea
        cols="200"
        rows="80"
        readonly
    >{{ JSON.stringify(json, null, 2) }}</textarea>
  </div>
</template>
