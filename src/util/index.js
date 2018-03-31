'use strict'

var hogan = require('hogan')

var config = {
    // 服务器域名
    serverHost: ''
}

var _mm = {
    request: function (param) {
        var _this = this
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
                    _this.doLogin()
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

    // 从url 参数中提取值
    getURLParam: function (key) {
        var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    // 渲染函数，减小 dom 操作的难度
    render: function (html, data) {
        // tpl <div>{{age}}</div>
        // var data = { age: 99 }
        var tpl = hogan.compile(html)
        var result = tpl.render(data)
        return result
    },

// 成功提示
    successTips: function (msg) {
        alert(msg || '操作成功')
    },

//  错误提示
    errorTips: function (msg) {
        alert(msg || '哪里不对了')
    },

// 字段验证, 是否为空， 手机， 邮箱
    validate: function (value, type) {
        // 将穿进来的数据去掉空格， 同时转成字符串
        var value = $.trim(value)

        // 非空验证，返回布尔值
        if (type === 'required') {
            return !!value
        }

        // 验证如果是手机就返回手机号，否返回布尔值
        if (type === 'phone') {
            return /^1\d{10}$/.test(value)
        }
        // 验证邮箱是否合法，返回布尔值
        if (type === 'email') {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase());
        }
    },

// 回主页
    goHome: function () {
        window.location.href = './index.html'
    }
}

module.exports = _mm

