<template>
  <q-page padding>
    <q-form @submit.prevent="submitVenda">
      <q-item>
          <q-item-section>
            <q-item-label overline>Venda</q-item-label>
          </q-item-section>
        </q-item>

      <q-select
        v-model="form.cliente"
        :options="clientes"
        option-label="nome"
        option-value="id"
        label="Cliente"
        outlined
        :rules="[val => !!val || 'Cliente é requerido']"
      />
      <q-select
        v-model="form.vendedor"
        :options="vendedores"
        option-label="nome"
        option-value="id"
        label="Vendedor"
        outlined
        :rules="[val => !!val || 'Vendedor é requerido']"
      />
      <q-input
        label="Data da Venda"
        v-model="form.data_venda"
        type="date"
        outlined
      />
      <q-separator spaced />
      <q-item>
        <q-item-section>
          <q-item-label overline>Itens da Venda</q-item-label>
        </q-item-section>
      </q-item>
      <q-list bordered padding>
        <q-item
          v-for="(item, index) in form.itens"
          :key="index"
          class="q-pa-sm"
        >
          <div class="q-pa-md">
            <div class="q-gutter-x-md">
              <q-select
                label="Produto"
                v-model="item.produto"
                :options="produtos"
                option-label="nome"
                option-value="id"
                outlined
                @input="updatePreco(index)"
              />
            </div>
          </div>
          <div class="q-pa-md">
            <div class="q-gutter-x-md">
              <q-input
                label="Quantidade"
                v-model="item.quantidade"
                type="number"
                outlined
              />
            </div>
          </div>
          <q-btn
            flat
            icon="delete"
            color="negative"
            @click="removeItem(index)"
          />
        </q-item>
      </q-list>

      <q-btn
        label="Adicionar Item"
        flat
        icon="add"
        @click="addItem"
      />
      <div class="q-pa-md">
        <q-btn
          label="Criar Venda"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>

import { computed, defineComponent, onMounted, ref } from 'vue'
import useNotify from 'src/composables/UseNotify'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'FormPage',
  setup() {
    const { notifyError, notifySuccess } = useNotify()
    const form = ref({
        cliente: '',
        vendedor: '',
        data_venda: '2024-08-22',
        itens: [
          {
            produto: '',
            quantidade: 1,
            preco: 0
          },
        ]
    })
    const clientes = ref([])
    const produtos = ref([])
    const vendedores = ref([])
    const produtoSelecionado = ref(0)

    const precoPorItem = (item) => {
      return computed(() => {
        const q = produtos.value.find(p => p.id === item.produto.id)
        produtoSelecionado.value = q?.preco ?? 0
        form.value.itens.preco = q?.preco ?? 0
      })
    };

    const fetchClientes = async () => {
      try {
        const response = await api.get('api/v1/clientes')
        clientes.value = response.data
      } catch (error) {
        console.error('Erro ao buscar clientes:', error)
      }
    }

    const fetchVendedores = async () => {
      try {
        const response = await api.get('api/v1/vendedores')
        vendedores.value = response.data
      } catch (error) {
        console.error('Erro ao buscar os vendedores:', error)
      }
    }

    const fetchProdutos = async () => {
      try {
        const response = await api.get('api/v1/produtos')
        produtos.value = response.data
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    onMounted(() => {
      fetchClientes()
      fetchProdutos()
      fetchVendedores()
    });


    const addItem = () => {
      if (!form.value.itens) {
        form.value.itens = []
      }
      form.value.itens.push({ produto: '', quantidade: 1 })
    }

    const removeItem = (index) => {
      form.value.itens.splice(index, 1)
    }

    const submitVenda = async () => {
      const url = '/api/v1/venda/'
      console.log(form.value)
      try {
        const response = await api.post(url, form.value)
        notifySuccess('Venda criada com sucesso!')
        resetForm()
      } catch (error) {
        notifyError('Erro ao criar venda.')
      }
    }

    const resetForm = () => {
      form.value = {
        cliente: '',
        data_venda: '',
        itens: [
          {
            produto: '',
            quantidade: 1,
          },
        ]
      }
    }

    return {
      addItem,
      removeItem,
      submitVenda,
      precoPorItem,
      form,
      clientes,
      produtos,
      vendedores,
      produtoSelecionado
    }
  }
})
</script>
