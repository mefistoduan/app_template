import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import main from '@/pages/main'
import order from '@/pages/order'
import mine from '@/pages/mine'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
            children: [
                {
                    path: '/',
                    name: 'main',
                    meta: {
                        title: '首页'
                    },
                    component: main,
                },
                {
                    path: '/main',
                    name: 'main',
                    meta: {
                        title: '首页'
                    },
                    component: main,
                },
                {
                    path: '/order',
                    name: 'order',
                    meta: {
                        title: 'order'
                    },
                    component: order,
                },
                {
                    path: '/mine',
                    name: 'mine',
                    meta: {
                        title: 'mine'
                    },
                    component: mine,
                },
            ]
        }
    ]
})
