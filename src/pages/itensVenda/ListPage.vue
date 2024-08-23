<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Lista de ItensVenda
        </p>
      </div>
    </div>
    <q-table
          :rows="itensVenda"
          :columns="columnsItensVenda"
          row-key="itensVenda"
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
                @click="handleRemoveProduto(props.row)"
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
          :to="{ name: 'form-itensVenda' }"
        />
      </q-page-sticky>
  </q-page>
</template>

<script>

import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { defineComponent, onMounted, ref, computed } from 'vue'
import { columnsItensVenda, initialPagination } from './table'
import useNotify from 'src/composables/UseNotify'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'PageItensVenda',
  setup () {
    const itensVenda = ref([])
    const router = useRouter()
    const loading = ref(true)
    const { notifySuccess, notifyError } = useNotify();
    const $q = useQuasar()


    const handleListItensVenda = () => {
      const url = 'api/v1/itens-vendas'
      loading.value = true
      api.get(url)
        .then(function (response) {
          itensVenda.value = response.data
          loading.value = false
        })
        .catch(function (error) {
          console.error(error)
        })
    }


    const handleEdit = (venda) => {
      router.push({ name: 'form-venda', params: { id: venda.id } })
    }

    const handleRemoveProduto = async (venda) => {
      try {
        $q.dialog({
          title: 'Confirmar',
          message: `Você realmente quer excluir?: ${venda.id} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await api.delete(`api/v1/venda/${venda.id}/deletar_venda/`)
          notifySuccess('Registro deletado com successo!')
          handleListItensVenda()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }


    onMounted(()=>{
      handleListItensVenda()
    })

    return {
      loading,
      itensVenda,
      handleEdit,
      handleRemoveProduto,
      columnsItensVenda,
      initialPagination,
      pagesNumber: computed(() => Math.ceil(users.value.length / initialPagination.value.rowsPerPage))
    }
  }
})

</script>
