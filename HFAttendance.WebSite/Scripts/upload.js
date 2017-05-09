var uploader, $list, $btn, curThis;
var state = 'pending';
var Upload = {
    file: function (curClass, maxSize, extArr, callback) {
        curThis = $("." + curClass);
        var uploader, $list, $btn, curThis;
        $btn = curThis.find(".btnUpload");
        $list = curThis.find(".uploadList");
        var uploader = WebUploader.create({
            // 选完文件后，是否自动上传。
            auto: false,
            fileNumLimit: 1,
            // swf文件路径
            swf: DOMAIN + '/js/uploader/Uploader.swf',
            // 文件接收服务端。
            server: '/upload/file',
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id: curThis.find(".picker"),
                multiple: false
            }
        });

        $btn.on('click', function () {
            if (state === 'uploading') {
                uploader.stop();
            } else {
                uploader.upload();
            }
        });

        $list.on('click', '.uploadDel', function () {
            var curFileId = $(this).data("fileid");
            if (curFileId) {
                uploader.removeFile(curFileId);
                $list.html('');
                curThis.find(".picker").removeClass('webuploader-element-invisible');
                curThis.find(".fileVal").val('');
            }
        });

        uploader.on('fileQueued', function (file) {
            maxSize = maxSize ? maxSize : 2097152;
            if (file) {
                if (file.size > maxSize) {
                    var humanSize = Func.humanSize(maxSize);
                    uploader.removeFile(file);
                    Hf_Attendance.showAlert('上传提示', '上传文件大小不能超过 ' + humanSize, 0);
                    return false;
                }
                if (extArr) {
                    if (Func.inArray(file.ext, extArr) != true) {
                        uploader.removeFile(file);
                        Hf_Attendance.showAlert('上传提示', '上传文件类型错误', 0);
                        return false;
                    }
                }
                //curThis.find(".picker").hide();
                curThis.find(".picker").addClass('webuploader-element-invisible');
                $list.html('');
                $list.append('<div id="' + file.id + '" class="item">' +
                    '<span class="info">' + Func.shortStr(file.name) + '</span><span class="state">等待上传</span><a href="javascript:;" data-fileid="' + file.id + '" class="uploadDel" >删除</a>' + '</div>');
                uploader.upload();
            }
        });

        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress .progress-bar');
            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<div class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                    '</div>' +
                    '</div>').appendTo($li).find('.progress-bar');
            }
            $li.find('.state').text('上传中...');
            $percent.css('width', percentage * 100 + '%');
        });
        uploader.on('uploadSuccess', function (file) {
            $('#' + file.id).find('.state').text('上传成功');
        });

        uploader.on('uploadError', function (file) {
            $('#' + file.id).find('.state').text('上传出错!');
            $('#' + file.id).find('.state').addClass('error');
            uploader.removeFile(file);
        });

        uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').fadeOut();
        });
        uploader.on('uploadAccept', function (file, response) {
            if (callback) {
                callback(response);
                return response.errno ? false : true;
            }
            if (response.errno) {
                // 通过return false来告诉组件，此文件上传有错。
                Hf_Attendance.showAlert('上传提示', response.error, 0);
                return false;
            }
        });
    }
}