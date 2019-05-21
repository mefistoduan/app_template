globalVersion = function () {
    return '1.0.3';
};
companyInfo = {
    url: 'http://bobox360.com/',
    main: 'BOBO',
    year: new Date().getFullYear(),
};

thisglobal = function () {
    return 123
};

headapi = process.env.NODE_ENV === 'development' ? '/api/' : '../';

// login
globalCompany = function () {
    let globalCompany = {
        name: 'xxx',
        tel: '400-000-0000',
        app: '设备管理总后台',
        url: 'xxx.xxx.com'
    };
    return globalCompany
};

// 获取周数据
globalWeeks = function () {
    let arr = [];
    let t = 0;
    for (var i = 0; i < 53; i++) {
        t = i+1 < 10 ? '0' + (i + 1) : i + 1;
        arr.push(t );
    }
    return arr;
};

globaroundYear = function () {
    let currentyear = new Date().getFullYear();
    let arr = [currentyear - 1, currentyear, currentyear + 1]
    return arr;
};

// 星期转换成中文数字
weekdayTurnC = function (getDay) {
    switch (parseInt(getDay)) {
        case 1:
            return '一';
            break;
        case 2:
            return '二';
            break;
        case 3:
            return '三';
            break;
        case 4:
            return '四';
            break;
        case 5:
            return '五';
            break;
        case 6:
            return '六';
            break;
        case 0:
            return '天';
            break;
    }
};

// 获取当前第几周
globalGetCurrentWeeks = function (a, b, c) {
    //date1是当前日期
    //date2是当年第一天
    //d是当前日期是今年第多少天
    //用d + 当前年的第一天的周差距的和在除以7就是本年第几周
    let date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),
        d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    let res = Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
    res = res < 10 ? '0' + res : res;
    return res
};

globalgetcurrent = function () {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + '年' + month + '月' + strDate + '日';
    return currentdate;
};

