<template>
  <div :class="['magic-uploader', props.columnSize]" :style="styleConfig">
    <q-file
      v-if="presetData"
      ref="fileInput"
      class="q-my-sm"
      hide-bottom-space
      bottom-slots
      :multiple="false"
      :max-file-size="presetData?.max || props.maxFileSize"
      :max-files="10"
      v-model="files"
      :accept="presetData.mimeTypes.map((type: string) => `.${type.split('/')[1]}`).join()"
      :label="
        props.criando
          ? `Upload de ${label || 'arquivo'} (Max: ${convertToMb(presetData?.max || 0)}MB)`
          : `1 ${label || 'arquivo(s)'} para download!`
      "
      :readonly="readonly"
      :rules="[
        (val) => (fileRequired && !existingFiles && !val ? !!val || 'Campo obrigatório' : true),
      ]"
      @update:model-value="getFileValue"
      @rejected="onRejected"
    >
      <template v-slot:append>
        <q-btn
          v-if="files || existingFiles"
          icon="mdi-download"
          flat
          size="sm"
          color="secondary"
          label="Baixar"
          @click="props.criando ? openFileSelector() : downloadFile()"
        />

        <q-btn
          @click="removeFile"
          v-if="(!readonly && files) || (!readonly && existingFiles)"
          icon="mdi-close"
          flat
          size="sm"
          color="negative"
          label="Remover"
        />
        <q-icon v-if="fileRequired" name="mdi-asterisk" color="negative" size="xs" />
      </template>

      <template v-slot:hint>
        {{
          maxWidthImg
            ? `Formatos aceito (${acceptFiles}, ${convertToMb(
                presetData?.max || 0,
              )}MB máximo e máximo de largura ${maxWidthImg}px)`
            : `Formatos aceito (${acceptFiles} e ${convertToMb(presetData?.max || 0)}MB máximo)`
        }}
      </template>

      <q-tooltip v-if="!readonly">
        Tipos permitidos:
        <b> {{ presetData.mimeTypes.map((type: string) => type.split('/')[1]).join(', ') }}</b
        >.
      </q-tooltip>
    </q-file>
  </div>
</template>

<script setup lang="ts">
import { Dialog, exportFile, QFile, useQuasar } from 'quasar'
import { onBeforeMount, ref, computed, watch, onMounted } from 'vue'
import type { CrudsAPIOutputs } from '@manager-members/cruds'
import * as pdfjsLib from 'pdfjs-dist'
import useCrudsAPIClient from 'src/composables/useCrudsApiClient'

// Configurando o workerSrc para o pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf-worker.js'

const $q = useQuasar()
const emit = defineEmits(['file-added', 'file-removed', 'file-rejected', 'file-error'])

const files = defineModel<File | undefined>()
const existingFiles = defineModel<string | undefined | null>('existingFile')

type MimeType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/gif'
  | 'image/webp'
  | 'image/svg+xml'
  | 'image/bmp'
  | 'image/tiff'
  | 'image/heif'
  | 'image/heic'
  | 'application/pdf'

export interface DownloadFile {
  downloadLink: string
  id: string
  url: string
  mime_type: string
  thumbnail?: string | null
}

interface Props {
  id?: string
  columnSize: string
  styleConfig: { [key: string]: string }
  criando: boolean
  autoClick?: boolean
  preset?: string
  maxFileSize?: number
  readonly: boolean
  nameFile?: string
  maxWidthImg?: number
  label?: string
  fileRequired?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  columnSize: 'col-6',
  criando: false,
  autoClick: false,
  preset: 'default',
  maxFileSize: 5 * 1024 * 1024,
  readonly: false,
  fileRequired: true,
})

const crudsApiClient = useCrudsAPIClient()

const fileInput = ref<QFile>()
const thumbnail = ref<string | null>(null)
const currentFilePreviewLoaded = ref<boolean>(false)

const generateThumbnail = async (fileUrl: string) => {
  await pdfjsLib.getDocument(fileUrl).promise.then(async (pdfDocument) => {
    const page = await pdfDocument.getPage(1)

    const scale = 0.5
    const viewport = page.getViewport({ scale })

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return

    canvas.height = viewport.height
    canvas.width = viewport.width

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise
    thumbnail.value = canvas.toDataURL()
  })
}

const acceptFiles = computed(() => {
  if (presetData.value)
    return presetData.value.mimeTypes.map((type: string) => type.split('/')[1]).join(', ')

  return ''
})

const validWidthImg = (file: File, maxWidth: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (file) {
      const img = new Image()
      const objectURL = URL.createObjectURL(file)

      img.onload = function () {
        const width = img.width
        // const height = img.height;

        if (width > maxWidth) {
          reject(
            new Error(`A largura da imagem (${width}px) é maior que o limite de ${maxWidth}px.`),
          )
        } else {
          resolve()
        }

        URL.revokeObjectURL(objectURL)
      }

      img.src = objectURL
    } else {
      reject(new Error('Nenhum arquivo foi fornecido.'))
    }
  })
}

