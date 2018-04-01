var _mm = require('util/index')

var object = {
    // 用户登录
    login: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerURL('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查用户名
    checkUsername: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerURL('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 用户注册
    register: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerURL('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
}

module.exports = object