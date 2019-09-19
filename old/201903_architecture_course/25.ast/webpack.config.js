
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    entry:{
        a:'./src/a.js',
        // b:'./src/b.js',
    },
    output:{
        filename:'[name].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.css/,
                use:['style-loader','css-loader']
            },
            {
                test:/woff|svg|eot|ttf/,
                use:'file-loader'
            },
            {
                test:/\.js$/,
                use:{
                loader:'babel-loader',
                options:{
                    plugins:[
                        '@babel/plugin-syntax-dynamic-import'
                    ]
                }
            }}      
        ]
    },
    resolve:{ // 怎么解析的
        // alias:{
        //     '@':path.resolve(__dirname,'src/q')
        // }
        // extensions:['.js','.css','json','jsx'],// 扩展的查找顺序
        //mainFiles:['index','main'], // 入口文件
        // mainFields:['style','main'] // package.json main 找style
        // 默认查找的第三方模块查找路径
        // modules:[path.resolve(__dirname,'node_modules'),'xxx']
    },
    optimization:{
        splitChunks:{
            // async  initial  all
            chunks: "all", // 默认只分割异步的代码块 import()
            // minSize: 30000,
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: '~',
            // name: true,
            cacheGroups: {
                // react: {
                //     test: /[\\/]node_modules[\\/]react|react-dom/,
                //     priority: -10
                // },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                common: {  
                        filename:'common.js',
                        minSize:0,
                        minChunks: 2,
                        priority: -20,
                    }
                }
        }
    },
    plugins:[
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin()
    ],
    // webpack打包js es6 -》 es5
    devtool:'source-map' //开发时可以使用 cheap-module-eval-source-map cheap-module-source-map  cheap-module不包含列的  
    //https://www.webpackjs.com/configuration/devtool/ 


    // source-map 都包含 但是是独立文件
}
// commonChunkPlugin -> splitChunks
// 代码分割 1） 可以实现代码的公用  2） 实现分割第三方模块
// jquery
// index.html a.js -> 
// login.html b.js  -> jquery  304
// 上线的时候需要

// 多线程打包 项目比较大 单线程-》 子进程 2个  happypack

// 最常见的优化手段 最有效的

// 代码分割 cdn  dllPlugin splitChunks happypack