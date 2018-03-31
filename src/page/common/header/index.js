'use strict';
require('./index.css');

var _mm = require('util/index');
// 通用页面头部
var header = {
    init: function () {
        this.onLoad()
        this.bindEvent();
    },
    onLoad: function () {
        var value = _mm.getURLParam('keyword')
        if (value) {
            $('#search-input').val(value)
        }
    },
    bindEvent: function () {
        // 在外面写self = this 是错误的，this 只存在于函数执行的时候的内部
        var _this = this
        $("#search-btn").click(_this.search)
        $("#search-input").keyup(function (event) {
            if (event.keyCode == 13) {
                _this.search()
            }
        })
    },
    search: function () {
        var value = $.trim($("#search-input").val())
        console.log('value', value)
        if (value) {
            window.location.href = './list.html?keyword=' + value
        }
    },

};

header.init();