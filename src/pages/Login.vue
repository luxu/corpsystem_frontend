<template>
  <q-page class="row items-center justify-evenly bg-primary">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-form class="row justify-center" @submit.prevent="handleLogin">
        <q-card class="" style="width: 300px; height: auto;  display: flex; flex-direction: column; align-items: center;">

          <img src="../assets/quasar-logo-vertical.svg" ratio="1" width="200">

          <q-card-section class="q-pt-none full-width">
            <q-input
              filled
              v-model="form.username"
              label="Username"
            />

            <q-input
              v-model="form.password"
              filled
              label="Password"
              :type="form.isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="form.isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="form.isPwd = !form.isPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions class="full-width">
            <q-btn
              class="full-width"
              color="primary"
              label="Login"
              type="submit"
            />
          </q-card-actions>

        </q-card>

      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from "vue-router"
import useAuthUser from "src/composables/UseAuthUser"

export default defineComponent({
  name: 'IndexPage',

  setup () {

    const router = useRouter();

    const { login, whoami } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      username: 'luxu',
      password: 'Luxu1650#',
      isPwd: true
    });

    const user = ref(null)

    onMounted( async () => {
      const r = await whoami()

      const authenticated = r.data['authenticated']

      console.log('whoami',authenticated)

      if (authenticated) {
        router.push({ name: "me" });
      }
    });

    const handleLogin = async () => {
      const username = form.value.username
      const password = form.value.password
      try {
        user.value = await login(username, password)
        console.log('Logado');
        notifySuccess('Login successfully!')
        router.push({ name: "me" })
      } catch (error) {
        notifyError(error.message)
      }
    };


    return {
      form,
      handleLogin
    }
  }
})
</script>
