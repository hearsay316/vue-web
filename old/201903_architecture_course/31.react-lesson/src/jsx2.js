import React from './react'; 
import ReactDOM from './react-dom';
// jsx 元素 是js 和 html的混写
// 如果是js语法 需要用 {} 包裹 如果是html<>   {}中的内容必须要有返回值 取值 三元
// 属性 className => class
// style属性 需要改写成 一个对象
// htmlFor => for
// 需要插入 html 需要使用 dangerouslyInnerHTML  xss攻击的问题
// 如果是事件的话 需要吧方法开头大写
// 注释单行必须换行 多行 需要用js的写法
let fn = () =>{
    alert(1);
}
// let e = '<span>123</span>'
// let ele = <h1 className="aaa" style={{color:'red',fontSize:'100px'}}>
//     <label htmlFor="username"></label>
//     <input id="username"/>
//     <span  dangerouslySetInnerHTML={{__html:e}}></span>
//     <button onMouseUp={fn}>点击确认</button>
// </h1>
let ele = React.createElement(
    'h1',
    {className:'aaa',a:1,b:2,style:{color:'red',fontSize:'100px'},onClick:fn},
    '我很帅？',
    React.createElement('span',null,'很帅')
);
ReactDOM.render(ele,window.root);

/**
 * 
 * {type:'h1',props:{className:'aaa',children:'我很帅'}}
 * 
 */

