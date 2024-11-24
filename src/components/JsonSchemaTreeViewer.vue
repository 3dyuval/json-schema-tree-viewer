<script setup lang="ts">
import DeReferencer from "@json-schema-tools/dereferencer";
import defsSchema from "../assets/defs.json";
import { tryOnBeforeMount } from "@vueuse/core"
import { ref } from "vue"


const items = ref([])


tryOnBeforeMount(async () => {
  const dereferencer = new DeReferencer(defsSchema);
  console.log(await dereferencer.resolve());

})

</script>

<template>
  <v-treeview :items="items">

  </v-treeview>
</template>

<style lang="scss">

</style>