<template>
    <div id="pages">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
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
                selected: 'main'
            }
        },
        mounted() {

        },
        watch: {
            selected: function (val, oldVal) {
                // 这里就可以通过 val 的值变更来确定
                this.$router.push({path: '/' + val});
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
</style>
