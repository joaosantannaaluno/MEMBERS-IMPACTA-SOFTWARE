import type { QTableColumn } from 'quasar'
import type { CrudsAPIOutputs } from '../../../../../apis/cruds/src'
import { formatDateTime } from 'src/utils/date-time'

const columns: QTableColumn[] = [
  {
    name: 'status',
    label: 'Status',
    align: 'center',
    field: (row: CrudsAPIOutputs['membros']['list']['data'][0]) => row.status,
    format: (row: CrudsAPIOutputs['membros']['list']['data'][0]['status']) =>
      row === 'active' ? 'Ativo' : 'Inativo',
    sortable: true,
    style: () => {
      return 'width: 150px'
    },
  },
  {
    name: 'nome',
    label: 'Nome',
    align: 'left',
    field: (row: CrudsAPIOutputs['membros']['list']['data'][0]) => row.nome,
    sortable: true,
  },
  {
    name: 'tipo_membro',
    label: 'Tipo Membro',
    align: 'center',
    field: (row: CrudsAPIOutputs['membros']['list']['data'][0]) => row.tipo_membro,
    sortable: true,
  },
  {
    name: 'observacao',
    label: 'Observação',
    align: 'center',
    field: (row: CrudsAPIOutputs['membros']['list']['data'][0]) => row.observacao,
    sortable: true,
  },
  {
    name: 'created_at',
    label: 'Criado Em',
    align: 'center',
    field: (row: CrudsAPIOutputs['membros']['list']['data'][0]) => row.created_at,
    format: (row: CrudsAPIOutputs['membros']['list']['data'][0]['created_at']) =>
      row ? (formatDateTime(row) as string) : '',
    sortable: true,
  },
  {
    name: 'created_by',
    label: 'Criado Por',
    align: 'center',
    field: (row: CrudsAPIOutputs['membros']['list']['data'][0]) => row.created_by,
    sortable: true,
  },
]

export default columns
