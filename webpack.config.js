var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var WEBPACK_ENV =  process.env.WEBPACK_ENV || 'dev'

var getHtmlConfig = function (entryName, title) {
    return {
        template: './src/view/' + entryName + '.html',
        title: title,
        filename: 'view/' + entryName + '.html',
        inject: true,
        hash: true,
        // 要引入哪几个模块，因为模块中引入样式，所以样式不用单独写
        chunks: ['common', entryName]
    }
}

var config = {
    entry: {
        'common': ['page/common/index.js'],
        'index': ['page/index/index.js'],
        'result': ['page/result/index.js'],
        'user-login': ['page/user-login/index.js'],
        'user-register': ['page/user-register/index.js'],
    },

    // devServer: {
    //     port:8000
    // },
    resolve: {
        alias: {
            util : __dirname +  '/src/util',
            page : __dirname +  '/src/page',
            service : __dirname +  '/src/service',
            image : __dirname +  '/src/image',
        }
    },
    output: {
        // 存储编译后的文件的路径
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        // 访问文件的路径
        publicPath: '/dist/'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    plugins: [
        // 独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 提交 css 到单独文件
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),

    ],
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.string$/, loader: 'html-loader'},
            // limit=100 小于 100k 的文件会转 base4 格式
            // name=resource/[name].[ext] 放在指定文件夹
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
        ]
    }
}

if(WEBPACK_ENV === 'dev') {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8081')
}

module.exports = config