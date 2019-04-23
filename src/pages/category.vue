<template>
    <div id="pages">
       <div class="lt">
           <ul>
               <li v-for="n in 17">
                   text
               </li>
           </ul>
       </div>
       <div class="rt"></div>
    </div>
</template>

<script>
    import axios from 'axios';
    let qs = require('qs');
    import Global from '../Global.js'
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
    .lt {
        width: 87px;
        height: 100%;
        overflow: hidden;
        float: left;
    }
    .lt ul {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 85px;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        overflow-y: scroll;
        padding-bottom: 20px;
    }
    .lt li {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        height: 45px;
        line-height: 45px;
        text-align: center;
    }

</style>
