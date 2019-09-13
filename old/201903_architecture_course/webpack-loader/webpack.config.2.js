let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js'
    },
    devtool:'source-map', // cheap-module-source-map
    resolveLoader:{ 
      modules:[path.resolve(__dirname,'node_modules'),path.resolve(__dirname,'loaders')],
      alias:{
          b:path.resolve(__dirname,'loaders/b.js')
      }
    },
    module:{
        rules:[ 
            {
                exclude:/node_modules/, 
                test:/\.js$/,
                // babel-loader @babel/core @babel/preset-env
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.html$/,
                use:{ 
                    loader:'html-minify-loader',
                    options:{ // 属性校验 需要用到 schema-utils
                        comments:true
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./template/index.html' // require('./index.html')  loader:{test:/.html/,use:'xxx'}
        })
    ]
}