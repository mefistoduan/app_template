<template>
    <div id="pages">
        <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="content">
            <mt-picker :slots="slots" @change="onValuesChange" v-model="dataVal"></mt-picker>
        </div>
        
        <h5>
            {{ dataVal }}
        </h5>

        <router-link to="/chart" >
            <mt-button type="primary">click me </mt-button>
        </router-link>
    </div>
</template>

<script>
    import axios from 'axios';
    import Global from '../Global.js'
    import { Header } from 'mint-ui';
    let qs = require('qs');
    import { Picker } from 'mint-ui';
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex'
    Vue.component(Header.name, Header);
    Vue.component(Picker.name, Picker);
export default {
    data () {
    return {
        dataVal:'01',
        slots: [
            {
                flex: 1,
                values: ['01', '02', '03', '04', '05', '06'],
                className: 'slot1',
                textAlign: 'center'
            },
        ]
    }
    },
    mounted() {

    },
    methods: {
        onValuesChange(picker, values) {
           console.log(values);
           this.dataVal = values[0];
        },
    },
    computed: {
        ...mapState(['car'])
    },
    components: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../assets/css/comm.css";
    h5 {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        text-align: center;
        font-size: 24px;
        margin-top: 20px;
    }
</style>
