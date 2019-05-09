<template>
    <div id="pages">
        <mt-header title="更换手机号">
            <router-link to="/setting" slot="left">
               <
            </router-link>
        </mt-header>
        <div class="container" v-if="step == 1">
            <!--<mt-field placeholder="图形验证" v-model="img_valid1">-->
                <!--<img :src="valImgSrc" @click="changeValImg" height="23" width="55">-->
            <!--</mt-field>-->
            <mt-field placeholder="验证码" v-model="valid1">
                <mt-button type="primary"
                           class="valid_btn"
                           :disabled ="button_state"
                           @click.native="getChangeCode">{{ valid_btn }}</mt-button>
            </mt-field>
            <mt-button type="default" @click.native="step_confirm">下一步</mt-button>
        </div>
        <div  class="container" v-if="step == 2">
            <mt-field label="新手机号" placeholder="请输入新手机号" v-model="news"></mt-field>
            <mt-field placeholder="图形验证" v-model="img_valid2">
                <img :src="valImgSrc" @click="changeValImg" height="23" width="55">
            </mt-field>
            <mt-field placeholder="验证码" v-model="valid2">
                <mt-button type="primary"
                           class="valid_btn"
                           :disabled ="button_state"
                           @click.native="get_phone_valid(news,img_valid2,4)">{{ valid_btn }}</mt-button>
            </mt-field>
            <mt-button type="default" @click.native="editContact">确认更换</mt-button>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import { Field } from 'mint-ui';
    import { Button } from 'mint-ui';
    import Vue from 'vue';
    import { Toast } from 'mint-ui';
    let qs = require('qs');
    import Global from '../Global.js'
    Vue.component(Field.name, Field);
    Vue.component(Button.name, Button);

    export default {
        data() {
            return {
                step:1,
                old: '',
                news: '',
                valid1: '',
                valid2: '',
                img_valid1: '',
                img_valid2: '',
                ckcode: '',
                valImgSrc: headapi + 'mod/index/login_validcode.php',//测试用路径
                button_state:false,
                valid_btn:'获取验证码',
            }
        },
        mounted() {

        },
        methods: {
            // 点击验证码切换
            changeValImg () {
                let that = this;
                that.valImgSrc = that.valImgSrc + '?' + Math.random();
            },
            // 获取更改联系方式验证码
            getChangeCode(){
                const that = this;
                let url = headapi + '?ctl=ajax&mod=xxx&act=xxx';
                let param = {
                    TYPE:2
                };
                let postdata = qs.stringify(param);
                that.button_state = true;
                axios.post(url, postdata).then(function(data){
                    let json = data.data;
                    if(json.code == 0){
                        let countdown = 60;
                        that.valid_btn = countdown + "秒";
                        let timer = setInterval(() => {
                            if (countdown == 0) {
                                clearInterval(timer);//停止计时器
                                that.valid_btn = "重新发送";
                                that.button_state = false;
                            } else {
                                countdown--;
                                that.valid_btn = countdown + "秒";
                                that.button_state = true
                            }
                        }, 1000);
                        Toast('短信已发送，请注意查收');
                    }else{
                        Toast(json.memo);
                    }
                },function(response){
                    console.info(response);
                })
            },
            // 获取验证码
            get_phone_valid (usercode,this_valid,type) {
                let img_valid = this_valid;
                let tel = usercode;
                let that = this;
                if (!tel) {
                    Toast('手机号码不能为空');
                    return false
                }
                if(tel.length != 11){
                    Toast('手机号长度不正确');
                    return false
                }
                if (!img_valid) {
                    Toast('图形验证码不能为空');
                    return false
                }
                if (img_valid.length != 4) {
                    Toast('图形验证码位数不正确');
                    return false
                }
                let url = headapi + '?ctl=ajax&mod=xxx&act=xxx';
                let param = {
                    NAME: tel,
                    VALID: img_valid,
                    TYPE: type,//（2）（1:注册，2:充值，3:登陆）
                };
                that.button_state = true;
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function (data) {
                    let json = data.data;
                    let code = json.code;
                    if (code == 0) {
                        let countdown = 60;
                        that.valid_btn = countdown + "秒";
                        let timer = setInterval(() => {
                            if (countdown == 0) {
                                clearInterval(timer);//停止计时器
                                that.valid_btn = "重新发送";
                                that.button_state = false;
                            } else {
                                countdown--;
                                that.valid_btn = countdown + "秒";
                                that.button_state = true
                            }
                        }, 1000);
                        Toast('短信已发送，请注意查收');
                    } else {
                        that.button_state = false;
                        Toast(json.memo);
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 校验原联系方式验证码
            checkChangeCode(){
                const that = this;
                let url = headapi + '?ctl=ajax&mod=xxx&act=xxx';
                if(!that.valid1){
                    Toast('验证码不应为空');
                    return false
                }
                if (that.valid1.length != 6) {
                    Toast('验证码位数不正确');
                    return false
                }
                let param = {
                    TYPE:2, //1 mail 2 tel
                    CODE: that.valid1
                };
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function(data){
                    let json = data.data;
                    if(json.code == 0){
                        that.step = 2;//进入下一页
                        that.changeValImg();//重置图形验证码
                        that.ckcode = json.rs;
                    }else{
                         Toast(json.memo);
                    }
                },function(response){
                    console.info(response);
                })
            },
            // 下一步
            step_confirm(){
                this.valid_btn = "获取验证码";
                this.button_state = false;
                this.checkChangeCode();
            },
            // 用户修改联系方式
            editContact(){
                const that = this;
                let url = headapi + '?ctl=ajax&mod=xxx&act=xxx';
                let param = {
                    CKCODE:that.ckcode,
                    // CKCODE:999999,
                    CODE:that.valid2
                };
                if(!that.valid2){
                    Toast('验证码不应为空');
                    return false
                }
                if (that.valid2.length != 6) {
                    Toast('验证码位数不正确');
                    return false
                }
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function(data){
                    let json = data.data;
                    if(json.code == 0){
                        Toast('更换手机号'+json.memo);
                    }else{
                         Toast(json.memo);
                    }
                },function(response){
                    console.info(response);
                })
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
        color: #333333;
        margin-top: 20px;
        border-radius: 6px;
    }
    #valid_btn1 {
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
    #valid_btn2 {
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
    /deep/ .mint-field-other button {
        border-radius: 0;
        color: #fff;
        background: #00C143;
        font-size: 14px;
    }
</style>
