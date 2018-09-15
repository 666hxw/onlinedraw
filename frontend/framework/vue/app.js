import Vue from 'vue';
import './filter';
import './directive';
import './component';

const App = {};

App.data = () => {
  return window.__INITIAL_STATE__ || {};
};

App.init = options => {
  if (EASY_ENV_IS_NODE) {
    return App.server(options);
  }
  return App.client(options);
};


App.client = options => {
  const axios = require('axios');
  axios.interceptors.request.use((config) => {
    // http 请求头增加 token 参数
    config.headers.Token = localStorage.getItem('token') || '';
    // http 请求体增加 _csrf 参数
    if (config.method === 'get') {
      if (config.params) {
        config.params._csrf = window.__INITIAL_STATE__.csrf;
      } else {
        config.params = {
          _csrf: window.__INITIAL_STATE__.csrf,
        };
      }
    } else {
      if (config.data) {
        config.data._csrf = window.__INITIAL_STATE__.csrf;
      } else {
        config.data = {
          _csrf: window.__INITIAL_STATE__.csrf,
        };
      }
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  // 统一封装响应体
  axios.interceptors.response.use((resp) => {
    // console.log(resp);
    if (resp.data.code === 403) {
      location.href = '/login'; // 跳转到登录页
      return;
    }
    return resp;
  });
  Vue.prototype.$http = axios;
  if (options.store) {
    options.store.replaceState(Object.assign({}, App.data(), options.store.state));
  } else if (window.__INITIAL_STATE__) {
    options.data = Object.assign(window.__INITIAL_STATE__, options.data && options.data());
  }
  const app = new Vue(options);
  app.$mount('#app');
};

App.server = options => {
  if (options.store && options.router) {
    return context => {
      options.router.push(context.state.url);
      const matchedComponents = options.router.getMatchedComponents();
      if (!matchedComponents) {
        return Promise.reject({ code: '404' });
      }
      return Promise.all(
        matchedComponents.map(component => {
          if (component.preFetch) {
            return component.preFetch(options.store);
          }
          return null;
        })
      ).then(() => {
        context.state = Object.assign(options.store.state, context.state);
        return new Vue(options);
      });
    };
  }
  return context => {
    const VueApp = Vue.extend(options);
    const app = new VueApp({ data: context.state });
    return new Promise(resolve => {
      resolve(app);
    });
  };
};

App.use = component => {
  Vue.use(component);
};

App.component = (name, component) => {
  Vue.component(name, component);
};

export default App;
