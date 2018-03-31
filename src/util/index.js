'use strict'

var config = {
    // 服务器域名
    serviceHost: ''
}

var _mm = {
    self: this,
    request: function (param) {
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.data || 'json',
            success: function (res) {
                // 请求成功，并且返回数据
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                // 需要强制登录
                else if (res.status === 0) {
                    self.doLogin()
                    //请求数据错误
                } else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
    doLogin: function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
    }
}

module.exports = _mm



