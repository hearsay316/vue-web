// react 的组件开发的优点
// 拆分成一个个组件，组合起来使用，方便我们的维护，可以方便复用


import React from './react';
import ReactDOM from './react-dom';


// 普通的函数 1)首字母大写在react中就是一个组件
// 而是通过标签来调用
// 组件可能返回的就是jsx元素
// 组件可以和jsx元素混用

// 组件的数据来源 1） 组件自身的状态  2）使用的时候 通过组件传递参数
// 函数组件 1） 没有this 2) 生命周期 3） 没有状态 
function Welcome(props){
    return <h1>{props.name} {props.age}</h1>
}
let person = {
    name:'zf',
    age:10
}
/**
 * <div> 
    <Welcome name="zf" age="10"/>
    <Welcome {...person}/>
    <Welcome/>
    </div>
 */
ReactDOM.render(
        React.createElement('div',{},
            React.createElement(Welcome,{name: "zf",age:10}),React.createElement(Welcome,{name: "zf",age:10}),React.createElement(Welcome,{name: "zf",age:10})
),window.root)

// <Welcome name="zf" age="10"/> -> React.createElement()

// React.createElement(Welcome, {
//    name: "zf",
//    age: "10"
//  });
// {type:Function,props}