// 第一周转换为日期
globalWeeksTurnDate = function (year, weeks) {
    var date = new Date(year, "0", "1");
    var time = date.getTime(); // 获取当前星期几,0:星期一
    var _week = date.getDay();    //当这一年的1月1日为周日时则本年有54周,否则没有54周,没有则去除第54周的提示
    if (_week != 0) {//一年53周情况
        if (weeks == 54) {
            return '今年没有54周';
        }
        var cnt = 0;// 获取距离周末的天数
        if (_week == 0) {
            cnt = 7;
        } else if (_week == 1) {
            cnt = 6;
        } else if (_week == 2) {
            cnt = 5;
        } else if (_week == 3) {
            cnt = 4;
        } else if (_week == 4) {
            cnt = 3;
        } else if (_week == 5) {
            cnt = 2;
        } else if (_week == 6) {
            cnt = 1;
        }
        cnt += 1;//加1表示以星期一为一周的第一天    // 将这个长整形时间加上第N周的时间偏移
        time += cnt * 24 * 3600000; //第2周开始时间
        var nextYear = new Date(parseInt(year, 10) + 1, "0", "1");
        var nextWeek = nextYear.getDay();
        var lastcnt = 0;//获取最后一周开始时间到周末的天数
        if (nextWeek == 0) {
            lastcnt = 6;
        } else if (nextWeek == 1) {
            lastcnt = 0;
        } else if (nextWeek == 2) {
            lastcnt = 1;
        } else if (nextWeek == 3) {
            lastcnt = 2;
        } else if (nextWeek == 4) {
            lastcnt = 3;
        } else if (nextWeek == 5) {
            lastcnt = 4;
        } else if (nextWeek == 6) {
            lastcnt = 5;
        }
        if (weeks == 1) {//第1周特殊处理    // 为日期对象 date 重新设置成时间 time
            var start = date.Format("MM/dd");
            date.setTime(time - 24 * 3600000);
            var _end = date.Format("MM/dd");
            return start + "-" + _end;
        } else if (weeks == 53) {//第53周特殊处理
            var start = time + (weeks - 2) * 7 * 24 * 3600000; //第53周开始时间
            var end = time + (weeks - 2) * 7 * 24 * 3600000 + lastcnt * 24 * 3600000 - 24 * 3600000; //第53周结束时间
            date.setTime(start);
            var _start = date.Format("MM/dd");
            date.setTime(end);
            var _end = date.Format("MM/dd");
            return _start + "-" + _end;
        } else {
            var start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间
            var end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000; //第n周结束时间
            date.setTime(start);
            var _start = date.Format("MM/dd");
            date.setTime(end);
            var _end = date.Format("MM/dd");
            return _start + "-" + _end;
        }
    } else {//一年54周情况
        var cnt = 0;// 获取距离周末的天数
        if (_week == 0 && weeks == 1) {//第一周
            cnt = 0;
        } else if (_week == 0) {
            cnt = 7;
        } else if (_week == 1) {
            cnt = 6;
        } else if (_week == 2) {
            cnt = 5;
        } else if (_week == 3) {
            cnt = 4;
        } else if (_week == 4) {
            cnt = 3;
        } else if (_week == 5) {
            cnt = 2;
        } else if (_week == 6) {
            cnt = 1;
        }
        cnt += 1;//加1表示以星期一为一周的第一天
        // 将这个长整形时间加上第N周的时间偏移
        time += 24 * 3600000; //第2周开始时间
        var nextYear = new Date(parseInt(year, 10) + 1, "0", "1");
        var nextWeek = nextYear.getDay();
        var lastcnt = 0;//获取最后一周开始时间到周末的天数
        if (nextWeek == 0) {
            lastcnt = 6;
        } else if (nextWeek == 1) {
            lastcnt = 0;
        } else if (nextWeek == 2) {
            lastcnt = 1;
        } else if (nextWeek == 3) {
            lastcnt = 2;
        } else if (nextWeek == 4) {
            lastcnt = 3;
        } else if (nextWeek == 5) {
            lastcnt = 4;
        } else if (nextWeek == 6) {
            lastcnt = 5;
        }
        if (weeks == 1) {//第1周特殊处理
            var start = date.Format("yyyy-MM-dd");
            date.setTime(time - 24 * 3600000);
            alert(start + '--' + date);
            return _start + "--" + date;
        } else if (weeks == 54) {//第54周特殊处理
            var start = time + (weeks - 2) * 7 * 24 * 3600000; //第54周开始时间
            var end = time + (weeks - 2) * 7 * 24 * 3600000 + lastcnt * 24 * 3600000 - 24 * 3600000; //第53周结束时间
            date.setTime(start);
            var _start = date.Format("yyyy-MM-dd");
            date.setTime(end);
            var _end = date.Format("yyyy-MM-dd");
            return _start + "--" + _end;
        } else {
            var start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间
            var end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000; //第n周结束时间
            date.setTime(start);
            var _start = date.Format("yyyy-MM-dd");
            date.setTime(end);
            var _end = date.Format("yyyy-MM-dd");
            return _start + "--" + _end;
        }
    }
};

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

