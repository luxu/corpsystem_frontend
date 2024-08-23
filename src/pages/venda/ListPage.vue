<template>
  <q-page padding>
    <div class="col-12 text-center">
      <p class="text-h6">
        Listas de Vendas
      </p>
    </div>
    <q-btn
      label="Criar Venda"
      :to="{name: 'form-venda'}"
      color="primary"
    />
    <q-expansion-item
        :label="venda.venda.cliente['nome']"
        v-if="showItems"
        expand-separator
      >
        <q-list bordered>
          <q-item>
            <q-item-section>
              <div><strong>Produto:</strong>{{ venda.produto["nome"] }}</div>
              <div><strong>Quantidade:</strong>{{ venda.quantidade }}</div>
              <div><strong>Preço:</strong>R$ {{ venda.produto["preco"] }}</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    <q-list bordered padding>
      <q-item-label header>Vendas</q-item-label>
      <q-item
        v-for="venda in vendas"
        :key="venda.id"
        class="q-pa-sm"
        clickable
        @click="toggleItems(venda.id)"
        >
        <q-item-section>
          <div><strong>Cliente: </strong> {{ venda.venda.cliente['nome'] }}</div>
          <div><strong>Vendedor: </strong> {{ venda.venda.vendedor['nome'] }}</div>
          <div><strong>Data: </strong> {{ formatDate(venda.venda.data_venda) }}</div>
          <div><strong>Valor Total: </strong>R$ {{ venda.venda.total_a_pagar }}</div>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name:'PageVenda',

  setup() {

    const vendas = ref([])
    const venda = ref([])
    const showItems = ref(false)

    const fetchVendas = async () => {
      try {
        const response = await api.get('api/v1/itens-vendas/')
        vendas.value = response.data
        console.log(vendas.value)

      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }

    const toggleItems = (vendaId) => {
      venda.value = vendas.value.find(v => v.id === vendaId)
      // console.log()
      showItems.value = !showItems.value
    }

    onMounted(() => {
      fetchVendas()
    })

    return {
      vendas,
      venda,
      showItems,
      toggleItems,
      formatDate
    }
  }

})
</script>
