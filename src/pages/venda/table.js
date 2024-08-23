import { ref } from 'vue'

const columnsVendas = [
  { name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true },
  { name: 'vendedor', required: true, label: 'Vendedor', align: 'left', field: row => row.nome, sortable: true },
  { name: 'cliente', required: true, label: 'Cliente', align: 'left', field: row => row.cliente, sortable: true },
  { name: 'total_a_pagar', required: true, label: 'Total a Pagar', align: 'left', field: row => row.total_a_pagar, sortable: true },
  { name: 'data_venda', required: true, label: 'Data da Venda', align: 'left', field: row => row.data_venda, sortable: true },
  { name: 'actions', label: 'Ação', field: 'actions'}

]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 8
})

export {
  columnsVendas,
  initialPagination
}
