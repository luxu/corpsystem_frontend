import { ref } from 'vue'

const columnsProdutos = [
  { name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true },
  { name: 'nome', required: true, label: 'Nome', align: 'left', field: row => row.nome, sortable: true },
  { name: 'categoria', required: true, label: 'Categoria', align: 'left', field: row => row.categoria, sortable: true },
  { name: 'preco', required: true, label: 'Preço', align: 'left', field: row => row.preco, sortable: true },
  { name: 'actions', label: 'Ação', field: 'actions'}

]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 8
})

export {
  columnsProdutos,
  initialPagination
}
