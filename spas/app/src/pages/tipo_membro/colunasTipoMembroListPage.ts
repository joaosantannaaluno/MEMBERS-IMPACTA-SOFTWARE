import type { QTableColumn } from 'quasar'
import type { CrudsAPIOutputs } from '../../../../../apis/cruds/src'

const columns: QTableColumn[] = [
  {
    name: 'status',
    label: 'Status',
    align: 'center',
    field: (row: CrudsAPIOutputs['tipo_membros']['list']['data'][0]) => row.status,
    format: (row: CrudsAPIOutputs['tipo_membros']['list']['data'][0]['status']) => row === 'active' ? 'Ativo' : 'Inativo',
    sortable: true,
    style: () => {
      return 'width: 150px'
    },
  },
  {
    name: 'descricao',
    label: 'Descrição',
    align: 'center',
    field: (row: CrudsAPIOutputs['tipo_membros']['list']['data'][0]) => row.descricao,
    sortable: true,
  },
  {
    name: 'observacao',
    label: 'Observação',
    align: 'center',
    field: (row: CrudsAPIOutputs['tipo_membros']['list']['data'][0]) => row.observacao,
    sortable: true,
  },
  {
    name: 'created_at',
    label: 'Criado Em',
    align: 'center',
    field: (row: CrudsAPIOutputs['tipo_membros']['list']['data'][0]) => row.created_at,
    sortable: true,
  },
  {
    name: 'created_by',
    label: 'Criado Por',
    align: 'center',
    field: (row: CrudsAPIOutputs['tipo_membros']['list']['data'][0]) => row.created_by,
    sortable: true,
  },
]

export default columns
