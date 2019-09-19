// 使用react react react库，react-dom  渲染我们的react中的元素的
import React from "./react";
import ReactDOM from "./react-dom";
// jsx 语法 默认会使用大写React 这个变量
// jsx js + xml(html)

// html 里区别：  遇到js变量需要用{} 来包裹
// class => className
// style => 'color:red;background:red;font-size:20px'
// label for => htmlFor
// innerHtml => dangerouslySetInnerHTML v-html xss攻击 可以信赖的内容
// 注视只能采用 js注释
// {} 取值放js代码 必须要有返回值
// 事件 事件名 on大写开头的名字  后面根的是方法

// let msg = `<img src='xxx' onerror="alert(document.cookie)"/>`;
let handler = function(){alert(1)}
let msg = '<h1>hello</h1>'
// let ele = (
//   <div
//    onClick={handler}
//    className="xxx" 
//    style={{ color: "red", fontSize: "100px" }}
//    dangerouslySetInnerHTML={{__html:msg}}
//    >
//     {/* {true?'1':void 0}
//      {(function(){return 199})()} */}
//     {/* {msg}
//     <span>我很帅</span>
//     <label htmlFor="username">用户名</label>
//     <input type="text" id="username" /> */
//     }
//   </div>
// );
// 内部用的是babel 来进行转化的
let ele = React.createElement("h1", {
    className: "xxx",
    id:'aaa',
    onClick:handler,
    // dangerouslySetInnerHTML:{__html:'hello'},
    style:{color:'red',fontSize:'100px'}
  }, "hello",React.createElement('span',{},'我很帅'));
// babel 将jsx语法转化成 我们这样的语法React.createElement
// React.createElement => 返回的是虚拟dom
// {
//     type:'h1',
//     props:{
//         className: "xxx",
//         children:['hello',{type:'span',props:{children:'我很帅'}]
//     }
// }
// render方法将虚拟dom 渲染到dom元素上
ReactDOM.render(ele, document.getElementById("root"));
