<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Formulário de Vendedores
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
          label="Usuário"
          v-model="form.usuario"
          filled
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
            :to="{name: 'vendedor'}"
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
      usuario: ''
    });
    const optionsCategory = ref([])
    const router = useRouter();
    const route = useRoute();
    const { notifyError, notifySuccess } = useNotify();
    const requiredRules = [
      (val) => (val && val.length > 0) || 'Este campo é obrigatório',
    ];
    const isUpdate = computed(() => route.params.id);

    const handleGetVendedor = async (id) => {
      try {
        await api.get(`api/v1/vendedores/${id}/`)
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

    const handlerSubmit = async () => {
      try {
        if (isUpdate.value) {
          await api.put(`/api/v1/vendedor/${isUpdate.value}/`, form.value)
          notifySuccess('Update Successfully')
        } else {
          await api.post('/api/v1/vendedor/', form.value)
          notifySuccess('Saved Successfully')
        }
        router.push({ name: 'vendedor' });
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      if (isUpdate.value) {
        handleGetVendedor(isUpdate.value);
      }
    });

    return {
      form,
      requiredRules,
      handlerSubmit,
      isUpdate,
    };
  },
});

</script>
