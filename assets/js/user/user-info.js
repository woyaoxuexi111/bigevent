$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1-6字符之间"
            }
        }
    })
    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.stautus !== 0) {
                    return layer.msg("获取用户信息失败")
                }
                console.log(res);
                // 调用form.val()快速给表单赋值
                form.val("formUserInfo", res.data);
            }
        })
    }
    //    点击重置，实现重置功能
    $("#btnReset").on("click", function () {
        // 阻止表单的默认重置行为
        e.preventDefault();
        // 再次调用获取用户信息的回调函数，重新填充一下表单
        initUserInfo();

    })
    //  监听表单的提交修改事件
    $(".layui-form").on("submit", function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 发起jax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 快速拿到表单里面的数据
            data: $(this).serialize(),
            success: function (res) {
                 if(res.status !== 0) {
                     return layer.msg("更新用户信息失败！")
                 }   
                 layer.msg("更新用户信息成功！")
                //  调用父页面的方法，重新渲染用户头像和信息
                //    当前页面的父页面就是index，再调用父页里面的getUserInfo() ；
                window.parent.getUserInfo() 
            }
        })
    }) 
})