<template>
  <q-page padding>

    <q-table
        :rows="categorias"
        :columns="columnsCategorias"
        row-key="categoria"
        :loading="loading"
        :dense="$q.screen.lt.md"
        flat bordered
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-pencil-outline"
              color="info"
              dense
              size="sm"
              @click="handleEdit(props.row)"
              />
            <q-btn
              icon="mdi-delete-outline"
              color="negative"
              dense
              size="sm"
              @click="handleRemoveVehicle(props.row)"
              />
          </q-td>
        </template>
      </q-table>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'form-categoria' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>

import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { defineComponent, onMounted, ref, computed } from 'vue'
import { columnsCategorias, initialPagination } from './table'


export default defineComponent({
  name: 'PageCategoria',
  setup () {
    const categorias = ref([])
    const router = useRouter()
    const loading = ref(true)


    const handleListCategorias = () => {
      const url = 'api/v1/categorias'
      loading.value = true
      api.get(url)
        .then(function (response) {
          categorias.value = response.data
          loading.value = false
        })
        .catch(function (error) {
          console.error(error)
        })
    }


    const handleEdit = (categoria) => {
      router.push({ name: 'form-categoria', params: { id: categoria.id } })
    }

    onMounted(()=>{
      handleListCategorias()
    })

    return {
      loading,
      categorias,
      handleEdit,
      columnsCategorias,
      initialPagination,
      pagesNumber: computed(() => Math.ceil(users.value.length / initialPagination.value.rowsPerPage))
    }
  }
})

</script>
