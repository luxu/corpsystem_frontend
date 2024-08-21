import { ref } from 'vue'

const columnsCategorias = [
  { name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true },
  { name: 'descricao', required: true, label: 'Descrição', align: 'left', field: row => row.descricao, sortable: true },
  { name: 'actions', label: 'Ação', field: 'actions'}

]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 8
})

export {
  columnsCategorias,
  initialPagination
}
