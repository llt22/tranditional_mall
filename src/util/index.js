'use strict'

var config = {
    // 服务器域名
    serverHost: ''
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
    },
    // 生成请求路径
    getServerURL: function (path) {
        return config.serverHost + path
    },
    // url 参数转 对象存储
    getURLParam: function (url) {
        var url = url || ''
        var index = url.indexOf('?')
        var obj = {}
        var str = ''
        if (index < 0) {
            return obj
        } else {
            str = url.slice(index + 1)
        }

        var j = str.indexOf('&')
        if (j < 0) {
            var arr = str.split('=')
            obj[arr[0]] = arr[1]
            return obj
        } else {
            var arr = str.split('&')
            for (var i = 0, len = arr.length; i < len; i++) {
                var a = arr[i].split('=')
                obj[a[0]] = a[1]
            }
            return obj
        }
    },
}

module.exports = _mm



