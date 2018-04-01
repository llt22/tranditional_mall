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
    },
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        }
        var validateResult = this.formValidate(formData)
        if (validateResult.status === true) {
            // 向后台提交数据
            formError.hide()
            userAPI.register(formData, function (res) {
                console.log(res)
                window.location.href = './result.html?type=register'
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
        var r = false
        for (var key in formData) {
            r = _mm.validate(formData[key], 'required')
            if (r === false) {
                result.msg = key + ':不能为空'
                break
            } else if (key === 'phone') {
                r = _mm.validate(formData.phone, 'phone')
                if (r === false) {
                    result.msg = "手机格式不正确"
                    break
                }
            } else if (key === 'email') {
                r = _mm.validate(formData.email, 'email')
                if (r === false) {
                    result.msg = "邮箱格式不正确"
                    break
                }
            }
        }

        if(r === true) {
            if(formData.password === formData.passwordConfirm){
            } else {
                r = false
                result.msg = "两次输入的密码不匹配"
            }
        }

        if (r === true) {
            result.status = true
        }
        return result
    }
}
page.init()