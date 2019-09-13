const HtmWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
module.exports = {
    mode:'development',
    entry:'./src/main.js',
    output:{
        filename:'bundle.js',
        chunkFilename:""
    },
    optimization:{
        usedExports:true // 在开发中可以看到哪个包被使用了，其余的没用的会标示
    },
    devServer:{
        hot:true // 我需要启动热更新
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // css-loader 内部自动支持热更新
                use:['style-loader','css-loader']
            },
            {test:/\.js$/,use:{
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-env']
                }
            }}
        ]
    },
    plugins:[
        new HtmWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
// 只有在生产环境下 会自动生效 uglifyjs
// tree-shaking 树的摇晃 消除没有用的代码的
// es6模块 import export 静态的
// node模块 require 动态的


