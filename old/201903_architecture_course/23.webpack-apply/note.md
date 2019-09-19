
// @babel/preset-env buitd:useage 帮你解析promise set map 就是放到全局上
// @babel/plugin-transform-runtime @babel/runtime 提取公共代码
// 如果配置了corejs  当前的api 不会放倒全局上

// @babel/polyfill 废弃了
// 写类库 用下面这种

// eslint tslint
// eslint eslint-loader

// npx eslint --init eslint的配置文件


// 配置ts typescript ts-loader
// npx typescript --init 配置文件
// tslint



// 前端 -》 代理 -》 我的服务器  已经有了自己服务端了
// 前端 -》 前端服务器  没有服务器 mock数据
// 在后端启动webpack  做服务端渲染 服务端也是你的

// mockjs

// 在服务端请求数据 直接把拼装好的页面 

// create-react-app react-script


// 如何区分环境

// start:webpack --config './build/webpack.dev.config.js'
// start:webpack --env.production 
// 如果传入的是--env.production 需要导出一个函数
// webpack-merge 合并对象


// definePlugin 可以设置前端的环境变量
// process.env.NODE_ENV production / development 可以在前端和服务端都能获取
// cross-env 来自定义设置 只能在webpack中使用

// 处理图片
file-loader 拷贝的作用 url-loader
