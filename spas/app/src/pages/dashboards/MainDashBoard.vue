<template>
  <q-page class="column q-pa-md">
    <div class="full-width flex row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pa-sm">
        <circle-chart-card
          key="chart1"
          class="full-width"
          title="Cargos"
          subtitle="Cargos"
          type="pie"
          color="blue"
          icon="mdi-account"
          :labels="tipoMembroDash.labels"
          :values="tipoMembroDash.values"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CircleChartCard from 'components/common/CircleChartCard.vue'
import useDashboardsApiClient from 'src/composables/useDashboardsApiClient'
import { ref, onMounted, computed } from 'vue'
import type { DashboardsAPIOutputs } from '@manager-members/dashboards'

const dados = ref<DashboardsAPIOutputs['tipo_membros']['list']>()
const dashboardsApiClient = useDashboardsApiClient()

const tipoMembroDash = computed<{
  labels: string[]
  values: number[]
}>(() => {
  if (!dados.value?.data.length)
    return {
      labels: [],
      values: [],
    }
  return dados.value.data.reduce(
    (
      acc: { labels: string[]; values: number[] },
      curr: {
        qtd?: number
        tipo?: string
      }
    ) => {
      acc.labels.push(curr.tipo || '')
      acc.values.push(curr.qtd || 0)

      return acc
    },
    {
      labels: [] as string[],
      values: [] as number[],
    }
  )
})

const refresh = async () => {
  dados.value = await dashboardsApiClient.tipo_membros.list.query()
}

onMounted(async () => {
  try {
    await refresh()
  } catch (error) {
    console.error('Erro ao carregar', error)
  }
})
</script>
