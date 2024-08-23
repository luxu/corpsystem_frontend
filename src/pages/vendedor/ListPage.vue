<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Lista de Vendedores
        </p>
      </div>
    </div>
    <q-table
          :rows="vendedores"
          :columns="columnsVendedores"
          row-key="vendedor"
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
                @click="handleRemoveVendedor(props.row)"
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
          :to="{ name: 'form-vendedor' }"
        />
      </q-page-sticky>
  </q-page>
</template>

<script>

import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { defineComponent, onMounted, ref, computed } from 'vue'
import { columnsVendedores, initialPagination } from './table'
import useNotify from 'src/composables/UseNotify'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'PageVendedor',
  setup () {
    const vendedores = ref([])
    const router = useRouter()
    const loading = ref(true)
    const { notifySuccess, notifyError } = useNotify();
    const $q = useQuasar()


    const handleListVendedores = () => {
      const url = 'api/v1/vendedores'
      loading.value = true
      api.get(url)
        .then(function (response) {
          vendedores.value = response.data
          loading.value = false
        })
        .catch(function (error) {
          console.error(error)
        })
    }


    const handleEdit = (vendedor) => {
      router.push({ name: 'form-vendedor', params: { id: vendedor.id } })
    }

    const handleRemoveVendedor = async (vendedor) => {
      try {
        $q.dialog({
          title: 'Confirmar',
          message: `Você realmente quer excluir?: ${vendedor.id} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await api.delete(`api/v1/vendedor/${vendedor.id}/deletar_vendedor/`)
          notifySuccess('Registro deletado com successo!')
          handleListVendedores()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }


    onMounted(()=>{
      handleListVendedores()
    })

    return {
      loading,
      vendedores,
      handleEdit,
      handleRemoveVendedor,
      columnsVendedores,
      initialPagination,
      pagesNumber: computed(() => Math.ceil(users.value.length / initialPagination.value.rowsPerPage))
    }
  }
})

</script>
