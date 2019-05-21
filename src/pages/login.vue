<template>
    <div id="pages">
        <div class="main bg bg01" v-if="page == 0">
            <!--<h5><img id="abc" src="../../static/images/login/abc.png" alt=""></h5>-->
            <p>xxxx</p>
            <em>xxxx</em>
            <mt-button type="default" class="login_btn" @click.native="goPage(2)">登录</mt-button>
            <mt-button type="primary" class="register_btn" @click.native="goPage(1)">注册</mt-button>
        </div>

        <div class="register bg bg02" v-if="page == 1" >
            <div class="back" @click="goPage(0)">
                <!--<img src="../../static/images/login/arrow-left@2x.png" alt="">-->
            </div>
            <p>请注册</p>
            <em>xxx</em>
            <div class="form">
                <mt-field placeholder="手机号" v-model="register.usercode"></mt-field>
                <mt-field placeholder="图形验证" v-model="register.img_valid">
                    <img :src="valImgSrc" @click="changeValImg" height="23" width="55">
                </mt-field>
                <mt-field placeholder="验证码" v-model="register.valid">
                    <mt-button type="primary"
                               class="valid_btn"
                               :disabled="button_state"
                               @click.native="get_phone_valid(register.usercode,register.img_valid,1)">{{ valid_btn }}
                    </mt-button>
                </mt-field>
                <mt-field placeholder="密码" v-model="register.pwd" type="password"></mt-field>
            </div>
            <mt-button type="primary" class="register_confirm" @click.native="register_account">注册</mt-button>
        </div>

        <div class="login pwd_login bg bg03" v-if="page == 2" >
            <div class="back">
                <div class="b_lt" @click="goPage(0)">
                    <!--<img src="../../static/images/login/arrow-left@2x.png" alt="">-->
                </div>
                <div class="b_rt" @click="goPage(3)"><em>验证码快捷登录</em></div>
            </div>
            <p>欢迎回来！</p>
            <em>请登录</em>
            <div class="form">
                <mt-field placeholder="手机号" v-model="pwd_login.usercode"></mt-field>
                <mt-field placeholder="密码" type="password" v-model="pwd_login.pwd" @keyup.enter.native="pwd_login_confirm"></mt-field>
                <mt-field placeholder="图形验证" v-model="pwd_login.img_valid" v-if="step > 0" @keyup.enter.native="pwd_login_confirm">
                    <img :src="valImgSrc" @click="changeValImg" height="23" width="55">
                </mt-field>
            </div>
            <mt-button type="primary" class="pwd_login_confirm" @click.navtive="pwd_login_confirm">登录</mt-button>
            <div class="forget" @click="goPage(4)">
                忘记密码？
            </div>
        </div>
        <div class="login phone_login bg bg02" v-if="page == 3" >
            <div class="back">
                <div class="b_lt" @click="goPage(0)">
                    <!--<img src="../../static/images/login/arrow-left@2x.png" alt="">-->
                </div>
                <div class="b_rt" @click="goPage(2)"><em>密码登录</em></div>
            </div>
            <p>欢迎回来！</p>
            <em>请登录</em>
            <div class="form">
                <mt-field placeholder="手机号" v-model="phone_login.usercode"></mt-field>
                <mt-field placeholder="图形验证" v-model="phone_login.img_valid">
                    <img :src="valImgSrc" @click="changeValImg" height="23" width="55">
                </mt-field>
                <mt-field placeholder="验证码" v-model="phone_login.valid">
                    <mt-button type="primary"
                               class="valid_btn"
                               :disabled="button_state"
                               @click.native="get_phone_valid(phone_login.usercode,phone_login.img_valid,3)">{{
                        valid_btn }}
                    </mt-button>
                </mt-field>
            </div>
            <mt-button type="primary" class="pwd_login_confirm" @click.navtive="phone_login_confirm">登录</mt-button>
            <div class="forget" @click="goPage(4)">
                忘记密码？
            </div>
        </div>
        <div class="forget_page bg bg03" v-if="page == 4" >
            <div class="back" @click="goPage(0)">
                <!--<img src="../../static/images/login/arrow-left@2x.png" alt="">-->
            </div>
            <p>找回密码</p>
            <em>下次要记牢哦</em>
            <div class="form">
                <mt-field placeholder="手机号" v-model="forget.usercode"></mt-field>
                <mt-field placeholder="图形验证" v-model="forget.img_valid">
                    <img :src="valImgSrc" @click="changeValImg" height="23" width="55">
                </mt-field>
                <mt-field placeholder="验证码" v-model="forget.valid">
                    <mt-button type="primary"
                               class="valid_btn"
                               :disabled="button_state"
                               @click.native="get_phone_valid(forget.usercode,forget.img_valid,2)">{{ valid_btn }}
                    </mt-button>
                </mt-field>
                <mt-field placeholder="新密码" v-model="forget.pwd" type="password"></mt-field>
            </div>
            <mt-button type="primary" class="register_confirm" @click.navtive="forget_confirm">重置密码并登录</mt-button>
        </div>
        <div class="version" :style="{ top: bodyHeight - 30 + 'px' }">
            V {{version}}
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    let qs = require('qs');
    import {Button} from 'mint-ui';
    import Vue from 'vue'
    import {Field} from 'mint-ui';
    import {Toast} from 'mint-ui';
    import Global from '../Global.js'

    Vue.component(Field.name, Field);
    Vue.component(Button.name, Button);

    export default {
        data() {
            return {
                version: globalVersion(),
                bodyHeight: 0,
                page: 0,
                step: 0,
                valImgSrc: headapi + 'login_validcode.php',//测试用路径
                valid_btn: '获取验证码',
                button_state: false,
                register: {
                    usercode: '',
                    img_valid: '',
                    valid: '',
                    pwd: '',
                },
                pwd_login: {
                    usercode: '',
                    valid: '',
                    pwd: '',
                    img_valid: '',
                },
                phone_login: {
                    usercode: '',
                    valid: '',
                    img_valid: '',
                },
                forget: {
                    usercode: '',
                    img_valid: '',
                    valid: '',
                    pwd: '',
                },
            }
        },
        watch:{
            '$route': function (val) {
                if (val.path == '/login') {
                    this.bodyHeight = document.documentElement.clientHeight;
                    console.log(this.bodyHeight);
                }
            }
        },
        created() {
            this.overtime = new Date();
            // 如果是手动退出用户
            if (this.$route.query.status == 1) {
                // 刷新验证图
                this.changeValImg();
                // 重置倒计时
                this.overtime = new Date();
            }
            this.bodyHeight = document.documentElement.clientHeight;
        },
        mounted() {
            this.overtime = new Date();
            // 如果是手动退出用户
            if (this.$route.query.status == 1) {
                // 刷新验证图
                this.changeValImg();
                // 重置倒计时
                this.overtime = new Date();
            }
            this.bodyHeight = document.documentElement.clientHeight;
            console.log(this.bodyHeight);
        },
        methods: {
            // 页内跳转
            goPage(e) {
                this.page = e;
                this.changeValImg();
            },
            // 点击验证码切换
            changeValImg() {
                let that = this;
                that.valImgSrc = that.valImgSrc + '?' + Math.random();
            },
            // 获取验证码
            get_phone_valid(usercode, this_valid, type) {
                let img_valid = this_valid;
                let tel = usercode;
                let that = this;
                if (!tel) {
                    Toast('手机号码不能为空');
                    return false
                }
                if (tel.length != 11) {
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
                let url = headapi + 'getCode';
                let param = {
                    NAME: tel,
                    VALID: img_valid,
                    TYPE: type,//（2）（1:注册，2:重置，3:登陆）
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
            // 注册
            register_account() {
                const that = this;
                let url = headapi + 'registerAndLogin';
                if (!that.register.usercode) {
                    Toast('手机号码不能为空');
                    return false
                }
                if (that.register.usercode.length != 11) {
                    Toast('手机号长度不正确');
                    return false
                }
                if (!that.register.pwd) {
                    Toast('密码不能为空');
                    return false
                }
                if (that.register.pwd.length >= 12 || that.register.pwd.length < 6) {
                    Toast('密码长度不正确');
                    return false
                }
                if (!that.register.valid) {
                    Toast('手机验证码不能为空');
                    return false
                }
                if (that.register.valid.length != 6) {
                    Toast('手机验证码长度不正确');
                    return false
                }
                if (!that.register.img_valid) {
                    Toast('图形验证码不能为空');
                    return false
                }
                if (that.register.img_valid.length != 4) {
                    Toast('图形验证码');
                    return false
                }
                let param = {
                    USERCODE: that.register.usercode,
                    PASSWORD: that.register.pwd,
                    VERIFY_NAME: that.register.usercode,
                    VERIFY_CODE: that.register.valid,
                    VALID: that.register.img_valid,
                };
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function (data) {
                    let json = data.data;
                    console.log(json);
                    if (json.code == 0) {
                        localStorage.usercode = that.register.usercode;
                        that.$router.push({path: '/'});
                    } else {
                        that.changeValImg();
                        Toast(json.memo);
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // pwd 登陆
            pwd_login_confirm() {
                const that = this;
                let url = headapi + 'login';
                if (!that.pwd_login.usercode) {
                    Toast('手机号码不能为空');
                    return false
                }
                if (that.pwd_login.usercode.length != 11) {
                    Toast('手机号长度不正确');
                    return false
                }
                if (!that.pwd_login.pwd) {
                    Toast('密码不能为空');
                    return false
                }
                if (that.pwd_login.pwd.length >= 12 || that.pwd_login.pwd.length < 6) {
                    Toast('密码长度不正确');
                    return false
                }
                if (!that.pwd_login.img_valid && that.step > 0) {
                    Toast('图形验证码不能为空');
                    return false
                }
                if (that.pwd_login.img_valid.length != 4  && that.step > 0) {
                    Toast('图形验证码');
                    return false
                }
                let param = {
                    VERIFY_NAME: that.pwd_login.usercode,
                    VERIFY_CODE: that.pwd_login.pwd,
                    LOGIN_TYPE: 1,//（3）（1：密码登陆，2：验证码登陆）
                    VALID: that.pwd_login.img_valid,
                    STEP:that.step,
                };
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function (data) {
                    let json = data.data;
                    if (json.code == 0) {
                        localStorage.usercode = that.pwd_login.usercode;
                        that.$router.push({path: '/'});
                    } else {
                        that.step++
                        that.changeValImg();
                        Toast(json.memo);
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // phone login
            phone_login_confirm() {
                const that = this;
                let url = headapi + 'login';
                if (!that.phone_login.usercode) {
                    Toast('手机号码不能为空');
                    return false
                }
                if (that.phone_login.usercode.length != 11) {
                    Toast('手机号长度不正确');
                    return false
                }
                if (!that.phone_login.img_valid) {
                    Toast('图形验证码不能为空');
                    return false
                }
                if (that.phone_login.img_valid.length != 4) {
                    Toast('图形验证码');
                    return false
                }
                if (!that.phone_login.valid) {
                    Toast('短信验证码不能为空');
                    return false
                }
                if (that.phone_login.valid.length >= 12 || that.phone_login.valid.length < 6) {
                    Toast('短信验证码长度不正确');
                    return false
                }

                let param = {
                    VERIFY_NAME: that.phone_login.usercode,
                    VERIFY_CODE: that.phone_login.valid,
                    LOGIN_TYPE: 2,//（3）（1：密码登陆，2：验证码登陆）
                    VALID: that.phone_login.img_valid,
                };
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function (data) {
                    let json = data.data;
                    if (json.code == 0) {
                        localStorage.usercode = that.phone_login.usercode;
                        that.$router.push({path: '/'});
                    } else {
                        Toast(json.memo);
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 找回密码并登陆
            forget_confirm() {
                const that = this;
                let url = headapi + 'resetPassword';
                if (!that.forget.usercode) {
                    Toast('手机号码不能为空');
                    return false
                }
                if (that.forget.usercode.length != 11) {
                    Toast('手机号长度不正确');
                    return false
                }
                if (!that.forget.img_valid) {
                    Toast('图形验证码不能为空');
                    return false
                }
                if (that.forget.img_valid.length != 4) {
                    Toast('图形验证码');
                    return false
                }
                if (!that.forget.valid) {
                    Toast('短信验证码不能为空');
                    return false
                }
                if (that.forget.valid.length >= 12 || that.forget.valid.length < 6) {
                    Toast('短信验证码长度不正确');
                    return false
                }
                if (!that.forget.pwd) {
                    Toast('密码不能为空');
                    return false
                }
                if (that.forget.pwd.length >= 12 || that.forget.pwd.length < 6) {
                    Toast('密码长度不正确');
                    return false
                }
                let param = {
                    VERIFY_NAME: that.forget.usercode,
                    VERIFY_CODE: that.forget.valid,
                    NEWPWD: that.forget.pwd,
                };
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function (data) {
                    let json = data.data;
                    if (json.code == 0) {
                        localStorage.usercode = that.forget.usercode;
                        that.$router.push({path: '/'});
                    } else {
                        Toast(json.memo);
                    }
                }, function (response) {
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
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }
    #abc {
        width: 255px;
    }

    .bg {
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .bg01 {
        /*background: url("../../static/images/login/bg01.png");*/
        background-position: top center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .bg02 {
        /*background: url("../../static/images/login/bg02.png");*/
        background-position: top center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .bg03 {
        /*background: url("../../static/images/login/bg03.png");*/
        background-position: top center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .main {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .main h5 {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-size: 48px;
        color: #fff;
        font-weight: normal;
        margin-top: 50%;
        font-weight: bold;
    }

    .main s {
        font-size: 38px;
        font-weight: normal;
    }

    .main p {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        color: #fff;
        font-size: 20px;
    }

    .main em {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-size: 16px;
        color: #0079E2;
        margin-bottom: 70px;
    }

    .main .login_btn {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-bottom: 20px;
    }

    .main .register_btn {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .version {
        position: absolute;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .back {
        width: 80%;
        height: 30px;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 15%;
        margin-bottom: 50px;
    }

    .back img {
        width: 15px;
        float: left;
    }

    .register p {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-size: 28px;
        color: #FFFFFF;
    }

    .register em {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-size: 18px;
        color: #0079E2;
        margin-bottom: 45px;
    }

    .form {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        border: none;
    }

    /deep/ .mint-cell {
        background: none;
    }

    /deep/ .mint-cell-wrapper {
        background: rgba(255, 255, 255, 0.4);
        color: #fff;
        border-radius: 250px;
        margin-bottom: 15px;
    }

    /deep/ .mint-field-core {
        height: 45px;
        line-height: 45px;
        background: none;
        color: #fff;
        text-indent: 20px;
    }

    /deep/ .mint-field-core::placeholder {
        color: #fff;
    }

    /deep/ .mint-field .mint-cell-title {
        width: 70px;
    }

    .valid_btn {
        background: #004B8D;
        width: 97px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
    }

    .register_confirm {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 60px;
    }

    .forget {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 20px;
        font-size: 12px;
        text-align: center;
        color: #fff;
    }

    .back .b_lt {
        width: 50%;
        float: left;
    }

    .back .b_rt {
        width: 50%;
        float: right;
        color: #fff;
        font-size: 12px;
        text-decoration: underline;
        text-align: right;
    }

    .login > p {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-size: 28px;
        color: #fff;
        font-weight: normal;
    }

    .login > em {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        color: #0079E2;
        font-size: 18px;
        margin-bottom: 45px;
    }

    /deep/ .mint-cell-text {
        font-size: 16px;
    }

    .pwd_login_confirm {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 60px;
    }

    .forget_page > p {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-size: 28px;
        color: #fff;
        font-weight: normal;
    }

    .forget_page > em {
        width: 80%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        color: #0079E2;
        font-size: 18px;
        margin-bottom: 45px;
    }

    /deep/ .mint-field-other {
        background: #004B8D;
        border-radius: 250px;
        display: block;
        overflow: hidden;
        padding-left: 5px;
        padding-right: 5px;
    }

    /deep/ .mint-cell:last-child {
        background-image: none !important;
    }

    /*响应式调整*/
    @media only screen and (max-width: 320px) {
        .back {
            margin-bottom: 5%;
        }
        .pwd_login_confirm {
            margin-top: 5%;
        }
        .register em {
            margin-bottom: 5%;
        }
        .register_confirm {
            margin-top: 5%;
        }
        .forget_page > em {
            margin-bottom: 5%;
        }
    }
</style>
