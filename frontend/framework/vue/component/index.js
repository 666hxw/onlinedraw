import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Layout from 'component/layout/app';

Vue.use(ElementUI);

Vue.component(Layout.name, Layout);
