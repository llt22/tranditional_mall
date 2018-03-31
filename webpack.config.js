var webpack = require('webpack')
var ExtractTextPlugin   = require('extract-text-webpack-plugin')
var path = require('path')

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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
        ]
    }
}

module.exports = config