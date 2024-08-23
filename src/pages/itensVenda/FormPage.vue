<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Formulário de Itens da Venda
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handlerSubmit">
        <q-select
          label="Venda"
          v-model="form.categoria"
          filled
          :options="optionsVendas"
          map-options
          emit-value
        />
        <q-input
          label="Produto"
          outlined
          v-model="form.produto"
          :rules="requiredRules"
        />
        <q-input
          label="Quantidade"
          outlined
          v-model="form.quantidade"
          :rules="requiredRules"
        />
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            rounded
            :label="isUpdate ? 'Update' : 'Save'"
            type="submit"
            color="primary"
            class="full-width"
          />
          <q-btn
            flat
            rounded
            label="Cancelar"
            type="reset"
            class="full-width"
            :to="{name: 'itensVenda'}"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>

import { computed, defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';

export default defineComponent({
  name: 'FormPage',
  setup() {
    const form = ref({
      venda: '',
      produto: '',
      quantidade: 1
    });
    const optionsVendas = ref([])
    const router = useRouter();
    const route = useRoute();
    const { notifyError, notifySuccess } = useNotify();
    const requiredRules = [
      (val) => (val && val.length > 0) || 'Este campo é obrigatório',
    ];
    const isUpdate = computed(() => route.params.id);

    const handleGetItensVenda = async (id) => {
      try {
        await api.get(`api/v1/itens-vendas/${id}/`)
        .then(function (response) {
          form.value = response.data[0]
        })
        .catch(function (error) {
          console.error(error)
        })
      } catch (error) {
        notifyError(error.message);
      }
    }

    const handleListVendas = async () => {
      const url = 'api/v1/vendas'
      try {
        await api.get(url)
          .then((response) => {
            console.log(response.data)
            optionsVendas.value = response.data.map(item => ({
              label: item.data_venda,
              value: item.id
            }));
          })
      } catch (error) {
            console.error(error)
      }
    }

    const handlerSubmit = async () => {
      try {
        if (isUpdate.value) {
          await api.put(`/api/v1/itens-venda/${isUpdate.value}/`, form.value)
          notifySuccess('Update Successfully')
        } else {
          await api.post('/api/v1/itens-venda/', form.value)
          notifySuccess('Saved Successfully')
        }
        router.push({ name: 'itens-venda' });
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      handleListVendas()
      if (isUpdate.value) {
        handleGetItensVenda(isUpdate.value);
      }
    });

    return {
      form,
      requiredRules,
      handlerSubmit,
      optionsVendas,
      isUpdate,
    };
  },
});

</script>
