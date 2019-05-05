import Vue from 'vue'
import Vuex from 'vuex'
import detail from './modules/detail'
import chart from './modules/chart'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        detail,
        chart
    },
    strict: debug,
    plugins: debug ? [] : []
})