/**
 * Created by lijie07 on 2016/4/27.
 */

var Hf_Attendance = {
    showPopup: function (e) {
        $('.' + e).show();
    },
    hidePopup: function (e) {
        $('.' + e).hide();
        $('.' + e + ' input[type="password"]').val('');
    },
    editPwd: function () {
        var pwd0 = $('input[name="pwd0"]').val();
        var pwd1 = $('input[name="pwd1"]').val();
        var job_num = $('input[name="job_num"]').val();
        var len = Func.getLength(pwd0);
        if (len >= 6) {
            if (pwd0 == pwd1) {
                Func.post('/users/editpwd', {pwd0: pwd0, pwd1: pwd1, job_num: job_num}, Hf_Attendance.successSubmit);
            } else {
                alert('两次输入的密码不一致');
            }
        } else {
            alert('密码长度必须大于6');
        }
    },
    successSubmit: function (data) {
        alert(data.msg);
        if (data.result >= 0) {
            Hf_Attendance.logout();
        }
    },
    logout: function () {
        window.location.href = '/users/logout';
    },
    showAlert: function (title, content, flag) {
        var html = '<div class="alert" style=""> <div class="mask_div"></div> <div class="popup" style="width: 300px;top: 35%;left: 55%;position:fixed"> <div class="pop_mod"> <div class="pop_title"> <span class="pop_tit">' + title + '</span> <a href="javascript:;" class="u_icon lnk_close pwd_close" onclick="Hf_Attendance.closeAlert(' + flag + ')"></a> </div> <div class="pop_main"><div class="pop_form_mod" style="text-align: center;">';
        html += content;
        html += ' </div> </div></div> </div> </div>';
        $('body').append(html);
    },
    closeAlert: function (flag) {
        $('.alert').remove();
        if (flag == 1) {
            window.location.reload();
        }
    },
    showDetailRecordsAlert: function (title, data) {
        var html = ' <div class="alert" style=""> <div class="popup" style="top: 35%;left: 55%;width: 700px;"> <div class="pop_mod"> <div class="pop_title"> <span class="pop_tit">' + title + '</span> <a href="javascript:;" class="u_icon lnk_close pwd_close" onclick="Hf_Attendance.closeAlertNoReFresh()"></a> </div> <div class="pop_main" style="height: 300px;"><div class="pop_form_mod" style="text-align: center;"> <table class="table_style"> <tbody class="att_body"> <tr> <th class="t1">工号</th> <th class="t2">打卡时间</th> <th class="t">打卡类型 </th> <th>备注</th></tr>';
        for (i = 0; i < data.length; i++) {
            var remark = data[i].remark;
            if( remark == null) remark = '';
            if(remark != ''){
                type = '补打卡';
            } else {
                type = '考勤机打卡';
            }
            html += '<tr style="border-bottom: dotted 1px lightgrey;"> <td class="t1">' + data[i].job_num + '</td> <td class="t2">' + data[i].check_time + '</td> <td class="t3">'+ type +'</td> <td class="t4">' + remark + '</td>';
        }
        html += ' </tbody> </table></div> </div></div> </div> </div>';
        $('body').append(html);
    },
    closeAlertNoReFresh: function () {
        $('.alert').remove();
    },
    showdetail: function (att_date, job_num) {
        Func.post('/records/getdetailrecords', {att_date: att_date, job_num: job_num}, Hf_Attendance.showDetailRecords);
    },
    showDetailRecords: function (data) {
        Hf_Attendance.showDetailRecordsAlert('考勤详细记录', data);
    },
    upload:function (){
        Upload.file("upload_1", 10485760, new Array("doc", "docx", "ppt", "pptx", "xlsx", "xls",'jpg','jpeg','png','txt'), function (data) {
            if (data.errno) {
                Hf_Attendance.showAlert('上传提示', data.error, 0);
                return false;
            } else {
                $('#error_planfile').hide();
                var fileaddress = data.data['file'];
                //Hf_Attendance.showAlert('上传提示', fileaddress, 0);
                $("#attachment").val(fileaddress);
            }
        });
    }
};