const getFileValue = async (file: File) => {
  if (props.maxWidthImg)
    try {
      await validWidthImg(file, props.maxWidthImg)
    } catch (err: unknown) {
      $q.notify({
        color: 'negative',
        message: String(err),
        icon: 'warning',
      })

      emit('file-rejected')
      files.value = undefined
      return
    }

  $q.loading.show()

  try {
    const dbFile = await crudsApiClient.arquivos.getPutUrl
      .mutate({
        size: file?.size,
        mimeType: file?.type as MimeType,
        presetName: props.preset,
        name: file?.name,
      })
      .catch((e: unknown) => {
        const message = (e as { message: string }).message
        Dialog.create({
          message: `${message}`,
        })
        throw new Error(message)
      })

    const response = await fetch(dbFile.url as URL | RequestInfo, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    }).then(async (data) => {
      try {
        await crudsApiClient.arquivos.confirmFileUpload.mutate({
          id: dbFile.id,
        })
      } catch (e: unknown) {
        const message = (e as { message: string }).message
        Dialog.create({
          message: `${message}`,
        })

        return
      }

      return data
    })

    if (response) {
      const downloadLink = await crudsApiClient.arquivos.getShowUrl.query({
        key: `${dbFile.id}.${file?.type.split('/')[1]}`,
      })

      if (file && file.type === 'application/pdf') {
        await generateThumbnail(URL.createObjectURL(file))
      }

      emit('file-added', {
        ...dbFile,
        downloadLink,
        thumbnail: thumbnail.value,
      })
    }

    return dbFile
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Não foi possível adicionar o arquivo',
    })
  } finally {
    $q.loading.hide()
  }
}

const downloadFile = async () => {
  const arquivo = await crudsApiClient.arquivos.get.query({
    id: existingFiles.value || '',
  })

  const typeFile = arquivo?.mime_type.split('/')[1]

  const downloadLink = await crudsApiClient.arquivos.getShowUrl.query({
    key: `${arquivo?.id}.${typeFile}`,
  })

  const dataImage = await fetch(downloadLink, { method: 'GET' })

  const blobFile = await dataImage.blob()

  if (props.nameFile) {
    exportFile(`${props.nameFile}.${typeFile}`, blobFile)
    return
  }

  exportFile(arquivo?.file_name || '', blobFile)
}

const removeFile = () => {
  files.value = undefined
  existingFiles.value = null
  emit('file-removed')
}

const presetData = ref<NonNullable<CrudsAPIOutputs['preset']['get']>>()

const openFileSelector = () => {
  setTimeout(() => fileInput.value?.pickFiles(), 200)
}

if (props.autoClick) openFileSelector()

const convertToMb = (bytesSize: number) => {
  return Math.round(bytesSize / (1024 * 1024))
}

const onRejected = () => {
  $q.notify({
    type: 'negative',
    message: 'Formato ou tamanho do arquivo estão inválidos, favor anexar outro arquivo.',
  })
}

const loadCurrentFilePreview = async (fileKey: string) => {
  const fileUrl = await crudsApiClient.arquivos.getShowUrl.query({
    key: `${fileKey}.pdf`,
  })

  if (fileUrl) {
    await generateThumbnail(fileUrl)

    emit('file-added', {
      downloadLink: fileUrl,
      id: fileKey,
      url: fileUrl,
      mime_type: 'pdf',
      thumbnail: thumbnail.value,
    })
  }

  currentFilePreviewLoaded.value = true
}

onBeforeMount(async () => {
  presetData.value = await crudsApiClient.preset.get.query({
    presetName: props.preset,
  })
})

watch(existingFiles, async () => {
  if (
    ['pdf_50_mb', 'pdf'].includes(props.preset) &&
    !files.value &&
    existingFiles.value &&
    !currentFilePreviewLoaded.value
  ) {
    $q.loading.show()

    try {
      await loadCurrentFilePreview(existingFiles.value)
    } catch {
      $q.notify({
        type: 'negative',
        message: 'Não foi possível carregar o arquivo existente',
      })
    } finally {
      $q.loading.hide()
    }
  }
})

onMounted(async () => {
  if (
    ['pdf_50_mb', 'pdf'].includes(props.preset) &&
    !files.value &&
    existingFiles.value &&
    !currentFilePreviewLoaded.value
  ) {
    $q.loading.show()

    try {
      await loadCurrentFilePreview(existingFiles.value)
    } catch {
      $q.notify({
        type: 'negative',
        message: 'Não foi possível carregar o arquivo existente',
      })
    } finally {
      $q.loading.hide()
    }
  }
})
</script>
