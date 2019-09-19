
import React, { Component,PureComponent } from 'react'
import ReactDOM,{render} from 'react-dom'
// 生命周期 从组件初始化 到组件的销毁经历的一系列过程
// 回调函数
// class PureComponent extends Component{
//     shouldComponentUpdate(nextProps, nextState) {
//         if(nextState.arr === this.state.arr) return false
//         return true
//     }
// }
class Sub extends PureComponent{
    componentWillReceiveProps(){ // 第一次不会执行
        console.log('componentWillReciveProps'); // 组件接受到新的属性
        // 此函数 中可以将收到的属性 标称状态 ..
        // 不应该调用setState
    }
    componentWillUnmount(){
        console.log('组件将要卸载')
        // 解除定时器  解除 事件订阅
    }
    componentWillMount(){
        console.log('child componentWillMount')
    }
    render(){
        return <h1>儿子</h1>
    }
    componentDidMount(){
        console.log('child componentDidMount')
    }
}
class Counter extends PureComponent {  // PureComponent 会重写 shouldComponentUpdate方法
    constructor(){
        super();
        this.state = {arr:[]}
    }
    componentWillMount() {  
        console.log('parent componentWillMount')
    }
    handleClick=()=>{ 
        // 我们在优化的时候 一般使用shouldComponentUpdate
        // 调用setState 必须要返回一个全新的状态
        this.setState({arr:[...this.state.arr,'hello']})
    }
    componentWillUpdate(){
        console.log('parent componentWillUpdate')
    }   
    componentDidUpdate(){
        console.log('parent componentDidUpdate')
    }
    render() {
        console.log('parent render'); 
        return (
            <div>
                {this.state.arr.map((item,key)=><li key={key}>{item}</li>)} 
                <button onClick={this.handleClick}>点我</button>
                {this.state.arr.length ==2 ?null :<Sub arr={this.state.arr}></Sub>}
            </div>
        )
    }
    componentDidMount(){ 
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