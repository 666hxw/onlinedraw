'use strict';
const path = require('path');
module.exports = {
  egg: true,
  framework: 'vue',
  entry: { 'app/app': 'frontend/main.js' },
  alias: {
    app: 'frontend/framework/vue/app.js',
    asset: 'frontend/asset',
    component: 'frontend/component',
    framework: 'frontend/framework',
    page: 'frontend/page',
    store: 'frontend/store',
    vue: 'vue/dist/vue.esm.js',
  },
  dll: ['vue', 'axios', 'vue-router', 'vuex', 'vuex-router-sync'],
  loaders: {},
  plugins: {},
  done() {

  }
};