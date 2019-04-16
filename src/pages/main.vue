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
                <li>
                    <a href="">
                        <img src="" alt="">
                        <em>xxx</em>
                    </a>
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
      msg: 'Welcome to Your Vue.js App'
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
</style>
