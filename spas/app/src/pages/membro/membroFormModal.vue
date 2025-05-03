<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form @submit="submit">
        <q-avatar class="q-mb-sm" v-if="urlFilePic" rounded size="128px">
          <img v-if="urlFilePic" :src="urlFilePic" />
        </q-avatar>
        <magic-uploader
          v-model="filePic"
          v-model:existing-file="dados.id_foto"
          columnSize="col-12"
          :styleConfig="{}"
          label="Foto do Membro"
          :criando="!dados.id_foto"
          :readonly="false"
          :nameFile="`_${dados.nome}`"
          :maxWidthImg="120"
          @file-rejected="() => (urlFilePic = '')"
          @file-removed="() => (urlFilePic = '')"
          @file-added="(file) => onFileAdded(file, 'id_foto')"
        />

        <q-input v-model="dados.nome" :rules="[(val) => !!val || 'Campo obrigatório']" label="Nome">
          <template v-slot:append>
            <q-icon name="mdi-asterisk" color="negative" size="xs" />
          </template>
        </q-input>

        <q-select
          class="full-width"
          v-model="dados.id_tipo_membro"
          label="Tipo Membro"
          map-options
          emit-value
          :option-value="(item) => item.id"
          :option-label="(item) => item.descricao"
          :options="optionsTiposMembro"
          clearable
          use-input
          fill-input
          hide-selected
          hide-bottom-space
          :rules="[(val: string) => !!val || 'Campo obrigatório']"
        >
          <template v-slot:append>
            <q-icon name="mdi-asterisk" color="negative" size="xs" />
          </template>
        </q-select>

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
import MagicUploader, { DownloadFile } from 'src/components/crud/MagicUploader.vue'

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const props = defineProps<{
  id?: string
}>()

const $q = useQuasar()
const crudsApiClient = useCrudsAPIClient()

const dados = ref<NonNullable<CrudsAPIOutputs['membros']['get']>>({
  id: '',
  status: 'active',
  id_foto: '',
  id_tipo_membro: '',
  nome: '',
  observacao: '',
  created_at: null,
  created_by: null,
  updated_at: null,
  updated_by: null,
})

const optionsTiposMembro = ref()
const urlFilePic = ref<string>('')
const filePic = ref<File>()

const loadOptionsTiposMembro = async () => {
  const resultado = await crudsApiClient.lists.tipos_membro.query()

  if (resultado) optionsTiposMembro.value = resultado
}

const refresh = async () => {
  $q.loading.show()

  if (props.id) {
    try {
      await loadOptionsTiposMembro()
      const resultado = await crudsApiClient.membros.get.query({
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
    await loadOptionsTiposMembro()
    await refresh()
  } catch (error) {
    console.error('Erro ao carregar', error)
  }
})

const adicionar = async () => {
  try {
    $q.loading.show()

    const result = await crudsApiClient.membros.create.mutate({
      idTipoMembro: dados.value.id_tipo_membro || '',
      nome: dados.value.nome || '',
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

    const result = await crudsApiClient.membros.update.mutate({
      id: dados.value.id || '',
      idTipoMembro: dados.value.id_tipo_membro || '',
      nome: dados.value.nome || '',
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

      const result = await crudsApiClient.membros.delete.mutate({
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

function onFileAdded(file: DownloadFile, field: 'id_foto') {
  dados.value[field] = file.id
  if (field === 'id_foto') urlFilePic.value = file.downloadLink
}

const submit = async () => {
  if (!props.id) {
    await adicionar()
  } else {
    await salvar()
  }
}

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
