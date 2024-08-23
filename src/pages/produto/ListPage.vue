<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Lista de Produtos
        </p>
      </div>
    </div>
    <q-table
          :rows="produtos"
          :columns="columnsProdutos"
          row-key="produto"
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
          :to="{ name: 'form-produto' }"
        />
      </q-page-sticky>
  </q-page>
</template>

<script>

import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { defineComponent, onMounted, ref, computed } from 'vue'
import { columnsProdutos, initialPagination } from './table'
import useNotify from 'src/composables/UseNotify'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'PageProduto',
  setup () {
    const produtos = ref([])
    const router = useRouter()
    const loading = ref(true)
    const { notifySuccess, notifyError } = useNotify();
    const $q = useQuasar()


    const handleListProdutos = () => {
      const url = 'api/v1/produtos'
      loading.value = true
      api.get(url)
        .then(function (response) {
          produtos.value = response.data
          loading.value = false
        })
        .catch(function (error) {
          console.error(error)
        })
    }


    const handleEdit = (produto) => {
      router.push({ name: 'form-produto', params: { id: produto.id } })
    }

    const handleRemoveProduto = async (produto) => {
      try {
        $q.dialog({
          title: 'Confirmar',
          message: `Você realmente quer excluir?: ${produto.id} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await api.delete(`api/v1/produto/${produto.id}/deletar_produto/`)
          notifySuccess('Registro deletado com successo!')
          handleListProdutos()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }


    onMounted(()=>{
      handleListProdutos()
    })

    return {
      loading,
      produtos,
      handleEdit,
      handleRemoveProduto,
      columnsProdutos,
      initialPagination,
      pagesNumber: computed(() => Math.ceil(users.value.length / initialPagination.value.rowsPerPage))
    }
  }
})

</script>
