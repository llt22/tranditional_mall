var util = require('../../util/index')
require('./index.css')

util.request({
    url: '/product/list.do?keyword=1',
    success: function (res) {
        console.log('res', res)
    },
    error: function (err) {
        console.log('err', err)
    }
})