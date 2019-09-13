const HtmWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
module.exports = {
    mode:'development',
    entry:'./src/main.js',
    output:{
        filename:'bundle.js', // 同步代码
        chunkFilename:"[name].min.js" // 异步代码
    }, 
    optimization:{
        usedExports:true 
    },
    devServer:{
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // css-loader 内部自动支持热更新
                use:['style-loader','css-loader']
            },
            {test:/\.js$/,use:{
                exclude:/node_modules/,
                include:path.resolve(__dirname,'src'),
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-env','@babel/preset-react'],
                    plugins:['@babel/plugin-syntax-dynamic-import']
                }
            }}
        ]
    },
    plugins:[
        new HtmWebpackPlugin(),
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'dist/manifest.json')
        }), 
        // 忽略掉某个包中的引用  ContextReplacementPlugin
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new AddAssetHtmlPlugin({ filepath: './dist/react.dll.js' }),
    ]
}



