// 懒加载 vue /react  import() 动态导入
import React from 'react';
import ReactDom from 'react-dom';

let ele = <h1>hello123</h1>;
let dom = document.createElement('div');
dom.id = 'app';
document.body.appendChild(dom);
ReactDom.render(ele,dom);

// import moment from 'moment';
// import 'moment/locale/zh-cn'
// moment.locale('zh-CN')
// console.log(moment().format('MMMM Do YYYY'))

// let button = document.createElement('button');
// button.innerHTML= 'xxx'
// button.addEventListener('click', ()=>{
//     // require.ensure import  jsonp
//     // webpackRefetch webpackPreload 
//     // prefetch preload dns-prefetch defer async代码优化
//     import(/* webpackPrefetch:true */ './a.js').then(r=>{
//         console.log(r.add());
//     })
// });
// document.body.appendChild(button);