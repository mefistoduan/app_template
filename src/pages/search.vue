<template>
    <div id="pages">
        <div class="step" v-if="step == 1">
            <mt-header title="任务搜索">
                <div slot="left" @click="back">
                   <
                </div>
            </mt-header>
            <div class="search" @click.naive="hide_icon">
                <input type="text" placeholder="查询" @keyup.enter="search(keyword)" v-model="keyword">
                <img src="../../static/images/search.png" alt="" class="search_icon" v-show="search_icon">
            </div>
            <div class="record">
                <div class="title">
                    <em>搜索查询记录</em>
                    <s @click="clear">清空</s>
                </div>
                <ul>
                    <li v-for="h in history" v-if="history.length > 0 " @click="cksearch(h.name)">
                        {{h.name}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="step" v-if="step == 2">
            <mt-header title="搜索结果">
                <div class="back_search" slot="left" @click="step = 1">
                   <
                </div>
            </mt-header>
            <!-- tab-container -->
            <span class="nope" v-if="!lists">
                    暂没有符合条件的任务
                </span>
            <ul class="list" v-else>
                <li v-for="list in lists" @click="gotoDetal(list,0)">
                    <div class="part">
                        <div class="up_p">
                            <div class="lt">
                                <h5>{{list.taskname}}</h5>
                                <span><em>任务日期</em>{{ list.createtime|globalfmtDate }}</span>
                            </div>
                            <div class="rt">
                                <em :class="[{'finished':list.state == 1},'state']">{{ list.state | stateText }}</em>
                            </div>
                        </div>
                        <div class="down_p">
                            <ul class="soliders">
                                <li v-for="mem in list.members.slice(0, 5)">
                                    {{mem.name}}
                                </li>
                            </ul>
                            <ul class="results">
                                <li class="res1">有意向 {{ list.answersnum }}</li>
                                <li class="res2">准意向 {{ list.answermnum }}</li>
                                <li class="res3">无意向 {{ list.answerfnum }}</li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
            <span id="total1">共{{lists.length}}个团队</span>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    import {Toast} from 'mint-ui';

    let qs = require('qs');
    import Global from '../Global.js'

    export default {
        data() {
            return {
                search_icon: true,
                step: 1,
                keyword: '',
                history: [],
            }
        },
        mounted() {
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            clear() {
                localStorage.history = '';
                this.history = [];
            },
            search(keyword) {
                const that = this;
                if (!keyword) {
                    Toast('搜索关键字不能为空');
                    return false
                }
                if (!keyword.length > 20) {
                    Toast('搜索关键字不能超过20字符');
                    return false
                }
                let url = headapi + '?ctl=ajax&mod=xxx&act=xxx';
                let param = {
                    KEYWORD: keyword,
                    FINISH: 99,//查全部
                };
                let postdata = qs.stringify(param);
                axios.post(url, postdata).then(function (data) {
                    let json = data.data;
                    if (json.code == 0) {
                        let arr = {name: keyword};
                        that.history.push(arr);
                        that.keyword = '';
                        if (json.rs.length == 0) {
                            Toast('抱歉，没有搜索到相应的任务内容');
                        } else {
                            that.lists = json.rs;
                            that.step = 2;
                        }
                    } else {
                        Toast(json.memo);
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            hide_icon() {
                this.search_icon = false;
            },
            cksearch(keyword) {
                this.search(keyword)
            },
            gotoDetal(row, state) {
                let taskid = row.taskid;
                this.$router.push({
                    path: '/task_detail',
                    query: {
                        'taskid': taskid,
                        'state': state,
                    }
                })
            },
        },
        filters: {
            globalfmtDate(datetime) {
                if ((datetime == '') || (datetime == undefined))
                    return '';
                if ((datetime == '1900-01-01') || (datetime == '1900-01-01 00:00:00.000'))
                    return '';
                length = 11;
                return (datetime != null) ? datetime.substr(0, length) : '';
            },
            stateText(state) {
                console.log(state);
                let res = parseInt(state) == 0 ? "进行中" : "已完成";
                return res;
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

    .search {
        width: 92%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        background: #fff;
        border-radius: 250px;
        height: 39px;
        line-height: 39px;
        margin-top: 8px;
    }

    .search img {
        position: relative;
        width: 16px;
        height: 16px;
        float: left;
        bottom: 30px;
        left: 38%;
    }

    .search input {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        border: none;
        outline: none;
        text-align: center;
        height: 39px;
        line-height: 39px;
        font-size: 16px;
        color: #CCCCCC;
    }

    .record {
        width: 92%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 40px;
    }

    .record .title {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .title em {
        float: left;
        color: #777777;
        font-size: 12px;
    }

    .title s {
        float: right;
        font-size: 12px;
        color: #0079E2;
    }

    .record ul {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 16px;
    }

    .record li {
        float: left;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #CCCCCC;
        background: #fff;
        font-size: 12px;
        color: #777777;
        margin-right: 10px;
    }

    #total2 {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        background: #EBEBEB;
        color: #CCCCCC;
        margin-bottom: 30px;
    }

    #total1 {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        background: #EBEBEB;
        color: #CCCCCC;
        margin-bottom: 30px;
    }

    /deep/ .mint-tab-container-item {
        padding-bottom: 40px;
    }

    .list {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 10px;
    }

    .list > li {
        width: 92%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        border-left: 5px solid #03B1FF;
        background: #fff;
        margin-bottom: 15px;
        padding-left: 4%;
        padding-right: 4%;
    }

    .list > li:nth-child(even) {
        border-left: 5px solid #FFB103;
    }

    .list .part {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .list .part .up_p {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        border-bottom: 1px solid #EBEBEB;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .up_p .lt {
        width: 70%;
        float: left;
    }

    .up_p .rt {
        width: 30%;
        float: right;
    }

    .up_p h5 {
        color: #333333;
        font-size: 18px;
        font-weight: normal;
        margin: 0;
    }

    .up_p .lt span {
        font-size: 12px;
        color: #CCCCCC;
    }

    .up_p .lt em {
        background: #EBEBEB;
        margin-right: 5px;
        padding: 3px;
        color: #777777;
    }

    .up_p .rt .static_btn {
        width: 64px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #fff;
        float: right;
        background: #03B1FF;
        border-radius: 4px;
        margin-top: 3px;
    }

    .rt .static_btn img {
        width: 11px;
        height: 10px;
        float: left;
        margin-left: 11px;
        margin-top: 10px;
        margin-right: 5px;
    }

    .down_p {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 15px;
    }

    .soliders {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .soliders li {
        min-width: 55px;
        float: left;
        border-radius: 250px;
        padding: 5px;
        margin-right: 5px;
        border: 1px solid #EBEBEB;
        text-align: center;
        font-size: 12px;
    }

    .results {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 12px;
        margin-bottom: 19px;
    }

    .results li {
        width: 85px;
        height: 17px;
        float: left;
        margin-right: 10px;
        color: #fff;
        border-radius: 250px;
        text-align: center;
        font-size: 12px;
        padding: 3px;
    }

    .results .res1 {
        background: #4CD964;
    }

    .results .res2 {
        background: #FFA702;
    }

    .results .res3 {
        background: #CCCCCC;
    }

    .finish_list .static_btn {
        background: #0079E2 !important;
    }

    .state {
        margin-left: 10px;
        border-radius: 250px;
        padding: 3px;
        padding-left: 9px;
        padding-right: 9px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        background: #03B1FF;
    }

    .finished {
        background: #0079E2 !important;
    }
</style>
