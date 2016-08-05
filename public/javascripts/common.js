


/***
* 修改jQuery.validate的默认设置参数
* 加入bootstrap样式相关内容
*/
$.validator.setDefaults({
    errorElement: 'span',
    eooroClass: 'help-block',

    highlight: function (element) {
        //closest 查找最近的一个祖先元素
        $(element).closest('.form-group').addClass('has-error');

    },
    success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
    },
    errorPlacement: function (error, element) {
        element.parent('div').append(error);
    }
})

$.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/
    return this.optional(element) || (length == 11 && mobile.test(value));
})


$(function () {
    $.getJSON('/admin/getLoginedUser',function(res){
        $("#adminUserAvatar").arrt('src',res.data.avatar);
        $("#adminUserAvatar").attr('alt',res.data.adminUserName);
        $("#adminUserName").text(res.data.user_name);
    })

    $("#imgCtrl").click(function () {
        $("#selectFile").click();
    });

    ////html5Uploader 标准配置方法
    $("#selectFile").html5Uploader({
        name: "Filedata",
        postUrl: "/common/file/uploadfile", ////图片上传的post提交地址
        onSuccess: function (msg) { /////上传成功后的回调函数
            try {
                var url = JSON.parse(msg.currentTarget.response).url;
                $("#imgCtrl").attr("src", url); ////指定img控件的src属性
                $("#iAvatar").val(url); /////服务器端接收时需要获取的标签
            }
            catch (e) {
                console.log(e);
            }
        }
    })

        var options = {
        uploadJson: '/common/kindeditor/uploadImg',
        afterBlur: function(){this.sync();}
    };

    KindEditor.ready(function(K) {
        window.editor = K.create('#editor', options);
    });

    //////////文件上传点击
    document.getElementById('yl_file_upload').onclick = function(){
        $("#single_image").click(); ////触发input的click事件，打开选择文件界面
    }

    ////html5Uploader 标准配置方法
    $("#single_image").html5Uploader({
        name: "Filedata",
        postUrl: "/common/file/uploadfile", ////图片上传的post提交地址
        onSuccess: function (msg) { /////上传成功后的回调函数
            console.log(msg);
            try {
                var url = JSON.parse(msg.currentTarget.response).url;
                $("#m_imgCtrl").attr("src", url); ////指定img控件的src属性
                $("#ImgUrls").val(url); /////服务器端接收时需要获取的标签
            }
            catch (e) {
                console.log(e);
            }
        }
    });
});

