// 基于node语法的 module.exports 
// r.js requirejs  seajs grunt  gulp  fis3


// webpack rollup类库 语法es6的  parcel 
let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
// pages

// a.css 需要抽离一个
let pages = [{
    filename:'index.html',
    chunk:'index'
},{
    filename:'login.html',
    chunk:'login'
}].map((item)=>{ // webpack splitChunks 可以配置公共文件的
    return new HtmlWebpackPlugin({ // 配置输出的html格式
        filename:item.filename,
        title:'hello',
        minify:{
            removeAttributeQuotesd:true,
            collapseWhitespace:true,
        },
        chunks:[item.chunk], // 设置引用的代码块
        hash:true, // ? 后面的名字
        template:'./public/index.html'
    })
})
let plugins = [];
if(process.env.NODE_ENV === 'production'){ // 默认注入进来的
    let clean = new CleanWebpackPlugin({ // 清空目录插件 ，删除当前目录下的所有文件
        cleanOnceBeforeBuildPatterns: ['**/*'], // glob语法
    });
    plugins.push(clean);
}
module.exports = { // 配置对象
    entry:{ // 多入口
        index:'./src/index.js',
        login:'./src/login.js',
    },
    output:{
        // contentHash 可以给文件 打hash戳 保证文件的最新引用
        filename:'[name].[contentHash:6].js',
        path: path.resolve(__dirname,'dists') // 配置输出路径 必须是绝对路径
    },
    optimization:{ // 做优化的 ，默认js 会被内置的uglifyjs压缩
        minimizer:
        // 手动压缩 js 和css
        [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
        
    },
    module:{
        rules:[
            // 从右边像左边执行 从下到上 
            // css-loader 用来解析css语法的 
            // style-loader 把字符串插入到html中   
            // loader的写法有三种 数组 字符串 对象

            // 校验语法 eslint 
            // loader的顺序 前置loader   inline-loader   普通loader 后置loader
            // css-module
            {test:/\.css$/,use:'postcss-loader'},
            {
                test:/\.css$/,
                use:{
                    loader:'css-loader',
                    options:{
                        modules:true // 制作css模块话 rn 
                    }
                },enforce:'pre'
            },
            // node-sass sass-loader
            // less less-loader
            // stylus stylus-loader
            // 把css抽离成一个style.css的文件中  生产环境下
            // mini-css-exact-plugin
            {test:/\.css$/,use:MiniCssExtractPlugin.loader}
            // {test:/\.css$/,use:'style-loader',enforce:'post'},
        ]
    },
    // loader 做转化 翻译官  翻译用 
    // 每次打包时 先把目标的目录情况
    plugins:[ // 配置多个插件
        // 插件的执行顺序是从上到下
        // 默认执行 webpack webpack-dev-server --mode 
        ...plugins,
        ...pages,// 生出多个html页面
        new MiniCssExtractPlugin({
            filename:'css.css'
        })
    ],
    devServer:{// 开发的配置都在这里配置
        port:8089,
        compress:true, // 启用gzip压缩
        // open:true 
        contentBase:'./dists'
    }
}
// webpack-dev-server 这个服务 集成express 这个服务可以实现实时更新 热更新 