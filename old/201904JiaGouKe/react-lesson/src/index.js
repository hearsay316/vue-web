// 组件： 方便复用 为了提高维护性 
// 在react中 组件就是一个函数 批量产生同样的内容

// 组件可以和jsx混用 组件名字必须大写

import React from 'react';
import ReactDOM from 'react-dom';

// 函数组件没有this属性 没有声明周期 
function MyH1(props){
    return  <h1> <p>hello</p> {props.value}</h1>
}
// 组件数据的来源有两个 1） 属性  2) 自身的状态
// 函数组件 React Hook  类组件
// jsx一旦创建出来了就能不能修改了
// function Clock(props){
//     return <h1>{new Date().toString()}</h1>
// }


// hook 特点 不用操心this  也有了状态 没有了声明周期
// hook 函数组件
// setstate原理
// 其它用法


class Clock extends React.Component{
    constructor(props){
        super(); // React.Component 父类 会把子类的属性props 放到this上
       
        this.state = {
            date:new Date().toString()
        }
    }
    // 我们以后都使用react hook hook 可以保证逻辑不用分散单每个声明周期中
    componentDidMount(){ // 当前组件假爱完成
        setInterval(()=>{
            this.setState({ // 更新状态 并且重新渲染视图
                date:new Date().toString()
            })
        },1000)
    }
    render(){
        return <h1>{this.state.date} {this.props.value}</h1>
    }
}

// react 会做diff   类组件 有状态可直接设置 （ hook）

// React.createElement(Clock, {
//     value: "1"
//   });
// <Clock value="1"></Clock>
ReactDOM.render(<div>
    {React.createElement(Clock,{value:1})}
</div>,window.root);
