/**
 * Created by PhpStorm.
 * User: lijie07
 * Date: 2015/9/17
 * Time: 11:21
 */
(function ($) {
    $.extend({
        getDaysInMonth: function (year, month) {
            var date = new Date(year, month, 0);
            return date.getDate();
        },
        getDayIsWeek: function (year, month) {
            var date = new Date(year, month, 1);
            //var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            return date.getDay();
        },
        //初始化日历
        initialCalendar: function (year, month, setdateId, daysShow) {
            //$.setDate(year, month, setdateId);
            $.createCalendar(year, month, daysShow);
        },
        //设置显示的日期
        setDate: function (year, month, setdateId) {
            $("#" + setdateId).text(year + "  年 " + month + " 月");
        },
        //生成日历
        createCalendar: function (year, month, daysShow) {
            var prevDays = $.getDaysInMonth(year, month - 1);
            var thisdays = $.getDaysInMonth(year, month);
            var prevweek = $.getDayIsWeek(year, month - 1);
            var uiDays = $.concPrevMonth(year, month, prevweek, prevDays) + $.concThisMonth(year, month, thisdays) + $.concNextMonth(year, month, thisdays, prevweek);
            $("#" + daysShow).html("").html(uiDays);
        },

        //获取上个月需要填充的每一天
        concPrevMonth: function (year, month, week, prevDays) {
            var prevlis = "";
            month = month - 1;
            if (month < 10)
                month = "0" + month;
            for (var i = prevDays - week + 1; i <= prevDays; i++) {
                prevlis += '<li class="disable"  style="cursor:pointer;"><em class="num">' + i + '</em></li>';
            }
            return prevlis;
        },
        //获取本月需要充填的每一天
        concThisMonth: function (year, month, days) {
            var thislis = "";
            var date = new Date();
            var today = date.getDate();
            var todaymonth = date.getMonth();
            var todayyear = date.getFullYear();
            if (month < 10)
                month = "0" + month;
            for (var i = 1; i <= days; i++) {
                var day = "";
                if (i < 10)
                    day = "0" + i;
                else
                    day = i;
                if (i == today && year == todayyear && (todaymonth + 1) == month) {
                    thislis += '<li id="' + year + '-' + month + '-' + day + '" class="today" style="cursor:pointer;"><span class="png isign"></span><a class="num">' + i + '</a></li>';
                } else
                    thislis += '<li id="' + year + '-' + month + '-' + day + '" style="cursor:pointer;"><span class="png isign"></span><a class="num">' + i + '</a></li>';
            }
            return thislis;
        },
        //获取下个月需要充填的每一天
        concNextMonth: function (year, month, days, week) {
            var nextlis = "";
            month = month + 1;
            if (month < 10)
                month = "0" + month;
            var length = 42 - (week + days);
            for (var i = 1; i <= length; i++) {
                var day = "";
                if (i < 10)
                    day = "0" + i;
                else
                    day = i;
                nextlis += '<li class="disable"  style="cursor:pointer;"><em class="num">' + i + '</em></li>';
            }
            return nextlis;
        }
    });
})(jQuery)