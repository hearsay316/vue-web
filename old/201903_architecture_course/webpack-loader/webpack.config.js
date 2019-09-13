let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
class My{
    apply(compiler){
        compiler.hooks.done.tap('MyPlugin',function(){
            console.log('done完成')
        });
        compiler.hooks.afterEmit.tap('MyPlugin',function(){
            console.log('after')
        });
    }
}
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
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {test:/\.png/,use:{
                loader:'url-loader',
                options:{
                    limit:300*1000*1024
                }
            }},
            {
                test:/\.html/,
                use:{
                    loader:'html-layout-loader',
                    options:{
                        layout:path.resolve(__dirname,'template/index.html'),
                        reg:/\{\{content\}\}/
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'Home.html',
            template:'./template/Home.html'
        }),
        new HtmlWebpackPlugin({
            filename:'Login.html',
            template:'./template/Login.html' 
        }),
        new My()
    ]
}