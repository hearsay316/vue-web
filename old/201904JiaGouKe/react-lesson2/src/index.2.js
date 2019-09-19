
import React, { Component } from 'react'
import ReactDOM,{render} from 'react-dom'
// 生命周期 从组件初始化 到组件的销毁经历的一系列过程
// 回调函数
class Counter extends Component { 
    constructor(){
        super();
        this.state = {number:0,n:localStorage.getItem('A')}
    }
    componentWillMount() {  
        // let  counter = new Counter() 
        // counter.componentWillMount&& counter.componentWillMount()
        // counter.render();
        // counter.componentDidMount &&  counter.componentDidMount()
        console.log('parent componentWillMount')
    }
    handleClick=()=>{ 
        this.setState({number:this.state.number+1})
    }
    // react优化   属性或者状态变化 都会执行此方法
    shouldComponentUpdate(newProps,newState){
        if(newState.number === this.state.number){
            return false
        }
        return true;
    }
    render() {
        console.log('parent render'); // setState回导致死循环
        return (
            <div>
                {this.state.number}  {this.state.n}
                <button onClick={this.handleClick}>点我</button>
            </div>
        )
    }
    componentDidMount(){ // ajax  将localStorage中的内容 取出来作为组件的状态
        console.log('parent compomentDidmount')
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