<template>
    <div id="pages">
        <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
            <router-link to="/detail" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>

        {{msg}}
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
</style>
