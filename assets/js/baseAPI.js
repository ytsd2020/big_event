//每次调用AJAX请求之前，都会要先调用这个函数
$.ajaxPrefilter(function(option) {
    console.log(option.url);
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
})