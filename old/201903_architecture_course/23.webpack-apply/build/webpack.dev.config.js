let webpack = require('webpack');
module.exports = {
    mode: 'development',
    devServer: {
        before(app){ // express 中的app
          app.get('/api/user',function(req,res){
            res.json({a:1,b:2})
          })
        },
        // proxy:{ // 内置的express 有代理的功能 http-proxy-middleware
        //   '/api':{
        //     target:'http://localhost:3000',
        //     pathRewrite:{
        //       '/api':''
        //     },
        //     changeOrigin: true // 改变主机的host名字
        //   }
        // },
        overlay: true, // 默认都不开启
    },
    module:{
        rules:[
            //   {
            //     test: /\.js$/, use: 'eslint-loader', enforce: 'pre',
            //   },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: 'style-loader',
                    options: {
                      insertAt: 'top',
                    },
                  },
                  { // @语法引入了css文件这个文件可能是sass
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                    },
                  },
                  'sass-loader',
                ],
            },
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            // 字符串必须要包两层
            'production':JSON.stringify('development'),
        })
    ]
    
}