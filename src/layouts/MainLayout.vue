<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Loja Mural - Acessórios em geral
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import useAuthUser from '../composables/UseAuthUser'

const linksList = [
  {
    title: 'Inicio',
    caption: '',
    icon: 'mdi-home',
    routeName: 'me'
  },
  {
    title: 'Categoria',
    caption: '',
    icon: 'mdi-calculator',
    routeName: 'categoria'
  },
  {
    title: 'Cliente',
    caption: '',
    icon: 'mdi-calculator',
    routeName: 'cliente'
  },
  {
    title: 'Produto',
    caption: '',
    icon: 'mdi-calculator',
    routeName: 'produto'
  },
  {
    title: 'Vendedor',
    caption: '',
    icon: 'mdi-calculator',
    routeName: 'vendedor'
  },
  {
    title: 'Venda',
    caption: '',
    icon: 'mdi-calculator',
    routeName: 'venda'
  },
  {
    title: 'ItensVendas',
    caption: '',
    icon: 'mdi-calculator',
    routeName: 'itensVenda'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    const $q = useQuasar()

    const router = useRouter()

    const { logout } = useAuthUser()

    const handleLogout = async () => {
      $q.dialog({
        title: 'Logout',
        message: 'Do you really want to leave ?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await logout()
        router.replace({ name: 'login' })
      })
    }

    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handleLogout
    }
  }
})
</script>
