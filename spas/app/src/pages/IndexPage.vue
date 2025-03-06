<template>
  <q-page class="row items-center justify-evenly">
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->

    <q-btn @click="refresh" label="refresh" />
    {{ result }}
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useCrudsAPIClient from 'src/composables/useCrudsApiClient'
import type { CrudsAPIOutputs } from '../../../../apis/cruds/src';

const crudsApiClient = useCrudsAPIClient()

const result = ref<CrudsAPIOutputs['tipo_membros']['list']>([])

const refresh = async () => {
  try {
    result.value = await crudsApiClient.tipo_membros.list.query()
  } catch (e: unknown) {
    throw new Error(e as string)
  }
}
</script>
