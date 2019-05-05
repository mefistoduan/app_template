<template>
    <div id="pages">
        <mt-swipe :auto="4000" :show-indicators="true">
            <mt-swipe-item>
                <div class="silder silder1"></div>
            </mt-swipe-item>
            <mt-swipe-item>
                <div class="silder silder2"></div>
            </mt-swipe-item>
            <mt-swipe-item>
                <div class="silder silder3"></div>
            </mt-swipe-item>
        </mt-swipe>
        <div class="main_banner">
            <div class="silder silder4"></div>
        </div>
        <div class="icon_list">
            <ul>
                <li v-for="icon in icons">
                    <router-link :to="{path: '/detail', query: {icon: icon.href}}" >
                        <img  :src="imgsrc + icon.img"  alt="">
                        <em>{{icon.name}}</em>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    let qs = require('qs');
    import Global from '../Global.js'
    import { Swipe, SwipeItem } from 'mint-ui';
    import Vue from 'vue'
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
export default {
    data () {
    return {
        imgsrc:'../static/images/',
        icons:[
            {name:'划算1',href:'/detail',img:'icon.png'},
            {name:'划算2',href:'/detail',img:'icon.png'},
            {name:'划算3',href:'/detail',img:'icon.png'},
            {name:'划算4',href:'/detail',img:'icon.png'},
            {name:'划算5',href:'/detail',img:'icon.png'},
            {name:'划算6',href:'/detail',img:'icon.png'},
            {name:'划算7',href:'/detail',img:'icon.png'},
            {name:'划算8',href:'/detail',img:'icon.png'},
        ],
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
    #pages {
        padding-bottom: 20px;
    }
    .silder{
        width: 100%;
        height: 220px;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }
    .silder1 {
        background: red;
    }
    .silder2 {
        background: green;
    }
    .silder3 {
        background: deepskyblue;
    }
    .silder4 {
        background: yellow;
    }
    /deep/ .mint-swipe {
        height: 230px;
        overflow: hidden;
    }
    .main_banner {
        width: 100%;
        height: 100px;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }
    .icon_list {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 10px;
    }
    .icon_list li {
        width: 25%;
        float: left;
        padding: 0;
        margin: 0;
        margin-bottom: 10px;
        list-style: none;
    }
    .icon_list li a {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        text-align: center;
        color: #000;
    }
    .icon_list a img {
        width: 61px;
        height: 48px;
        overflow: hidden;
        display: block;
        margin: 0 auto;;
    }
</style>
