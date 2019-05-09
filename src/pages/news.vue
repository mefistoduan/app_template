<template>
    <div id="pages">
        <div class="container" v-if="detail == false">
            <mt-header title="系统消息">
                    <div slot="left" @click="back">
                       <
                    </div>
            </mt-header>
            <ul class="results">
                <li v-for="n in news" @click="seeDeatil(n)">
                    <i v-if="n.msgstatus == 1"></i>
                    <s v-else></s>
                    <div class="lt">
                        <h5>{{n.title}}</h5>
                        <span>{{n.sndtime}}</span>
                    </div>
                   >
                </li>
            </ul>
        </div>
        <div class="detail" v-if="detail == true">
            <mt-header title="系统消息">
                <div class="mint-header-button is-left" slot="left" @click="goback">
                   <
                </div>
            </mt-header>
            <em class="times">{{detailInfo.times}}</em>
            <div class="detail_card">
                <span>{{detailInfo.times}}</span>
                <em>{{detailInfo.title}}</em>
                <p>{{detailInfo.content}}</p>
                <!--监管邀请7-->
                <div class="control" v-if="detailInfo.type == 7">
                    <button id="ageree" @click="monitorResponse(2)">加入</button>
                    <button id="refuse"  @click="monitorResponse(1)">拒绝</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {Button} from 'mint-ui';
    import Vue from 'vue';
    import {Toast} from 'mint-ui';
    import { Indicator } from 'mint-ui';
    let qs = require('qs');
    import Global from '../Global.js'

    Vue.component(Button.name, Button);

    export default {
        data() {
            return {
                detail: false,
                username: '',
                company: '',
                news: [],
                detailInfo: {
                    times: '',
                    title: '',
                    content: '',
                    snduserid: '',
                    type: ''
                },
            }
        },
        mounted() {
            this.sysMsgListQuery();
        },
        methods: {
            goback(){
                this.sysMsgListQuery();
                this.detail = false;
            },
            // 获取列表
            sysMsgListQuery() {
                const that = this;
                let url = headapi + '?ctl=xxx&mod=xxxx&act=xxx';
                let param = {};
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function (data) {
                    let json = data.data;
                    if (json.code == 0) {
                        that.news = json.rs;
                    } else {
                        Toast(json.memo);
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 查看详情
            seeDeatil(row) {
                Indicator.open();
                this.detailInfo.times = 'xxxxx';
                this.detailInfo.tittle = 'xxxxx';
                this.detailInfo.type = 'xxxxx';
                this.detailInfo.snduserid = 'xxxxxx';
                this.detailInfo.content = 'xxxxxx';
                this.detail = true;
                this.sysMsgDetail(row.msgid);
            },
            sysMsgDetail(msgid){
                const that = this;
                let url = headapi + '?ctl=xxx&mod=xxxx&act=xxx';
                let param = {
                    MSGID:msgid
                };
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function(data){
                    let json = data.data;
                    Indicator.close();
                    if(json.code == 0){
                        let row = json.rs[0];
                        that.detailInfo.times = row.sndtime;
                        that.detailInfo.tittle = row.tittle;
                        that.detailInfo.type = row.msgtype;
                        that.detailInfo.snduserid = row.snduserid;
                        that.detailInfo.content = row.msg;
                    }else{
                        Toast(json.memo);
                    }
                },function(response){
                    console.info(response);
                })
            },
            // 监管接收邀请
            monitorResponse(status){
                const that = this;
                let url = headapi + '?ctl=xxx&mod=xxxx&act=xxx';
                let param = {
                    LEADERID:this.detailInfo.snduserid,
                    STATUS:status,
                };
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function(data){
                    let json = data.data;
                    if(json.code == 0){
                        Toast(json.memo);
                    }else{
                        Toast(json.memo);
                    }
                },function(response){
                    console.info(response);
                })
            },
            back() {
                this.$router.go(-1);
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
        overflow-y: scroll;
    }

    .container {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 0px;
        padding-bottom: 70px;
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

    .results {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .results ul {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        padding-bottom: 20px;
    }

    .results li {
        width: 92%;
        padding-left: 4%;
        padding-right: 4%;
        background: #fff;
        height: 60px;
        line-height: 60px;
        margin-top: 10px;
    }

    .results i {
        width: 8px;
        height: 8px;
        float: left;
        border-radius: 250px;
        margin-top: 26px;
        background: #03B1FF;
        margin-right: 8px;
    }

    .results s {
        width: 8px;
        height: 8px;
        float: left;
        border-radius: 250px;
        margin-top: 26px;
        background: #ccc;
        margin-right: 8px;
    }

    li .arr {
        width: 6px;
        float: right;
        margin-top: 30px;
        margin-right: 4%;
        margin-left: 10px;
    }

    li .lt {
        width: 80%;
        height: 60px;
        overflow: hidden;
        float: left;
    }

    li .lt h5 {
        margin: 0;
        height: 40px;
        font-weight: normal;
        line-height: 40px;
        color: #454545;
        font-size: 14px;
    }

    li .lt span {
        height: 20px;
        float: left;
        color: #777777;
        font-size: 12px;
        line-height: 10px;
    }

    .detail {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .times {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-size: 12px;
        text-align: center;
        margin-bottom: 8px;
        margin-top: 9px;
        color: #777777;
    }

    .detail_card {
        width: 92%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        border-radius: 6px;
        background: #fff;
        padding: 10px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.07);
    }

    .detail_card span {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        color: #777777;
        font-size: 14px;
        margin-bottom: 9px;
    }

    .detail_card em {
        color: #333333;
        margin-bottom: 11px;
        font-size: 14px;
    }

    .detail_card p {
        font-size: 14px;
        color: #777777;
    }

    .control {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .control button {
        float: right;
        width: 67px;
        height: 30px;
        font-size: 14px;
        color: #fff;
        border: none;
        text-align: center;
        line-height: 30px;
        border-radius: 2px;
        margin-left: 15px;
    }

    #refuse {
        background: #FFBB3B;
    }

    #ageree {
        background: #4CD964;
    }
</style>
