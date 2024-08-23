const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:"index", component: () => import('pages/IndexPage.vue')},
      { path: 'categoria', name: 'categoria', component: () => import('pages/categoria/ListPage.vue')},
      { path: 'form-categoria/:id?', name: 'form-categoria', component: () => import('pages/categoria/FormPage.vue')},
      { path: 'cliente', name: 'cliente', component: () => import('pages/cliente/ListPage.vue')},
      { path: 'form-cliente/:id?', name: 'form-cliente', component: () => import('pages/cliente/FormPage.vue')},
      { path: 'produto', name: 'produto', component: () => import('pages/produto/ListPage.vue')},
      { path: 'form-produto/:id?', name: 'form-produto', component: () => import('pages/produto/FormPage.vue')},
      { path: 'vendedor', name: 'vendedor', component: () => import('pages/vendedor/ListPage.vue')},
      { path: 'form-vendedor/:id?', name: 'form-vendedor', component: () => import('pages/vendedor/FormPage.vue')},
      { path: 'venda', name: 'venda', component: () => import('pages/venda/ListPage.vue')},
      { path: 'form-venda/:id?', name: 'form-venda', component: () => import('pages/venda/FormPage.vue')},
      { path: 'itensVenda', name: 'itensVenda', component: () => import('pages/itensVenda/ListPage.vue')},
      { path: 'form-itensVenda/:id?', name: 'form-itensVenda', component: () => import('pages/itensVenda/FormPage.vue')},
      { path: 'relatorio', name: 'relatorio', component: () => import('pages/RelatorioPage.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
