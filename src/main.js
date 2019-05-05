// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from 'mint-ui';
import Vuex from 'vuex'

import store from './store'

import 'mint-ui/lib/style.css'

Vue.use(Mint);
Vue.use(Vuex);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});

Vue.prototype.thisUrl = process.env.NODE_ENV === 'development' ? '/api' : '';

if (process.env.NODE_ENV === 'development') {
    // 引入mockjs
    require('./mock.js');
} else {
    // let vConsole = new VConsole() // 初始化
}

Vue.prototype.axios = axios;
