<template>
  <q-page class="column items-center q-pa-md">
    <q-btn
      @click="abrirForm()"
      label="Adicionar"
      icon="mdi-plus"
      color="positive"
      no-caps
      rounded
    />
    <q-table :rows="data?.data || []" :columns="colunasTipoMembros" row-key="id" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import colunasTipoMembros from './colunasTipoMembroListPage'
import useCrudsAPIClient from 'src/composables/useCrudsApiClient'
import type { CrudsAPIOutputs } from '../../../../../apis/cruds/src'
import tipoMembroFormModal from 'src/pages/tipo_membro/tipoMembroListPage.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const data = ref<CrudsAPIOutputs['tipo_membros']['list']>()
const crudsApiClient = useCrudsAPIClient()

const refresh = async () => {
  data.value = await crudsApiClient.tipo_membros.list.query()
}

const abrirForm = (id: string | undefined = undefined) => {
  $q.dialog({
    component: tipoMembroFormModal,
    componentProps: {
      id,
    },
  }).onDismiss(async () => {
    $q.loading.show()
    await refresh()
    $q.loading.hide()
  })
}

onMounted(() => {
  refresh()
})
</script>
