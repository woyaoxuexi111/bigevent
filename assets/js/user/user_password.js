$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({

        // / 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        //  旧密码不能和新密码一致
        samePwd: function (value) {
            var pwd = $('[name=oldPwd]').val()
            if (value === pwd) {
                return "原旧密码不能相同"
            }
        },

        rePwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }

    })
    // 表单密码重置监听 
    $(".layui-form").on("submit", function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 发起jax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            // 快速拿到表单里面的数据
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0) {
                    return layui.layer.msg("更新密码失败！")
                }   
                layui.layer.msg("更新密码成功！")

                // 同时刷新重置表单
                // $(".layui-form")[0] 获取他的原生dom对象，再利用form表单的reset属性重置
                $(".layui-form")[0].reset();
           }

        })
    })
})