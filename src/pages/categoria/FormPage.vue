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
        const categoria = await api.get(`api/v1/categoria/${id}/`);
        form.value = categoria.data;
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handlerSubmit = async () => {
      try {
        if (isUpdate.value) {
          console.log(isUpdate.value, form.value)
          await api.put(`/api/categoria/${isUpdate.value}/`, form.value);
          notifySuccess('Update Successfully');
        } else {
          await api.post('/api/categoria/', form.value);
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
