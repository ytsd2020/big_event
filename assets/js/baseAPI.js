//每次调用AJAX请求之前，都会要先调用这个函数
$.ajaxPrefilter(function(option) {
    // console.log(option.url);
    option.url = 'http://ajax.frontend.itheima.net' + option.url;

    //设置有权窜的请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }

    //无论成功还是失败，都会调用complete
    option.complete = function(res) {
        console.log('回调了函数');
        // 清除token,并且强制跳转页面到登录页
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})