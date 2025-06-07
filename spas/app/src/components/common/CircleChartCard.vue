<template>
  <generic-card
    :title="props.title"
    :color="props.color"
    :subtitle="props.subtitle"
    :icon="props.icon"
  >
    <template v-slot:toolBar>
      <q-btn :color="props.color" flat icon="mdi-menu">
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list style="min-width: 133px">
            <q-item
              v-for="option in menuOptions"
              :key="option.value"
              clickable
              @click="() => downloadChartImage(option.value)"
            >
              <q-item-section>{{ option.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
    <template v-if="labels && values && values.length > 0">
      <apex-chart
        ref="chartRef"
        :type="props.type"
        height="350px"
        class="full-width justify-center items-center flex"
        :options="chartOptions"
        :series="props.values"
        @dataPointSelection="handleDataPointSelection"
      ></apex-chart>
    </template>
    <template v-else>
      <div style="height: 80px" class="full-width flex justify-center items-center">
        <p :class="`text-${'secondary'}`" class="text-h6 text-bold q-ma-none">Sem Dados</p>
      </div>
    </template>
  </generic-card>
</template>

<script setup lang="ts">
import type { NamedColor } from 'quasar'
import GenericCard from 'components/common/GenericCard.vue'
import { computed, ref } from 'vue'
import type ApexCharts from 'apexcharts'

interface ApexConfig {
  seriesIndex: number
  dataPointIndex: number
  w: ApexCharts
}

interface Props {
  title: string
  subtitle: string
  icon: string
  color: NamedColor
  columnsColor?: string[]
  type: 'pie' | 'donut'
  labelMap?: { [label: string]: string }
  labels?: string[]
  values?: number[] | string[]
}

const props = defineProps<Props>()

const chartRef = ref<ApexCharts | null>(null)

const emit = defineEmits(['clickPoint'])

const menuOptions = [
  {
    label: 'Download PNG',
    value: 'png',
  },
  {
    label: 'Download SVG',
    value: 'svg',
  },
  {
    label: 'Download CSV',
    value: 'csv',
  },
]

const chartOptions = computed(() => ({
  colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#FF7043', '#42A5F5'],
  labels: props.labels,
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      colors: ['#FFF'],
    },
  },
  legend: {
    position: 'right',
  },
}))

const handleDataPointSelection = (
  event: MouseEvent,
  chartContext: ApexChart,
  config: ApexConfig,
) => {
  const { dataPointIndex } = config
  const label = props.labels?.[dataPointIndex]
  const value = props.values?.[dataPointIndex]
  emit('clickPoint', { label: label, value: value, index: dataPointIndex })
}

const downloadChartImage = async (fileType: string) => {
  if (chartRef.value) {
    try {
      const uri = await chartRef.value.dataURI()
      if ('imgURI' in uri) {
        const fileName = props.title.toLowerCase().replaceAll(' ', '-')
        const link = document.createElement('a')
        link.href = uri.imgURI
        link.download = `${fileName}.${fileType}`
        link.click()
      }
    } catch (error) {
      console.error('Erro ao gerar imagem do gráfico:', error)
    }
  }
}
</script>
