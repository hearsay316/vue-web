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
    module:{
        rules:[
            {
                // 当用户引用了jquery的时候 会触发此loader，暴露在window上
                test:require.resolve('jquery'),
                use:{
                    loader:'expose-loader',
                    options:'$'
                }
            },
            {
                test:/\.css$/,
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
    externals:{ // cdn
        'jquery':'$'
    },
    plugins:[
        // 在模块中提供一个变量,这个$不能放在window上
        // new webpack.ProvidePlugin({ 注入变量
        //     '$':'jquery' 
        // }),
        new HtmWebpackPlugin(),
        new AddAssetHtmlCdnWebpackPlugin(true,{
            'jquery': " https://cdn.bootcss.com/jquery/3.4.0/jquery.js"
        })
    ]
}
