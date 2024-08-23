import { ref } from 'vue'

const columnsItensVenda = [
  { name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true },
  { name: 'venda', required: true, label: 'Venda', align: 'left', field: row => row.venda, sortable: true },
  { name: 'produto', required: true, label: 'Produto', align: 'left', field: row => row.produto, sortable: true },
  { name: 'quantidade', required: true, label: 'Quantidade', align: 'left', field: row => row.quantidade, sortable: true },
  { name: 'actions', label: 'Ação', field: 'actions'}

]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 8
})

export {
  columnsItensVenda,
  initialPagination
}