// 获取周最后一天
globalWeekEndDay = function (year, weeks) {
    var date = new Date(year, "0", "1");
    var time = date.getTime(); // 获取当前星期几,0:星期一
    var _week = date.getDay();    //当这一年的1月1日为周日时则本年有54周,否则没有54周,没有则去除第54周的提示
    if (_week != 0) {//一年53周情况
        if (weeks == 54) {
            return '今年没有54周';
        }
        var cnt = 0;// 获取距离周末的天数
        if (_week == 0) {
            cnt = 7;
        } else if (_week == 1) {
            cnt = 6;
        } else if (_week == 2) {
            cnt = 5;
        } else if (_week == 3) {
            cnt = 4;
        } else if (_week == 4) {
            cnt = 3;
        } else if (_week == 5) {
            cnt = 2;
        } else if (_week == 6) {
            cnt = 1;
        }
        cnt += 1;//加1表示以星期一为一周的第一天    // 将这个长整形时间加上第N周的时间偏移
        time += cnt * 24 * 3600000; //第2周开始时间
        var nextYear = new Date(parseInt(year, 10) + 1, "0", "1");
        var nextWeek = nextYear.getDay();
        var lastcnt = 0;//获取最后一周开始时间到周末的天数
        if (nextWeek == 0) {
            lastcnt = 6;
        } else if (nextWeek == 1) {
            lastcnt = 0;
        } else if (nextWeek == 2) {
            lastcnt = 1;
        } else if (nextWeek == 3) {
            lastcnt = 2;
        } else if (nextWeek == 4) {
            lastcnt = 3;
        } else if (nextWeek == 5) {
            lastcnt = 4;
        } else if (nextWeek == 6) {
            lastcnt = 5;
        }
        if (weeks == 1) {//第1周特殊处理    // 为日期对象 date 重新设置成时间 time
            var start = date.Format("MM/dd");
            date.setTime(time - 24 * 3600000);
            var _end = date.Format("-MM-dd");
            return year + _end;
        } else if (weeks == 53) {//第53周特殊处理
            var start = time + (weeks - 2) * 7 * 24 * 3600000; //第53周开始时间
            var end = time + (weeks - 2) * 7 * 24 * 3600000 + lastcnt * 24 * 3600000 - 24 * 3600000; //第53周结束时间
            date.setTime(start);
            var _start = date.Format("MM/dd");
            date.setTime(end);
            var _end = date.Format("-MM-dd");
            return year + _end;
        } else {
            var start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间
            var end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000; //第n周结束时间
            date.setTime(start);
            var _start = date.Format("MM/dd");
            date.setTime(end);
            var _end = date.Format("-MM-dd");
            return year + _end;
        }
    } else {//一年54周情况
        var cnt = 0;// 获取距离周末的天数
        if (_week == 0 && weeks == 1) {//第一周
            cnt = 0;
        } else if (_week == 0) {
            cnt = 7;
        } else if (_week == 1) {
            cnt = 6;
        } else if (_week == 2) {
            cnt = 5;
        } else if (_week == 3) {
            cnt = 4;
        } else if (_week == 4) {
            cnt = 3;
        } else if (_week == 5) {
            cnt = 2;
        } else if (_week == 6) {
            cnt = 1;
        }
        cnt += 1;//加1表示以星期一为一周的第一天
        // 将这个长整形时间加上第N周的时间偏移
        time += 24 * 3600000; //第2周开始时间
        var nextYear = new Date(parseInt(year, 10) + 1, "0", "1");
        var nextWeek = nextYear.getDay();
        var lastcnt = 0;//获取最后一周开始时间到周末的天数
        if (nextWeek == 0) {
            lastcnt = 6;
        } else if (nextWeek == 1) {
            lastcnt = 0;
        } else if (nextWeek == 2) {
            lastcnt = 1;
        } else if (nextWeek == 3) {
            lastcnt = 2;
        } else if (nextWeek == 4) {
            lastcnt = 3;
        } else if (nextWeek == 5) {
            lastcnt = 4;
        } else if (nextWeek == 6) {
            lastcnt = 5;
        }
        if (weeks == 1) {//第1周特殊处理
            var start = date.Format("yyyy-MM-dd");
            date.setTime(time - 24 * 3600000);
            alert(start + '--' + date);
            return _start + "--" + date;
        } else if (weeks == 54) {//第54周特殊处理
            var start = time + (weeks - 2) * 7 * 24 * 3600000; //第54周开始时间
            var end = time + (weeks - 2) * 7 * 24 * 3600000 + lastcnt * 24 * 3600000 - 24 * 3600000; //第53周结束时间
            date.setTime(start);
            var _start = date.Format("yyyy-MM-dd");
            date.setTime(end);
            var _end = date.Format("yyyy-MM-dd");
            return _start + "--" + _end;
        } else {
            var start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间
            var end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000; //第n周结束时间
            date.setTime(start);
            var _start = date.Format("yyyy-MM-dd");
            date.setTime(end);
            var _end = date.Format("yyyy-MM-dd");
            return _start + "--" + _end;
        }
    }
};

