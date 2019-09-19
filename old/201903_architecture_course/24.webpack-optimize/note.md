## 暴露变量的三种方式
- webpack.ProvidePlugin 不会暴露到全局上
- expose-loader 帮你把一些变量放到window上
- externals

如果使用cdn的加载方式 引用的时候不希望打包，最好把他表示成外部变量
## tree-shaking （只对es6语法有效果）
- sideEffects:[] 要使用哪些副作用

## scope-hosting
```
let a = 1;
let b= 2;
let c = a+b;
console.log(c);
```

> 把变量进行压缩，去提取模块中的导出的变量

## 热更新
## 懒加载
## ingorePlugin
## dllPlugin 动态链接库插件
- 我可以先把代码打包好放在那里
- 只在开发时使用 为了节约构建时间

> 为了构建的时候 不用重新去构建第三方库

先产生mainfest.json （name） 和一个js文件全局变量名字一致
引用的时候引用manifest.json 会先去上面查找，找到后 加载对用的内容

## include/exclude
## splitChunks 快速的拆分很多个包 commonChunkPlugin
## vue-cli  create-react-app
## splitChunks 抽离第三方模块
## resolve 可以减少查找文件的范围 只找当前目录下的
## 多线程打包 构建多线程会导致速度变慢

> ast的实现  上手实现一个webpack

## 实现loader和plugin