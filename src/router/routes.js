const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/IndexPage.vue')},
      { path: 'categoria', name: 'categoria', component: () => import('pages/categoria/ListPage.vue')},
      { path: 'form-categoria/:id?', name: 'form-categoria', component: () => import('pages/categoria/FormPage.vue')},
      { path: 'cliente', name: 'cliente', component: () => import('pages/cliente/ListPage.vue')},
      { path: 'form-cliente/:id?', name: 'form-cliente', component: () => import('pages/cliente/FormPage.vue')},
      { path: 'produto', name: 'produto', component: () => import('pages/produto/ListPage.vue')},
      { path: 'form-produto/:id?', name: 'form-produto', component: () => import('pages/produto/FormPage.vue')},
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