// 获取周最后一天
globalMonEndDay = function (year, mons) {
    let date = year + '-' + mons
    let endDate = new Date(date); //date 是需要传递的时间如：2018-08
    let month = endDate.getMonth();
    let nextMonth = ++month;
    let nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1);
    let oneDay = 1000 * 60 * 60 * 24;
    let dateString = new Date(nextMonthFirstDay - oneDay);
    let dateYar = dateString.toLocaleDateString(); //toLocaleDateString() 返回 如：2018/8/31
    var end = dateYar.replace(new RegExp('/', 'g'), "-");
    return end
};

// 设备状态
globalQuipState = function () {
    let option = [
        {
            value: '',
            label: '全部'
        }, {
            value: '0',
            label: '新入库'
        }, {
            value: '1',
            label: '未售'
        }, {
            value: '2',
            label: '未售'
        }, {
            value: '3',
            label: '已售'
        }, {
            value: '4',
            label: '维修'
        }, {
            value: '5',
            label: '报废'
        }, {
            value: '6',
            label: '已售未入'
        }
    ];
    return option
};

// 操作员
globalOperatorList = function () {
    let option = [
        {
            value: '',
            label: '全部'
        }, {
            value: '0',
            label: '高瑟'
        }, {
            value: '1',
            label: '林克'
        }, {
            value: '2',
            label: '小智'
        },
    ];
    return option
};

// 产品线状态
globalLinestatusOpt = function () {
    let option = [
        {
            value: '',
            label: '全部'
        }, {
            value: '0',
            label: '禁用'
        }, {
            value: '1',
            label: '启用'
        }, {
            value: '44',
            label: '删除'
        },
    ];
    return option
};

// 开始时间
globalBt = function () {
    const et = new Date();
    const bt = new Date();
    bt.setTime(bt.getTime() - 3600 * 1000 * 24 * 7);
    return [bt, et];
};

// 格式化时间
globalfmtDate = function (datetime, length) {
    if ((datetime == '') || (datetime == undefined))
        return '';
    if ((datetime == '1900-01-01') || (datetime == '1900-01-01 00:00:00.000'))
        return '';
    length = !length ? 10 : length;//缺省参数
    return (datetime != null) ? datetime.substr(0, length) : '';
};

//格式化日期  年月日
globaltime2String = function (time) {
    let datetime = new Date();
    datetime.setTime(time);
    let year = datetime.getFullYear();
    let month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
};

// 获取当前时间
globalcurrent = function () {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let thisdata = year + seperator1 + month + seperator1 + strDate;
    return thisdata;
};

// 校验内容长度
globalValid = function (data, mins, maxs, text, that) {
    let thisVal = data;
    let thisLeng = thisVal.length;
    let min = parseInt(mins);
    let max = parseInt(maxs);
    let dispalyMin = min + 1;
    let title = '警告';
    if (thisVal == '') {
        Toast(text + '不能为空！');
        return false
    } else if (thisLeng <= min) {
        Toast(text + '最少' + dispalyMin + '字符！');
        return false
    } else if (thisLeng > max) {
        Toast(text + '超出限制数量！');
        return false
    } else {
        return true
    }
};

// 每页选项
pageOptions = function () {
    let option = [
        {
            value: 10,
            label: '10'
        }, {
            value: 25,
            label: '25'
        }, {
            value: 50,
            label: '50'
        }, {
            value: 100,
            label: '100'
        },
    ];
    return option
};

// 手机号码格式
globalCheckPhone = function (val) {
    let re = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
    if (val.search(re) == -1) {
        return false;
    } else {
        return true;
    }
};

// session 检测
globalCheckSession = function (val, that) {
    if (val == '<script>top.window.location="http://det/?act=login"</script>') {
        that.$router.push({path: '/login'});
    }
};

// 每页选项
HdOptions = function () {
    let option = [
        {
            value: '',
            label: '全部'
        },
        {
            value: '1',
            label: '硬件驱动'
        }, {
            value: '2',
            label: '配置文件'
        },
    ];
    return option
};
