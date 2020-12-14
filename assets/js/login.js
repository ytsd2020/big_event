$(function() {
    $('#login').on('click', function() {
        $('.login-box').hide();
        $('.resign-box').show();
    });
    $('#resign').on('click', function() {
        $('.login-box').show();
        $('.resign-box').hide();
    });

    //表单的验证规则
    // (1)获取layui中form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function(value) {
            var pwd = $(".resign-box [name=password]").val();
            if (pwd !== value) {
                return "两次输入的密码不一致";
            }
        }
    });

    // 注册用户信息
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        };
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // 模拟人的点击行为
            $("#resign").click();
        })
    });

    //登录页面
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                localStorage.setItem('token', res.token);
                layer.msg(res.message);
                location.href = '/index.html'
            }
        })
    })
})