/**
 *
 */
var Func = {
    getLength: function (str) {
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode > 0 && charCode <= 128) realLength += 1;
            else realLength += 2;//一个中文算2个字符
        }
        return realLength;
    },
    checkFormat: function (str, type) {
        var patrn;
        switch (type) {
            case 'nick':
                patrn = /[^0-9a-zA-Z\u4e00-\u9fa5]/;
                if (patrn.exec(str)) {
                    return '昵称只能为中文，字母或数字';
                }
                break;
            case 'en'://字母
                patrn = /[^a-zA-Z]/;
                if (patrn.exec(str)) {
                    return '只能为字母';
                }
                break;
            case 'num'://数字
                patrn = /[^0-9]/;
                if (patrn.exec(str)) {
                    return '只能为数字';
                }
                break;
            case 'mobile'://
                patrn = /^((\+?86)|\(\+?86\))?0?1(3|5|8)(\d){9}$/;
                if (!patrn.exec(str)) {
                    return '手机号格式不正确';
                }
                break;
            case 'email'://
                patrn = /^[_.0-9a-z-]+@([0-9a-z][0-9a-z-]+.)+[a-z]{2,3}$/i;
                if (!patrn.exec(str)) {
                    return '邮箱格式不正确';
                }
                break;
            case 'idcard':
                var ret = this.checkIdcard(str);
                if (ret !== true) {
                    return '身份证格式不正确';
                }
                break;
            default:
                break;
        }
        return true;
    },
    checkIdcard: function (code) {
        //15位先转为18位
        if (code.length == '15') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0;
            var i;
            code = code.substr(0, 6) + '19' + code.substr(6, code.length - 6);
            for (i = 0; i < 17; i++) {
                cardTemp += code.substr(i, 1) * arrInt[i];
            }
            code += arrCh[cardTemp % 11];
        }
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var tip = "";
        if (!code || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(code)) {
            return false;
        }
        else if (!city[code.substr(0, 2)]) {
            return false;
        }
        else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    return false;
                }
            }
            //
        }
        return true;
    },
    getBirthDate: function (code) {
        //15位先转为18位
        if (code.length == '15') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0;
            var i;
            code = code.substr(0, 6) + '19' + code.substr(6, code.length - 6);
            for (i = 0; i < 17; i++) {
                cardTemp += code.substr(i, 1) * arrInt[i];
            }
            code += arrCh[cardTemp % 11];
        }
        return code.substr(6, 8);
    },
    oldajax: function (url, arr) {
        var ret = {'errno': true, 'data': '操作失败'};
        $.ajax({
            url: url,
            data: arr,
            type: 'post',
            async: false,
            dataType: 'json',
            success: function (msg) {
                if (!msg.errno) {
                    ret = {'errno': false, 'data': msg.data};
                } else {
                    ret = {'errno': true, 'data': msg.error};
                }
            }
        });
        return ret;
    },
    ajax: function (url, arr, callback) {
        var ret = {'errno': true, 'data': '操作失败'};
        $.ajax({
            url: url,
            data: arr,
            type: 'post',
            async: true,
            dataType: 'json',
            success: function (msg) {
                if (!msg.errno) {
                    ret = {'errno': false, 'data': msg.data};
                    return callback(ret);
                } else {
                    ret = {'errno': true, 'data': msg.error};
                    return callback(ret);
                }
            }
        });
    },
    get: function (url, arr, callback) {
        $.ajax({
            url: url,
            data: arr,
            type: 'get',
            async: true,
            success: function (msg) {
                return callback(msg);
            },
            error: function (obj, error, exception) {
                return callback(false);
            }
        });
    },
    oldget: function (url, arr) {
        var ret = false;
        $.ajax({
            url: url,
            data: arr,
            type: 'get',
            async: false,
            success: function (msg) {
                ret = msg;
            },
            error: function (obj, error, exception) {
                ret = false;
            }
        });
        return ret;
    },
    getCitys: function () {

    },
    curStr: function (str, len, hasDot) {
        var newStr = '';
        var newLength = 0;
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = '';
        var strLength = str.replace(chineseRegex, "**").length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                newLength += 2;
            }
            else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }
        if (hasDot && strLength > len) {
            newStr += "...";
        }
        return newStr;
    },
    shortStr: function (str, startLen, endLen) {
        var newStr = '';
        startLen = startLen ? parseInt(startLen) : 3;
        endLen = endLen ? parseInt(endLen) : 6;
        if (str.length > (startLen + endLen + 5)) {
            newStr += str.substr(0, 3);
            newStr += '***';
            newStr += str.substr(str.length - 5, 5);
        } else {
            newStr = str;
        }
        return newStr;
    },
    inArray: function (str, arr) {
        if (!arr || !str) {
            return false;
        }
        for (var i = 0; i < arr.length; i++) {
            if (str == arr[i]) {
                return true;
            }
        }
        return false;
    },
    humanSize: function (size) {
        var humanSize;
        if (size > 1048576) {
            humanSize = Math.floor(size / 1048576) + ' M';
        } else if (size > 1024) {
            humanSize = Math.floor(size / 1024) + ' KB';
        } else {
            humanSize = size + ' B';
        }
        return humanSize;
    },
    post: function (url, arr, callback) {
        $.ajax({
            url: url,
            data: arr,
            type: 'post',
            async: true,
            dataType: 'json',
            success: function (data) {
                if (callback != null || callback != undefined)
                    callback(data);
            },
            error: function (obj, error, exception) {
                if (callback != null || callback != undefined)
                    return callback(false);
            }
        });
    },
    myFormatter: function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var min = date.getMinutes();
        var s = date.getSeconds();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
    },
    myTimeFormatter: function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var min = date.getMinutes();
        var s = date.getSeconds();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (min < 10 ? ('0' + min) : min);
    },
    myParser: function (s) {
        if (!s) return new Date();
        var ss = (s.split('-'));
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return new Date();
        }
    },
    myTimeParser: function (s) {
        if (!s) return new Date();
        var ss = ((s.split(' '))[0]).split('-');
        var hhmm = ((s.split(' '))[1]).split(':');
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        var h = parseInt(hhmm[0], 10);
        var min = parseInt(hhmm[1], 10);

        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d, h, min);
        } else {
            return new Date();
        }
    },
    setSDate: function (date) {
        $('.stime').val(Func.myFormatter(date));
    },
    setEDate: function (date) {
        $('.etime').val(Func.myFormatter(date));
    },
    changeSDate: function (date) {
        $('.stime').val(date);
    },
    changeEDate: function (date) {
        $('.etime').val(date);
    },
	mySubString:function(str, len, hasDot) {
            var newLength = 0;
            var newStr = "";
            var chineseRegex = /[^\x00-\xff]/g;
            var singleChar = "";
            var strLength = str.replace(chineseRegex, "**").length;
            for (var i = 0; i < strLength; i++) {
                singleChar = str.charAt(i).toString();
                if (singleChar.match(chineseRegex) != null) {
                    newLength += 2;
                }
                else {
                    newLength++;
                }
                if (newLength > len) {
                    break;
                }
                newStr += singleChar;
            }

            if (hasDot && strLength > len) {
                newStr += "...";
            }
            return newStr;
        }
}