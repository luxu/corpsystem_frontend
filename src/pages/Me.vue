<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-4 col-xs-12 col-sm-6">
        Alô, {{ username }}
      </div>
      <div class="col-md-4 col-xs-12 col-sm-6"></div>
    </div>
    <!-- <div v-if="user">
      <div>Hello {{ user.user_metadata.name }}</div>
    </div> -->
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({

  name: "PageMe",

  setup() {

    const usuario = ref(null)
    const username = ref(null)

    const { whoami } = useAuthUser()

    onMounted(async () => {
      usuario.value = await whoami()
      username.value = usuario.value.data.user.username
      console.log('usuario', usuario.value.data.authenticated)
    })

    return {
      username,
    };
  },
});
</script>
