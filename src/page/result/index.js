'use strict'

require('./index.css')

// 引入nav
require('../common/nav-simple/index')

var _mm = require('util/index');

$(function () {
    var type = _mm.getURLParam('type') || 'default',
        $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})
