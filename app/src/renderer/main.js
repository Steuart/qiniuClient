import Vue from 'vue'

import Router from 'vue-router'
import Electron from 'vue-electron'
import VueLazyload from 'vue-lazyload'
import axios from 'axios';

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(Electron);
Vue.use(Router);
Vue.use(iView);
Vue.use(VueLazyload);

Vue.config.debug = false;

import routes from './routes'
import store from './vuex/store'

const router = new Router({
    scrollBehavior: () => ({y: 0}),
    routes
});


import * as util from './util/util';

Vue.filter('getfileNameByPath', function (value) {
    return util.getPostfix(value);
});

//拦截器
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error);
    if (error.response.status === 401) {
        router.push({path: '/login'});
    }
});

window.ondragover = function (e) {
    e.preventDefault();
    return false
};

import App from './App';

/!* eslint-disable no-new *!/
new Vue({
    router,
    store,
    ...App
}).$mount('#app');

