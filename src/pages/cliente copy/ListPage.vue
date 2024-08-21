<template>
  <q-page padding>

    <q-table
        :rows="clientes"
        :columns="columnsClientes"
        row-key="cliente"
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
              @click="handleRemoveCliente(props.row)"
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
        :to="{ name: 'form-cliente' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>

import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { defineComponent, onMounted, ref, computed } from 'vue'
import { columnsClientes, initialPagination } from './table'
import useNotify from 'src/composables/UseNotify'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'PageCliente',
  setup () {
    const clientes = ref([])
    const router = useRouter()
    const loading = ref(true)
    const { notifySuccess, notifyError } = useNotify();
    const $q = useQuasar()


    const handleListClientes = () => {
      const url = 'api/v1/clientes'
      loading.value = true
      api.get(url)
        .then(function (response) {
          clientes.value = response.data
          loading.value = false
        })
        .catch(function (error) {
          console.error(error)
        })
    }


    const handleEdit = (cliente) => {
      router.push({ name: 'form-cliente', params: { id: cliente.id } })
    }

    const handleRemoveCliente = async (cliente) => {
      try {
        $q.dialog({
          title: 'Confirmar',
          message: `Você realmente quer excluir?: ${cliente.id} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await api.delete(`api/v1/cliente/deletar_cliente/${cliente.id}/`)
          notifySuccess('Registro deletado com successo!')
          handleListClientes()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }


    onMounted(()=>{
      handleListClientes()
    })

    return {
      loading,
      clientes,
      handleEdit,
      handleRemoveCliente,
      columnsClientes,
      initialPagination,
      pagesNumber: computed(() => Math.ceil(users.value.length / initialPagination.value.rowsPerPage))
    }
  }
})

</script>
