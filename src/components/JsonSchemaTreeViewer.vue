<script setup lang="ts">
import { tryOnBeforeMount } from "@vueuse/core"
import { ref } from "vue"
import { VTreeviewItem } from "vuetify/lib/labs/VTreeview"
import Dereferencer from "@json-schema-tools/dereferencer"

const props = defineProps<Props>()
type Props = { schema: string | object }

const items = ref<VTreeviewItem[]>([])
const selected = ref<VTreeviewItem>()

tryOnBeforeMount(async () => {
  // console.log('resolving schema', props.schema)
  const deref = new Dereferencer(props.schema);
  const schemaResolved = await deref.resolve()

  // console.log('traversing schema dfs', props.schema)
  // for (const [key, value, path, parent] of traverse(props.schema)) {
  //   console.log({ key, value, path, parent })
  // }

  // console.log('traversing schema bfs', props.schema)
  // for (const [key, path, value, parent] of traverseBfs(props.schema)) {
  //     console.log({ key, value, path, parent })
  // }


  console.log('traversing schema dfs and creating treeview', props.schema)
  for (const treeItem of createTreeView(schemaResolved)) {
    items.value.push(treeItem);
  }

})


type TraverseResult = [key: string, path: string, value: any, parent: any]

function* traverse(o: any, path: any[] = []): IterableIterator<TraverseResult> {
  for (var i in o) {
    const itemPath = path.concat(i)
    yield [i, o[i], itemPath.join('.'), o];
    if (o[i] !== null && typeof (o[i]) == "object") {
      yield* traverse(o[i], itemPath);
    }
  }
}

function* createTreeView(schema: any, parentKey: string = '#'): IterableIterator<Treeview> {
  for (const key in schema) {
    const value = schema[key];
    const currentPath = `${parentKey}.${key}`;

    // Create the tree view item
    const treeItem: Treeview = {
      title: key,
      key: currentPath,
      children: []
    };

    // If the value is an object, call createTreeView recursively
    if (value !== null && typeof value === 'object') {
      // Generate child children recursively
      treeItem.children = [...createTreeView(value, currentPath)];
    }

    yield treeItem; // Yield the constructed tree item
  }
}

function* traverseBfs(o: any): IterableIterator<TraverseResult> {

  const queue: any[] = [{ obj: o, path: ['#'] }]

  while (queue.length) {
    const { obj, path } = queue.pop()
    for (const i in obj) {
      const itemPath = path.concat(i)
      yield[i, itemPath.join('.'), obj[i], obj]
      if (obj[i] !== null && typeof (obj[i]) == "object") {
        queue.push({ obj: obj[i], path: itemPath })
      }
    }
  }
}

</script>

<template>
  <v-treeview
      v-model:selected="selected"
      :items="items"
      select-strategy="classic"
      selectable
  >
  </v-treeview>
  <pre>{{ selected }}</pre>
</template>

<style lang="scss">

</style>