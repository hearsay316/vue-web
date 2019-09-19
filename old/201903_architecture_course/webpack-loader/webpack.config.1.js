let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
// loader  引入的四种方式 1) 绝对路径
// 2） alias 别名  3） loader查找顺序   4）第三方引用方式

// loader的特点 职责单一 每个都有自己的功能，而且组合使用
// style-loader css-loader background:url less-loader  sass-loader
// loader 不能有状态 loader中由两部分组成
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js'
    },
    resolveLoader:{ // 配置loader的接续规则
      modules:[path.resolve(__dirname,'node_modules'),path.resolve(__dirname,'loaders')],
      alias:{
          b:path.resolve(__dirname,'loaders/b.js')
      }
    },
    module:{
        rules:[ // loader的类型 pre + normal + inline + post
            {
                exclude:/node_modules/, // 一定要加exclude
                test:/\.js$/,
                use:path.resolve(__dirname,'loaders/a.js'),
                enforce:'pre'
            },
            {
                exclude:/node_modules/, // 一定要加exclude
                test:/\.js$/,
                use:'b'
            },
            {
                exclude:/node_modules/, // 一定要加exclude
                test:/\.js$/,
                use:'c.js',
                enforce:'post'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./template/index.html'
        })
    ]
}