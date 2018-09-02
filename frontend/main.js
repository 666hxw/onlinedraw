import { sync } from 'vuex-router-sync';
import store from 'store/app';
import router from './router';
import app from './App.vue';
import App from 'app';
import Layout from 'component/layout/app';

App.component(Layout.name, Layout);

sync(store, router);

export default App.init({
  base: '/app',
  ...app,
  router,
  store
});