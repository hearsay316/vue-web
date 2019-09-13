#! /usr/bin/env node
// 入口文件
// 读取用户传递的参数 --mode 

// 刚开始 负责用户执行命令时所带的参数，读取用户的配置文件

// commander - yargs
let path = require('path');
// 获取配置文件的路径
let configPath = path.resolve('webpack.config.js');
let config = require(configPath);
// webpack-cli -> webpack

let Compiler = require('../src/Compiler');
let compiler = new Compiler(config);
// 开始打包
compiler.run();