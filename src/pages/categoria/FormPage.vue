<template>
  <q-page padding>
    <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handlerSubmit">
      <q-input
        label="Descrição"
        outlined
        v-model="form.descricao"
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
        />
      </div>
    </q-form>
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
      descricao: '',
    });
    const router = useRouter();
    const route = useRoute();
    const { notifyError, notifySuccess } = useNotify();
    const requiredRules = [
      (val) => (val && val.length > 0) || 'Este campo é obrigatório',
    ];
    const isUpdate = computed(() => route.params.id);

    const handleGetCategoria = async (id) => {
      try {
        await api.get(`api/v1/categorias/${id}/`)
        .then(function (response) {
          form.value = response.data[0]
        })
        .catch(function (error) {
          console.error(error)
        })
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handlerSubmit = async () => {
      try {
        if (isUpdate.value) {
          await api.put(`/api/v1/categoria/${isUpdate.value}/`, form.value);
          notifySuccess('Update Successfully');
        } else {
          await api.post('/api/v1/categoria/', form.value);
          notifySuccess('Saved Successfully');
        }
        router.push({ name: 'categoria' });
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      if (isUpdate.value) {
        handleGetCategoria(isUpdate.value);
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
