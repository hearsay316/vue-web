
import React, { Component,PureComponent } from 'react'
import ReactDOM,{render} from 'react-dom'

class Sub extends PureComponent{
    state = {s:0}
    static getDerivedStateFromProps(){
        console.log('获取衍生的状态')
        return {a:0}
    }
    // componentWillReceiveProps(){ 
    //     console.log('componentWillReciveProps'); 
    // }
    componentWillUnmount(){
        console.log('组件将要卸载')
    }
    // componentWillMount(){
    //     console.log('child componentWillMount')
    // }
    render(){
        return <h1>儿子 {this.state.s} {this.state.a}</h1>
    }
    componentDidMount(){
        console.log('child componentDidMount')
    }
}
function Test(){ // 函数式组件的PureCompoment
    console.log('123')
    //null.toString();
    return <h1>jsx</h1>
}
Test = React.memo(Test)
class Counter extends PureComponent {  
    constructor(){
        super();
        this.state = {arr:[],err:false}
    }
    // componentWillMount() {  
    //     console.log('parent componentWillMount')
    // }
    handleClick=()=>{ 
        this.setState({arr:[...this.state.arr,'hello']})
    }
    getSnapshotBeforeUpdate(){ // 如果有此声明周期 必须要执行componentDidUpdate
        console.log('getSnapShotBeforeUpdate')
        return 100;
    }
    // componentWillUpdate(){
    //     console.log('parent componentWillUpdate')
    // }   
    componentDidUpdate(oldProps,oldState,BeforeUpdateResult){
        console.log(oldProps,oldState,BeforeUpdateResult)
        console.log('parent componentDidUpdate')
    }
    static getDerivedStateFromError(){
        return {
            err:true
        }
    }
    render() {
        console.log('parent render'); 
        if(this.state.err){
            return <h1>出错了</h1>
        }
        return (
            <div>
                {this.state.arr.map((item,key)=><li key={key}>{item}</li>)} 
                <button onClick={this.handleClick}>点我</button>
                {this.state.arr.length ==2 ?null :<Sub arr={this.state.arr}></Sub>}
                <Test></Test>
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