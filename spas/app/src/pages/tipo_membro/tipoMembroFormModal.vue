<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form @submit="submit">
        <q-input
          v-model="dados.descricao"
          :rules="[(val) => !!val || 'Campo obrigatório']"
          label="Descricao"
        >
          <template v-slot:append>
            <q-icon name="mdi-asterisk" color="negative" size="xs" />
          </template>
        </q-input>
        <q-input v-model="dados.observacao" label="Observaçao" />
        <q-card-actions align="right">
          <q-btn color="primary" label="Enviar" type="submit" />
          <q-btn color="primary" label="Cancelar" @click="onDialogCancel" />
          <q-btn v-if="dados.id" color="primary" label="Excluir" @click="apagar" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
  
<script setup lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar'
// import FormWrapper from 'src/components/crud/FormWrapper.vue'
import { onMounted, ref } from 'vue'
import type { CrudsAPIOutputs, CrudsTRPCErrors } from '../../../../../apis/cruds/src'
import useCrudsAPIClient from 'src/composables/useCrudsApiClient'

const props = defineProps<{
  id?: string
}>()

const $q = useQuasar()
const crudsApiClient = useCrudsAPIClient()

const dados = ref<NonNullable<CrudsAPIOutputs['tipo_membros']['get']>>({
  id: '',
  status: 'active',
  descricao: '',
  observacao: '',
  created_at: null,
  created_by: null,
  updated_at: null,
  updated_by: null,
})

const refresh = async () => {
  $q.loading.show()

  if (props.id) {
    try {
      const resultado = await crudsApiClient.tipo_membros.get.query({
        id: props.id,
      })

      if (resultado) {
        dados.value = resultado
      } else {
        throw new Error('Tipo Membro não encontrado')
      }
    } catch {
      $q.dialog({
        title: 'Ocorreu um erro',
        message: 'Um erro interno ocorreu carregando as informações, tente novamente mais tarde.',
        color: 'negative',
      })
      $q.loading.hide()
    }
  }

  $q.loading.hide()
}

onMounted(async () => {
  try {
    await refresh()
  } catch (error) {
    console.error('Erro ao carregar', error)
  }
})

const adicionar = async () => {
  try {
    $q.loading.show()

    const result = await crudsApiClient.tipo_membros.create.mutate({
      descricao: dados.value?.descricao || '',
      status: dados.value?.status || 'active',
      observacao: dados.value?.observacao || null,
    })

    $q.notify({
      message: 'Informações salvas com sucesso.',
      color: 'positive',
      position: 'top-right',
    })

    onDialogOK(result)
  } catch (e: unknown) {
    if ((<CrudsTRPCErrors>e)?.data?.httpStatus === 400) {
      const mensagem = (e as { message: '' })?.message
      $q.dialog({
        title: 'Ocorreu um erro',
        message: mensagem,
        color: 'negative',
      })
      return
    }

    $q.dialog({
      title: 'Ocorreu um erro',
      message: 'Um erro interno ocorreu carregando as informações, tente novamente mais tarde.',
      color: 'negative',
    })
  } finally {
    $q.loading.hide()
  }
}

const salvar = async () => {
  try {
    $q.loading.show()

    const result = await crudsApiClient.tipo_membros.update.mutate({
      id: dados.value.id || '',
      descricao: dados.value?.descricao || '',
      status: dados.value?.status || 'active',
      observacao: dados.value?.observacao || '',
    })

    $q.notify({
      message: 'Informações salvas com sucesso.',
      color: 'positive',
      position: 'top-right',
    })

    onDialogOK(result)
  } catch (e: unknown) {
    if ((<CrudsTRPCErrors>e)?.data?.httpStatus === 400) {
      const mensagem = (e as { message: '' })?.message
      $q.dialog({
        title: 'Ocorreu um erro',
        message: mensagem,
        color: 'negative',
      })
      return
    }

    $q.dialog({
      title: 'Ocorreu um erro',
      message: 'Um erro interno ocorreu carregando as informações, tente novamente mais tarde.',
      color: 'negative',
    })
  } finally {
    $q.loading.hide()
  }
}

const apagar = () => {
  $q.dialog({
    title: 'Confirmação',
    message: 'Deseja remover este registro? esta ação é irreversível..',
    color: 'negative',
    ok: true,
    cancel: true,
  }).onOk(async () => {
    try {
      $q.loading.show()

      const result = await crudsApiClient.tipo_membros.delete.mutate({
        id: dados.value.id || '',
      })

      $q.notify({
        message: 'Informações removidas com sucesso.',
        color: 'positive',
        position: 'top-right',
      })

      onDialogOK(result)
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

const submit = async () => {
  if (!props.id) {
    await adicionar()
  } else {
    await salvar()
  }
}
defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
// function onOKClick() {
//   // on OK, it is REQUIRED to
//   // call onDialogOK (with optional payload)
//   onDialogOK()
//   // or with payload: onDialogOK({ ... })
//   // ...and it will also hide the dialog automatically
// }
</script>
