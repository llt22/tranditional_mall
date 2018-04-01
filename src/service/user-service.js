var _mm = require('util/index')

var object = {
    login: function (userInfo, resolve, reject) {
        _mm.request({
            method: "POST",
            url: _mm.getServerURL('/user/login.do'),
            data: userInfo,
            success: resolve,
            error: reject
        })
    }
}

module.exports = object