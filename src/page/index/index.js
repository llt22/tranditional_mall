'use strict'
var util = require('../../util/index')
require('./index.css')

// 引入nav
require('../common/nav-normal/index')
// 引入header
require('../common/header/index')
// 引入nav-side
var navSide = require('../common/nav-side/index')
navSide.init({name: 'user-center'})