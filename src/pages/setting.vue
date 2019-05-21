<template>
    <div id="pages">
        <mt-header title="设置">
            <router-link to="/" slot="left">
                <img src="../../static/images/comm/arrow-left.png" alt="" class="arr_left">
            </router-link>
        </mt-header>
        <div class="container">
            <div class="row">
                <mt-cell
                        title="基本资料"
                        to="/basic"
                        is-link>
                </mt-cell>
                <mt-cell
                        title="安全设置"
                        to="/safe"
                        is-link>
                </mt-cell>
                <div class="gary"></div>
                <mt-cell
                        title="系统消息"
                        to="/news"
                        is-link>
                </mt-cell>
                <div class="gary"></div>
                <mt-cell
                        title="关于我们"
                        to="/about"
                        is-link>
                </mt-cell>
                <div  @click.naive="current" class="btns">
                    <mt-cell
                            title="版本更新"
                            value="当前版本 1.0.3"
                    >
                    </mt-cell>
                </div>

            </div>

            <!--<mt-button type="default" @click.navie="logout">退出登陆</mt-button>-->
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {Cell} from 'mint-ui';
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    import Vue from 'vue';

    let qs = require('qs');
    import Global from '../Global.js'

    Vue.component(Cell.name, Cell);

    export default {
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted() {

        },
        methods: {
            current(){
                Toast('当前已是最新版本');
            },
            // 退出
            logout() {
                const that = this;
                let url = headapi + '?ctl=ajax&mod=index&act=logout';
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
        background: #FFD579;
        margin-top: 20px;
        border-radius: 6px;
    }
    .btns {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }
    /deep/ .mint-cell {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        border-bottom: 1px solid #EBEBEB;
    }
    /deep/ .mint-cell-wrapper {
        background-image:none;
    }
</style>
