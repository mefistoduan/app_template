import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import main from '@/pages/main'
import order from '@/pages/order'
import mine from '@/pages/mine'
import category from '@/pages/category'
import detail from '@/pages/detail'
import chart from '@/pages/chart'
import login from '@/pages/login'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
            meta:{index:0},//meta对象的index用来定义当前路由的层级,由小到大,由低到高
            children: [
                {
                    path: '/',
                    name: 'main',
                    meta: {
                        title: '首页',
                        index:1
                    },
                    component: main,
                },
                {
                    path: '/main',
                    name: 'main',
                    meta: {
                        title: '首页',
                        index:1
                    },
                    component: main,
                },
                {
                    path: '/order',
                    name: 'order',
                    meta: {
                        title: 'order',
                        index:2
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
                }, {
                    path: '/category',
                    name: 'category',
                    meta: {
                        title: 'category'
                    },
                    component: category,
                },{
                    path: '/detail',
                    name: 'detail',
                    meta: {
                        title: 'detail'
                    },
                    component: detail,
                },{
                    path: '/chart',
                    name: 'chart',
                    meta: {
                        title: 'chart'
                    },
                    component: chart,
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'login'
            },
            component: login,
        },
    ]
})
