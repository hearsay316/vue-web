// 组件通信

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// ref 引用 ref的使用可以传递一个函数

class CommentPannel extends Component{
    handleSubmit = (e)=>{
        e.preventDefault();
        console.log(this.username.value,this.content.value)
    }
    render(){
        return <div>
            <form onSubmit={this.handleSubmit}>
                用户名<input ref={(input)=>{this.username=input}}></input>
                内容<input ref={(input)=>{this.content=input}}></input>
                <button>提交</button>
            </form>
        </div>
    }
}
function createRef(){
    return {current:null}
}
function Test(props,ref1){
    return <h1 ref={ref1}>test~~~~</h1>
}
function forwardRef(fn){ // 转发ref 主要的功能就是把属性传递给当前组件
    return function(props){ 
        console.log(props.ref);
        return fn(props,props.ref1);
    }
}
Test = React.forwardRef(Test)
class Comment extends Component {
    xxx = createRef(); // 16.3 新提供的api 
    t = createRef();
    handleClick =(e)=>{
        console.log(this.xxx.current);
        console.log(this.t.current)
    }
    render() {
        return (
            <div>
                <Test ref={this.t} ></Test>
                <CommentPannel ref={this.xxx}></CommentPannel>
                <button onClick={this.handleClick}>点击</button>
            </div>
        )
    }
}

ReactDOM.render(<Comment/>,window.root);