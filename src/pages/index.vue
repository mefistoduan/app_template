<template>
    <div id="pages">
        <transition :name="transitionName">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <mt-tabbar v-model="selected" @click="mt_tab(selected)">
            <mt-tab-item id="main">
                <img slot="icon" src="../assets/images/100x100.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="order">
                <img slot="icon" src="../assets/images/100x100.png">
                订单
            </mt-tab-item>
            <mt-tab-item id="mine">
                <img slot="icon" src="../assets/images/100x100.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    import axios from 'axios';

    let qs = require('qs');
    import Global from '../Global.js'

    export default {
        data() {
            return {
                selected: 'main',
                transitionName:''
            }
        },
        mounted() {

        },
        watch: {
            selected: function (val, oldVal) {
                // 这里就可以通过 val 的值变更来确定
                this.$router.push({path: '/' + val});
            },
            $route(to, from) {
                //如果to索引大于from索引,判断为前进状态,反之则为后退状态
                if(to.meta.index > from.meta.index){
                    //设置动画名称
                    this.transitionName = 'slide-left';
                }else{
                    this.transitionName = 'slide-right';
                }
            }
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../assets/css/comm.css";

    .mint-tabbar a {
        width: 33%;
        float: left;
    }
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all 500ms;
        position: absolute;
    }
    .slide-right-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
</style>
