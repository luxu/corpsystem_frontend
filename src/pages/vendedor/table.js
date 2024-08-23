import { ref } from 'vue'

const columnsVendedores = [
  { name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true },
  { name: 'nome', required: true, label: 'Nome', align: 'left', field: row => row.nome, sortable: true },
  { name: 'usuario', required: true, label: 'Usuário', align: 'left', field: row => row.usuario, sortable: true },
  { name: 'actions', label: 'Ação', field: 'actions'}
]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 8
})

export {
  columnsVendedores,
  initialPagination
}
