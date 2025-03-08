<template>
  <q-card
    class="column no-wrap"
    :style="
      (isMobile
        ? ''
        : `min-width: ${
            {
              xs: 'unset',
              sm: '85vw',
              md: '70vw',
              lg: '60vw',
              xl: '55vw',
            }[$q.screen.name]
          };`) +
      ' ' +
      `height: ${contentHeight}px`
    "
    :class="isMobile ? 'full-width full-heigth' : ''"
  >
    <q-layout view="LHh lpR fff" container class="bg-white text-dark">
      <q-header ref="pageHeaderRef" class="bg-primary">
        <q-toolbar
          class="bg-grey-2 text-black"
          :style="isMobile ? '' : 'border-bottom: 1px #e8e8e8 solid;'"
          style="height: 68px"
        >
          <q-avatar color="secondary" rounded size="xl">
            <q-icon
              :name="creating ? 'mdi-plus' : readonly ? 'mdi-eye' : 'mdi-pencil'"
              color="primary"
              size="md"
            />
          </q-avatar>
          <div class="flex column justify-center q-ml-md">
            <p class="q-ma-none text-h6" style="line-height: 1.3em">
              {{ title }}
            </p>
            <p class="q-ma-none text-subtitle2 text-grey-9">
              {{ subTitle }}
            </p>
          </div>
          <q-space />
          <slot name="botoes" />
          <template v-if="!isMobile">
            <q-btn
              v-if="!creating && !disableRemove && !readonly"
              @click="remove"
              label="Apagar"
              icon="mdi-trash-can"
              color="negative"
              no-caps
              rounded
            />
            <q-btn
              v-if="creating && !readonly"
              class="q-mx-sm"
              label="Salvar"
              @click="doSubmit"
              icon="mdi-content-save-plus"
              color="positive"
              no-caps
              rounded
            />
            <q-btn
              v-else-if="!readonly"
              @click="doSubmit"
              class="q-mx-sm"
              label="Salvar Alterações"
              icon="mdi-content-save"
              color="positive"
              no-caps
              rounded
            />
          </template>
          <q-separator vertical />
          <q-btn
            @click="cancel"
            class="q-ml-sm"
            icon="mdi-close"
            padding="5px"
            color="grey-8"
            outline
            no-caps
            rounded
          />
        </q-toolbar>
        <q-toolbar
          style="border-bottom: 1px #e8e8e8 solid"
          class="bg-grey-2 flex column q-py-sm"
          v-if="isMobile"
        >
          <q-btn
            v-if="!creating && !disableRemove && !readonly"
            class="full-width"
            @click="remove"
            label="Apagar"
            icon="mdi-trash-can"
            color="negative"
            no-caps
            rounded
          />
          <q-btn
            v-if="creating && !readonly"
            @click="doSubmit"
            class="q-mt-sm full-width"
            label="Salvar"
            icon="mdi-content-save-plus"
            color="positive"
            no-caps
            rounded
          />
          <q-btn
            v-else-if="!readonly"
            @click="doSubmit"
            class="q-mt-sm full-width"
            label="Salvar Alterações"
            icon="mdi-content-save"
            color="positive"
            no-caps
            rounded
          />
        </q-toolbar>
        <slot name="extra-header" v-if="$slots['extra-header']" />
      </q-header>

      <q-page-container ref="pageContainerRef">
        <q-page padding>
          <q-form ref="formRef" @submit="submit">
            <q-card-section>
              <slot />
            </q-card-section>
          </q-form>
          <q-space />
        </q-page>
      </q-page-container>

      <!-- <q-footer ref="pageFooterRef" class="bg-black text-white">
        <audit-block :dados="data" class="full-height" />
      </q-footer> -->
    </q-layout>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QForm, QPageContainer, useQuasar } from 'quasar'

const $q = useQuasar()

const emit = defineEmits(['submit', 'remove', 'cancel'])

const isMobile = computed(() => {
  return $q.screen.lt.md
})

const contentHeight = ref<number>()
// const headerHeight = ref<number>()
// const footerHeight = ref<number>()

const formRef = ref<QForm>()
const pageContainerRef = ref<QPageContainer>()
const pageHeaderRef = ref<QPageContainer>()
// const pageFooterRef = ref<QPageContainer>()

defineProps<{
  creating: boolean
  title: string
  subTitle: string
  disableRemove?: boolean
  readonly?: boolean
  data: {
    created_at: string | null
    updated_at: string | null
    creator: {
      name: string
    } | null
    updater: {
      name: string
    } | null
  }
}>()

const doSubmit = () => {
  formRef.value?.submit()
}

const submit = () => {
  emit('submit')
}

const remove = () => {
  emit('remove')
}

const cancel = () => {
  emit('cancel')
}

// const updateSize = () => {
//   const headerEl = pageHeaderRef.value?.$el
//   const footerEl = pageFooterRef.value?.$el
//   const contentEl = pageContainerRef.value?.$el

//   // Verificar se os elementos existem antes de tentar calcular as alturas
//   if (headerEl && footerEl && contentEl) {
//     headerHeight.value =
//       headerEl?.offsetHeight -
//         (parseFloat(getComputedStyle(headerEl).paddingTop) +
//           parseFloat(getComputedStyle(headerEl).paddingBottom)) || 0
//     footerHeight.value =
//       footerEl?.offsetHeight -
//         (parseFloat(getComputedStyle(footerEl).paddingTop) +
//           parseFloat(getComputedStyle(footerEl).paddingBottom)) || 0
//     contentHeight.value =
//       (contentEl?.offsetHeight -
//         (parseFloat(getComputedStyle(contentEl).paddingTop) +
//           parseFloat(getComputedStyle(contentEl).paddingBottom)) || 0) +
//         (headerHeight.value || 0) +
//         (footerHeight.value || 0) || 0
//   }
// }

// onMounted(() => {
//   const headerEl = pageHeaderRef.value?.$el
//   const footerEl = pageFooterRef.value?.$el
//   const contentEl = pageContainerRef.value?.$el

//   if (headerEl && footerEl && contentEl) {
//     const resizeObserver = new ResizeObserver(updateSize)

//     resizeObserver.observe(headerEl)
//     resizeObserver.observe(footerEl)
//     resizeObserver.observe(contentEl)
//   }
// })
</script>
