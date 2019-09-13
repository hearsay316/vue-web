const HtmlWebpackPlugin = require('html-webpack-plugin');
let base = {
  performance:false,
  entry: {
    bundle: './src/index.js',
  },
  output: {
    filename: '[name].js',
  },
  // babel-loader -> @babel/core -> @babel/preset-env
  module: { // webpack 本身没有转化能力 babel
    rules: [
      {
        test:/\.ts$/,use:'ts-loader',
      },
      {
        test: /\.js$/, use: 'babel-loader',
      },
      {
        test:/\.(png|jpg|gif)$/,use:{
          loader:'url-loader',
          options:{
            limit: 8*1024  // 200m以下的转化成base64，如果超过了大小 依旧打包出来
          }
        }
      },
      {
        test:/\.html$/,use:'html-withimg-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
let dev = require('./webpack.dev.config');
let prod = require('./webpack.prod.config');
let merge = require('webpack-merge');
module.exports = (env) => {
  console.log(process.env.xxx); // 可以通过cross-env 来设置环境变量
  if(env.production){
    // 生产环境
    return merge(base,prod);
  }else{
    return merge(base,dev);
  }
}

