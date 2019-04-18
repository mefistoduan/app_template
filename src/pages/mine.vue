<template>
    <div id="pages">
        <div class="head">
            <div class="user">
                <img  :src="imgsrc + user.head" alt="head">
                <h5>{{ user.name }}</h5>
                <s class="subtitle">我的个人信息修改</s>
            </div>
            <div class="info">
                <ul>
                    <li>
                        <span>123</span>
                        <em>收藏夹</em>
                    </li>
                    <li>
                        <span>123</span>
                        <em>收藏夹</em>
                    </li>
                    <li>
                        <span>123</span>
                        <em>收藏夹</em>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list" v-for="n in 3">
            <mt-cell
                    title="标题文字"
                    to="//github.com"
                    is-link
                    value="带链接">
            </mt-cell>
        </div>
        <div class="test">
            <router-link :to="{path: '/category'}" >分类列表</router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    let qs = require('qs');
    import Global from '../Global.js'
    import Vue from 'vue'
    import { Cell } from 'mint-ui';

    Vue.component(Cell.name, Cell);
export default {
    data () {
    return {
        imgsrc:'../static/images/',
        user:{
            head:'icon.png',
            name:'mefisto',
        },
    }
    },
    mounted() {

    },
    methods: {

    },
    components: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../assets/css/comm.css";
    .head {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        min-height: 140px;
        padding-top: 10px;
        padding-bottom: 10px;
        background: #FF5000;
    }
    .head .user {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        padding-left: 2%;
        padding-right: 2%;
        padding-top: 20px;
        margin-bottom: 10px;
    }
    .head .user img {
        width: 49px;
        float: left;
    }
    .head .user h5 {
        float: left;
        font-weight: normal;
        font-size: 24px;
        color: #fff;
        margin: 0;
    }
    .head .user .subtitle {
        width: 80%;
        font-size: 12px;
        color: #fff;
        float: left;
    }
    .info {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }
    .info ul {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        padding-left: 2%;
        padding-right: 2%;
    }
    .info li {
        height: 60px;
        width: 33%;
        float: left;
        color: #fff;
        font-size: 12px;
        text-align: center;
    }
    .info li span {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }
</style>
