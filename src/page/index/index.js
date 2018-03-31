var util = require('../../util/index')
console.log('hello')
function fn() {
    console.log(util)
    console.log('fn---')
    util.e('div').innerHTML = 'jjj'
}
fn()