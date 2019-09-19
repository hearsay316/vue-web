const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
let compiler = webpack(config); // 用webapck 把 配置传入产生编译对象
const app = express();

app.use(
  middleware(compiler)
);
app.get('/api/user',function(req,res){
    res.json({a:1})
})
app.listen(5000);

// webpack-dev-middleware