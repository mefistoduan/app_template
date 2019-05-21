// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import { Toast } from 'mint-ui';
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole();//初始化;
// export  default vConsole
// import Mui from 'vue-awesome-mui';

// Vue.use(Mui);
Vue.use(Mint);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

Vue.prototype.thisUrl = process.env.NODE_ENV === 'development' ? '/api' : '';

if(process.env.NODE_ENV === 'development'){
    // 引入mockjs
    require('./mock.js');
}else{

}

Vue.prototype.axios = axios;
