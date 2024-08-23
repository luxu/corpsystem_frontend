<template>
  <q-page padding>
    <q-btn
      label="Criar Venda"
      :to="{name: 'form-venda'}"
    />
    {{ vendas }}
    <q-list bordered padding>
      <q-item
        v-for="venda in vendas"
        :key="venda.id"
        clickable
        @click="toggleItems(venda.id)"
      >
        <q-item-section>
          <q-item-label caption>Cliente: {{ venda.venda.cliente }}</q-item-label>
          <q-item-label caption>Data da Venda: {{ venda.venda.data_venda }}</q-item-label>
          <q-item-label caption>Vendedor: {{ venda.venda.vendedor }}</q-item-label>
          <q-item-label caption>Total Pago: {{ venda.venda.total_a_pagar }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-expansion-item
        v-for="venda in vendas"
        :key="venda.id"
        expand-separator
        :label="venda.cliente"
      >
        <q-list>
          <q-item v-for="item in venda.itens" :key="item.id">
            <q-item-section>
              <q-item-label>{{ item.produto }}</q-item-label>
              <q-item-label caption>Quantidade: {{ item.quantidade }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
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

    const fetchVendas = async () => {
      try {
        const response = await api.get('api/v1/itens-vendas/')
        vendas.value = response.data
        console.log(vendas.value)

      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    onMounted(() => {
      fetchVendas()
    })

    return {
      vendas
    }
  }

})
</script>
