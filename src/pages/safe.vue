<template>
    <div id="pages">
        <mt-header title="安全设置">
            <router-link to="/setting" slot="left">
                <img src="../../static/images/comm/arrow-left.png" alt="" class="arr_left">
            </router-link>
        </mt-header>
        <div class="container">
            <mt-cell
                    title="修改密码"
                    to="/pwd"
                    is-link>
            </mt-cell>
            <mt-cell
                    title="更换手机号"
                    to="/phone"
                    is-link>
            </mt-cell>
            <mt-button type="default" @click.navie="logout">退  出</mt-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { Button } from 'mint-ui';
    import { Cell } from 'mint-ui';
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    import Vue from 'vue';
    let qs = require('qs');
    import Global from '../Global.js'
    Vue.component(Button.name, Button);
    Vue.component(Cell.name, Cell);

    export default {
        data() {
            return {
                username: '',
                company: '',
            }
        },
        mounted() {

        },
        methods: {
            // 退出
            logout() {
                const that = this;
                let url = headapi + 'logout';
                let param = {};
                let postdata = qs.stringify(param);
                MessageBox.confirm('确定退出当前账户?').then(action => {
                    axios.post(url, postdata).then(function (data) {
                        let json = data.data;
                        if (json.code == 0) {
                            Toast('当前账户已退出');
                            that.$router.push({path: '/login'});
                        } else {
                            Toast(json.memo);
                        }
                    }, function (response) {
                        console.info(response);
                    })
                });
            },
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../assets/css/comm.css";
    #pages {
        background: #EBEBEB;
    }
    .container {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 10px;
    }
    /deep/ .mint-cell {
        margin-bottom: 1px;
    }
    .gary {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        height: 10px;
    }
    /deep/ .mint-cell-title {
        color: #454545;
        font-size: 16px;
    }
    /deep/ .mint-cell-value span {
        font-size: 14px;
        color: #454545;
    }
    /deep/ .mint-button--default {
        width: 92%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        height: 46px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        margin-top: 20px;
        border-radius: 6px;
        background: #FFD579;
    }
</style>
