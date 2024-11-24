<script setup lang="ts">
import JsonSchemaTreeViewer from "./components/JsonSchemaTreeViewer.vue"
import address from "./assets/address.json"
// import metadata from '../../gc/gc-rules/src/mock/metadata.json';
</script>

<template>
  <json-schema-tree-viewer :schema="address" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
