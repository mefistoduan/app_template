<template>
    <div id="timepicker">
        <div class="time_picker">
            <div class="tp_center">
                <select name="" id="select_type" @change="selectType" v-model="selectDayType">
                    <option value="1" :value="1">日排名</option>
                    <option value="2" :value="2">周排名</option>
                    <option value="3" :value="3">月排名</option>
                </select>
                <div class="display_time">
                    <ul>
                        <li class="days" @click.naive="openPicker" v-if="selectDayType == 1">
                            <span>选择日期</span>
                            <s>{{days.year}}</s> -
                            <s>{{days.mon}}月</s> -
                            <s>{{days.day}}日</s>
                            <em>{{days.weekday}}</em>
                        </li>
                        <li class="weeks" @click.naive="openWeeker" v-if="selectDayType == 2">
                            <span>选择周期</span>
                            <s>{{weeks.year}}年</s> -
                            <s>第{{weeks.week}}周</s>
                            <em>{{weekscope}}</em>
                        </li>
                        <li class="mons" @click.naive="openMon" v-if="selectDayType == 3">
                            <span>选择月份</span>
                            <s>{{mons.year}}年</s> -
                            <s>{{mons.mon}}月</s>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--日-->
        <mt-datetime-picker
                ref="picker"
                type="date"
                width="300"
                v-model="pickerValue"
                @confirm="handleConfirm"
        >
        </mt-datetime-picker>
        <!--周-->
        <mt-popup
                class="weekspop"
                v-model="popupVisible"
                position="bottom">
            <div class="picker-toolbar">
                <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">关闭</span>
                <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">确定</span>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange">
            </mt-picker>
        </mt-popup>
        <!--月-->
        <mt-popup
                v-model="popupVisibleForM"
                position="bottom">
            <div class="picker-toolbar">
                <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisibleForM = false">关闭</span>
                <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisibleForM = false">确定</span>
            </div>
            <mt-picker :slots="slotsForM" @change="onValuesChangeForM">
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    import axios from 'axios';

    let qs = require('qs');
    import Global from '../Global.js'

    export default {
        data() {
            return {
                weekscope: '',
                selectDayType: 1,
                lists: [],
                pickerValue: new Date(),
                popupVisible: false,
                popupVisibleForM: false,
                days: {
                    year: new Date().getFullYear(),
                    mon: new Date().getMonth() + 1,
                    day: new Date().getDate(),
                    weekday: '星期' + weekdayTurnC(new Date().getDay()),
                },
                weeks:{
                    year: new Date().getFullYear(),
                    week:globalGetCurrentWeeks(new Date().getFullYear(),new Date().getMonth() + 1,new Date().getDate())
                },
                mons:{
                    year: new Date().getFullYear(),
                    mon:new Date().getMonth()+1,
                },
                slots: [
                    {
                        flex: 1,
                        values: ['2018', '2019', '2020', '2021', '2022'],
                        className: 'slot1',
                        textAlign: 'right',
                        defaultIndex:1,
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: globalWeeks(),
                        className: 'slot3',
                        textAlign: 'left',
                        defaultIndex:globalGetCurrentWeeks(new Date().getFullYear(),new Date().getMonth() + 1,new Date().getDate()),
                    }
                ],
                slotsForM: [
                    {
                        flex: 1,
                        values: ['2018', '2019', '2020'],
                        className: 'slot1',
                        textAlign: 'right',
                        defaultIndex:1,
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: [1,2,3,4,5,6,7,8,9,10,11,12],
                        className: 'slot3',
                        textAlign: 'left',
                        defaultIndex:new Date().getMonth(),
                    }
                ]
            }
        },
        mounted() {
            this.$emit('dayinfo',this.pickerValue);

            // globalGetCurrentWeeks(2019,3,31);
            this.weekscope = '（ ' + globalWeeksTurnDate(new Date().getFullYear(),globalGetCurrentWeeks(new Date().getFullYear(),new Date().getMonth() + 1,new Date().getDate())) + ' ）';
        },
        methods: {
            slotValueChange () {
                this.$emit('change', this, this.values);
            },
            // 打开周选择器
            openWeeker() {
                this.popupVisible = !this.popupVisible;
            },
            // 打开月选择器
            openMon() {
                this.popupVisibleForM = !this.popupVisibleForM;
            },
            onValuesChange(picker, values) {
                this.weeks.year = values[0];
                this.weeks.week = values[1];
                this.weekscope = '（ ' + globalWeeksTurnDate(values[0],values[1]) + ' ）';
                let endday = globalWeekEndDay(values[0],values[1]);
                if(this.selectDayType == 2){
                    this.$emit('weekinfo',[this.weeks.year,this.weeks.week,endday]);
                }
                // if (values[0] > values[1]) {
                //     picker.setSlotValue(1, values[0]);
                // }
            },
            onValuesChangeForM(picker, values){
                this.mons.year = values[0];
                this.mons.mon = values[1];
                let endday = globalMonEndDay(values[0],values[1]);
                if(this.selectDayType == 3){
                    this.$emit('monsinfo',[this.mons.year,this.mons.mon,endday]);
                }
            },
            openPicker() {
                this.$refs.picker.open();
            },
            selectType() {
                let curVal = this.selectDayType;
                switch (parseInt(curVal)) {
                    case 1:
                        this.ranktypeName = '日排名';
                        this.$emit('dayinfo',this.pickerValue);
                        break;
                    case 2:
                        this.ranktypeName = '周排名';
                        this.$emit('weekinfo',[this.weeks.year,this.weeks.week]);
                        break;
                    case 3:
                        this.ranktypeName = '月排名';
                        this.$emit('monsinfo',[this.mons.year,this.mons.mon]);
                        break;
                }
            },
            handleConfirm(value) {
                this.pickerValue = value;
                this.days.year = new Date(value).getFullYear();
                this.days.mon = new Date(value).getMonth() + 1;
                this.days.day = new Date(value).getDate();
                this.days.weekday = '周' + weekdayTurnC(new Date(value).getDay());
                this.$emit('dayinfo',this.pickerValue);
            },
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../assets/css/time_picker.css";
</style>
