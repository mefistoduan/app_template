companyInfo = {
    url: 'http://xxx.xxx.com/',
    main: 'Mefisto',
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
globaltime2String = function(time){
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
        that.$message({
            message: text + '不能为空！',
            type: 'warning'
        });
        return false
    } else if (thisLeng <= min) {
        that.$message({
            message: text + '最少' + dispalyMin + '字符！',
            type: 'warning'
        });
        return false
    } else if (thisLeng > max) {
        that.$message({
            message: text + '超出限制数量！',
            type: 'warning'
        });
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
