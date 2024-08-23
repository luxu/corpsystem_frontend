<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Formulário de Produtos
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handlerSubmit">
        <q-input
          label="Nome"
          outlined
          v-model="form.nome"
          :rules="requiredRules"
        />
        <q-input
          label="Preço"
          outlined
          v-model="form.preco"
          :rules="requiredRules"
        />
        <q-select
          label="Categoria"
          v-model="form.categoria"
          filled
          :options="optionsCategory"
          map-options
          emit-value
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
            :to="{name: 'produto'}"
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
      nome: '',
      preco: '',
      categoria: ''
    });
    const optionsCategory = ref([])
    const router = useRouter();
    const route = useRoute();
    const { notifyError, notifySuccess } = useNotify();
    const requiredRules = [
      (val) => (val && val.length > 0) || 'Este campo é obrigatório',
    ];
    const isUpdate = computed(() => route.params.id);

    const handleGetProduto = async (id) => {
      try {
        await api.get(`api/v1/produtos/${id}/`)
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

    const handleListCategorias = async () => {
      const url = 'api/v1/categorias'
      try {
        await api.get(url)
          .then((response) => {
            optionsCategory.value = response.data.map(item => ({
              label: item.descricao,
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
          await api.put(`/api/v1/produto/${isUpdate.value}/`, form.value)
          notifySuccess('Update Successfully')
        } else {
          await api.post('/api/v1/produto/', form.value)
          notifySuccess('Saved Successfully')
        }
        router.push({ name: 'produto' });
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      handleListCategorias()
      if (isUpdate.value) {
        handleGetProduto(isUpdate.value);
      }
    });

    return {
      form,
      requiredRules,
      handlerSubmit,
      optionsCategory,
      isUpdate,
    };
  },
});

</script>
