<template>
    <div id="pages">
        <mt-header title="修改密码">
            <router-link to="/setting" slot="left">
                <!--<img src="../../static/images/comm/arrow-left.png" alt="" class="arr_left">-->
            </router-link>
        </mt-header>
        <div class="container">
            <mt-field label="原密码" placeholder="请输入原密码" v-model="old" type="password"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" v-model="pwd" type="password"></mt-field>
            <mt-field label="密码确认" placeholder="请再次输入密码" v-model="again" type="password"></mt-field>
            <mt-button type="default" @click.naive="editPassword">确  认</mt-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { Field } from 'mint-ui';
    import { Button } from 'mint-ui';
    import Vue from 'vue';
    let qs = require('qs');
    import { Toast } from 'mint-ui';
    import Global from '../Global.js'
    Vue.component(Field.name, Field);
    Vue.component(Button.name, Button);

    export default {
        data() {
            return {
                valid: '',
                old: '',
                pwd: '',
                again: '',
            }
        },
        mounted() {

        },
        methods: {
            editPassword(){
                const that = this;
                if(!this.old){
                    Toast('密码不能为空');
                    return false
                }
                if(this.old.length >= 20 || this.old.length < 6){
                    Toast('密码长度不应小于6位切不大于20位');
                    return false
                }
                if(!this.pwd){
                    Toast('新密码不能为空');
                    return false
                }
                if(this.pwd.length >= 20 || this.pwd.length < 6){
                    Toast('新密码长度不应小于6位切不大于20位');
                    return false
                }
                if(this.pwd != this.again){
                    Toast('新密码与确认密码不一致');
                    return false
                }
                let url = headapi + 'editPassword';
                let param = {
                    OLD:this.old,
                    NEW:this.pwd,
                };
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function(data){
                    let json = data.data;
                    if(json.code == 0){
                        that.old = '';
                        that.pwd = '';
                        that.again = '';
                        Toast('修改密码'+json.memo);
                        that.$router.push({
                            name:'setting',
                        });
                    }else{
                        Toast(json.memo);
                    }
                },function(response){
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
    /deep/ .mint-cell-text {
        font-size: 14px;
        color: #454545;
    }
    /deep/ .mint-field-core::placeholder {
        color: #DDDDDD;
        font-size: 14px;
    }
    #valid_btn {
        width: 117px;
        position: relative;
        right: -10px;
        height: 100%;
        margin: 0;
        text-align: center;
        color: #fff;
        background: #00C143;
        border: 0;
        height: 48px;
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
