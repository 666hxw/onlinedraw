import Vue from 'vue';

import VueRouter from 'vue-router';

import ListView from './list';
import DrawEidtView from 'page/draw/edit';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: ListView
    },
    {
      path: '/list',
      component: ListView
    },
    {
      path: '/detail/:id',
      component: () => import('./detail')
    },
    {
      path: '/draw/create',
      component: DrawEidtView
    },
    {
      path: '/draw/edit',
      component: DrawEidtView
    }
  ]
});

export default router;
