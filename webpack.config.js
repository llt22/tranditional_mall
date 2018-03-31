var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

var getHtmlConfig = function (pageName) {
    return {
        template: './src/view/'+ pageName +'.html',
        filename: 'view/'+ pageName +'.html',
        inject: true,
        hash: true,
        // 要引入哪几个模块，因为模块中引入样式，所以样式不用单独写
        chunks: ['common', pageName]
    }
}

var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
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
        new HtmlWebpackPlugin( getHtmlConfig('index')),
        new HtmlWebpackPlugin( getHtmlConfig('login'))
    ],
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            // limit=100 小于 100k 的文件会转 base4 格式
            // name=resource/[name].[ext] 放在指定文件夹
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        ]
    }
}

module.exports = config