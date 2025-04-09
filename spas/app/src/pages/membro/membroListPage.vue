<template>
  <q-page class="column items-center q-pa-md">
    <q-table
      :rows="data?.data || []"
      :columns="colunasMembro"
      row-key="id"
      @row-dblclick="rowDblClickFn"
    >
      <template v-slot:top>
        <q-btn
          @click="abrirForm()"
          label="Adicionar"
          icon="mdi-plus"
          color="positive"
          no-caps
          rounded
        />
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import colunasMembro from './colunasMembro'
import useCrudsAPIClient from 'src/composables/useCrudsApiClient'
import type { CrudsAPIOutputs } from '../../../../../apis/cruds/src'
import membroFormModal from 'src/pages/membro/membroFormModal.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const data = ref<CrudsAPIOutputs['membros']['list']>()
const crudsApiClient = useCrudsAPIClient()

const refresh = async () => {
  data.value = await crudsApiClient.membros.list.query()
}

const abrirForm = (id: string | undefined = undefined) => {
  $q.dialog({
    component: membroFormModal,
    componentProps: {
      id,
    },
  }).onDismiss(async () => {
    $q.loading.show()
    try {
      await refresh()
    } catch {
      $q.dialog({
        title: 'Ocorreu um erro',
        message: 'Um erro interno ocorreu carregando as informações, tente novamente mais tarde.',
        color: 'negative',
      })
    } finally {
      $q.loading.hide()
    }
  })
}

const rowDblClickFn = (_: Event, row: CrudsAPIOutputs['membros']['list']['data'][0]) => {
  abrirForm(row.id)
}

onMounted(async () => {
  try {
    await refresh()
  } catch (error) {
    console.error('Erro ao carregar', error)
  }
})
</script>
