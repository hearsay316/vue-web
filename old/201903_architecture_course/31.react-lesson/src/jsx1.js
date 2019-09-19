//  入口文件 react  react-dom
import React from 'react'; // react基于jsx 语法的默认就需要全局的React变量

import ReactDOM from 'react-dom';

// jsx语法 可以帮我们创建 jsx元素 react元素
// js + xml javascript html (基于html可以写js语法)
// jsx和原生的html语法的区别
// jsx是语法糖 可以简化编写过程
// class => className
// let ele = <h1 className="aaa">
//     我很帅?
//     <span>很帅</span>
// </h1>
let ele = React.createElement(
    'h1',
    {className:'aaa'},
    '我很帅',
    React.createElement('span',null,'很帅')
);

console.log(ele); // vnode 虚拟dom

// 渲染内容 挂载到我们的html中root元素上
ReactDOM.render(ele,document.getElementById('root'));

// jsx 特性 基于babel来转化的  -》 React.createElement()


// jsx =>React.createElement() => 对象虚拟dom (就是用一个对象来描述真实dom) => 真实的节点 render