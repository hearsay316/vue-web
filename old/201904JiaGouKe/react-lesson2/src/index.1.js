// 组件的数据来源 
// 属性 外界提供的
// state 组件中自己的setState原理 
import React, { Component } from 'react'
import ReactDOM,{render} from 'react-dom'
// 常见的解决this的方式
class Counter extends Component { // setState
    // state = {number:0}
    constructor(){
        super();
        this.state = {number:0}
        // this.handleClick = this.handleClick.bind(this);
    }
    handleClick=(a)=>{ // 如果使用bind的话可以传递参数
        // 不要直接去更改状态
        // setState 是同步的还是一部的
        // this.setState({number:this.state.number+1 },function(){
        //     this.setState({number:this.state.number+1})
        // });

        // setState如果有状态依赖 那么可以使用函数的形式
        this.setState((prevState)=>({number:prevState.number+1}))
        this.setState((prevState)=>({number:prevState.number+1}))
        // console.log(this.state)
        // this.setState({number:this.state.number+1 });
        // console.log(this.state)
        // setTimeout(() => {
        //     this.setState({number:this.state.number+1 });
        //     console.log(this.state);
        //     this.setState({number:this.state.number+1 });
        //     console.log(this.state);
        // }, 1000);
    }
    render() {
        return (
            <div>
                {this.state.number} {this.state.a}
                <button onClick={this.handleClick.bind(this,1)}>点我</button>
            </div>
        )
    }
}

render(<Counter></Counter>,window.root);

// class A {
//     a(){
//         console.log(this)
//     }
// }
// let a = new A();
// let fn = a.a
// fn()