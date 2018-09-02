import Vue from 'vue';

import VueRouter from 'vue-router';

import DrawEidtView from 'page/draw/edit';
import LoginView from 'page/login';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/draw/create',
      meta: {
        title: '首页',
      },
    },
    {
      path: '/login',
      component: LoginView,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/draw/create',
      component: DrawEidtView,
      meta: {
        title: '创建画板',
      },
    },
    {
      path: '/draw/edit',
      component: DrawEidtView,
      meta: {
        title: '编辑画板',
      },
    },
  ]
});

export default router;
