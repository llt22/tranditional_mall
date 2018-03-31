var util = require('../../util/index')
require('./index.css')
console.log('hello')
function fn() {
    console.log(util)
    console.log('fn---')
    util.e('div').innerHTML = 'jjj'
}
fn()