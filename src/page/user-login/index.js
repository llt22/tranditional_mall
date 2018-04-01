'use strict'

require('./index.css')

// 引入nav
require('../common/nav-simple/index')

var _mm = require('util/index')
var userAPI = require('service/user-service')
var formError = {
    show: function (msg) {
        $('.error-item').show().find('.err-msg').text(msg)
    },
    hide: function () {
        $('.error-item').hide()
    }
}

var page = {
    init: function () {
        this.bindEvent()
    },

    bindEvent: function () {
        var _this = this
        // 这种方式调用者还是 dom 元素，因为下面只是找到这个函数，而不是调用
        // $('#submit').click(_this.submit)
        $('#submit').click(function () {
            _this.submit()
        })
        $('.user-content').click(function (e) {

            if (e.keyCode === 13) {
                alert('_this')
                _this.submit()
            }
        })
    },
    submit: function () {
        console.log('this', this)
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        }
        var validateResult = this.formValidate(formData)
        if (validateResult.status === true) {
            // 向后台提交数据
            formError.hide()
            userAPI.login(formData, function (res) {
                console.log(res)
                window.location.href = _mm.getURLParam('redirect')
            }, function (err) {
                formError.show(err)
            })

        } else {
            // 错误提示
            formError.show(validateResult.msg)
        }
    },
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        }

        for (var key in formData) {
            var r = _mm.validate(formData[key], 'required')
            if (r === false) {
                result.msg = key + ':不能为空'
                break
            }
        }

        if (r === true) {
            result.status = true
        }

        return result
    }
}
page.init()