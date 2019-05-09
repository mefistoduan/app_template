<template>
    <div id="pages">
        <mt-header title="基本资料">
            <router-link to="/setting" slot="left">
               <
            </router-link>
        </mt-header>
        <div class="container">
            <mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
            <mt-field label="企业" placeholder="请输入企业名称" v-model="company"></mt-field>
            <mt-button type="default" @click.naive="confirm">确 认</mt-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {Field} from 'mint-ui';
    import {Button} from 'mint-ui';
    import {Toast} from 'mint-ui';
    import Vue from 'vue';

    let qs = require('qs');
    import Global from '../Global.js'

    Vue.component(Field.name, Field);
    Vue.component(Button.name, Button);

    export default {
        data() {
            return {
                username: '',
                company: '',
            }
        },
        created() {
            this.userInfo();
        },
        mounted() {
            this.userInfo();
        },
        methods: {
            userInfo() {
                const that = this;
                let url = headapi + '?ctl=ajax&mod=xxx&act=xxx';
                let param = {};
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function (data) {
                    let json = data.data;
                    if (json.code == 0) {
                        that.username = json.username;
                        that.company = json.compname;
                    } else {
                        that.$message.error(json.memo);
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            confirm() {
                let username = this.username;
                let company = this.company;
                if (!username) {
                    Toast('姓名不能为空');
                    return false
                }
                if (username.length > 20) {
                    Toast('姓名最长20个字符');
                    return false
                }
                if (!company) {
                    Toast('公司名不能为空');
                    return false
                }
                if (company.length > 40) {
                    Toast('公司名最长40个字符');
                    return false
                }
                const that = this;
                let url = headapi + '?ctl=ajax&mod=xxx&act=xxx';
                let param = {
                    NAME: username,
                    COMPNAME: company,
                };
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function (data) {
                    let json = data.data;
                    if (json.code == 0) {
                        Toast('基本资料修改/添加'+json.memo);
                    } else {
                        Toast(json.memo);
                    }
                }, function (response) {
                    console.info(response);
                })
            }
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
        color: #333333;
        margin-top: 20px;
        border-radius: 6px;
    }
</style>
