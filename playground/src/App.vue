<script setup>
import { NSelect } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { Glayout, useLayoutStore } from 'playground-template'
import { onMounted, ref, watch } from 'vue'
import examples from '../../test/tests.js'
import { MARKDOWN } from './config.js'
import { contentLayout } from './layouts.js'
import { useWorkspaceState } from './store/workspaceState.js'

const store = useLayoutStore()
const { rootLayoutRef } = storeToRefs(store)
const { addInstance, loadLayoutConfig } = store

const workspace = useWorkspaceState()

const components = [MARKDOWN]

onMounted(async () => {
  loadLayoutConfig(contentLayout)
  workspace.setExample(examples[0])

})
const value = ref()

watch(value, () => {
  workspace.setExample(examples[value.value])
})

</script>

<template>

  <div class="full-height">
    <div id="nav">
      <h1>AST Playground</h1>
      <template v-for="component of components">
        <button @click="addInstance(component)">
          {{ component.title }}
        </button>
      </template>

      <n-select v-model:value="value" :options="examples.map((example, index)=>{
        return {label:example.title,value:index}
      })"/>

    </div>
    <glayout
        ref="rootLayoutRef"
        componentPathPrefix="../../../../src/"
        style="width: 100%; height: calc(100% - 90px)"
    ></glayout>
  </div>
</template>

<style>
@import "golden-layout/dist/css/goldenlayout-base.css";
@import "golden-layout/dist/css/themes/goldenlayout-dark-theme.css";

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  overflow: hidden;

}

.full-height, #app {
  height: 100%;
}
</style>



