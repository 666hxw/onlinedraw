import Vue from 'vue';

import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';

import DrawListView from 'page/draw/list';
import DrawEidtView from 'page/draw/edit';
import LoginView from 'page/login';

Vue.use(VueRouter);
Vue.use(VueCookie);

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
      path: '/draw/list',
      component: DrawListView,
      meta: {
        title: '创建画板',
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

// 不需要认证即可访问的路由
const ignorePath = [ '/login' ];

// 1、根据 token 限制页面访问权限
router.beforeEach((to, from, next) => {
  const isIgnorePath = ignorePath.some(item => { return item === to.path; });
  if (isIgnorePath) {
    next();
  }
  if (!Vue.cookie.get('token')) { // 不存在 token 引导去登陆
    next('/login');
  }
  next();
});

export default router;
