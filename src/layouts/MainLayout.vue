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

const linksList = [
  {
    title: 'Inicio',
    caption: '',
    icon: 'mdi-home',
    routeName: 'index'
  },
  {
    title: 'Categoria',
    caption: '',
    icon: 'mdi-alien-outline',
    routeName: 'categoria'
  },
  {
    title: 'Cliente',
    caption: '',
    icon: 'mdi-alien-outline',
    routeName: 'cliente'
  },
  {
    title: 'Produto',
    caption: '',
    icon: 'mdi-alien-outline',
    routeName: 'produto'
  },
  {
    title: 'Vendedor',
    caption: '',
    icon: 'mdi-alien-outline',
    routeName: 'vendedor'
  },
  {
    title: 'Venda',
    caption: '',
    icon: 'mdi-alien-outline',
    routeName: 'venda'
  },
  {
    title: 'Relatório de Vendas',
    caption: '',
    icon: 'mdi-printer',
    routeName: 'relatorio'
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

    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  }
})
</script>
