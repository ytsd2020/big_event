$(function() {
    //调用用户信息的函数
    getUserInfo();

    //点击退出事件
    $("#btnLogOut").on('click', function() {
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function(index) {
            //清除token值，并且跳转到首页页面
            localStorage.removeItem('token');
            location.href = '/login.html';

            layer.close(index);
        });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        //根目录在baseAPI中统一调用
        url: '/my/userinfo',
        //headers在baseAPI中统一调用
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            console.log(res);

            //调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        }
    })
}

//渲染用户头像
function renderAvatar(user) {
    // 获取用户名，并且渲染给页面
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic === null) {
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    } else {
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', user.user_pic).show();
    }
}