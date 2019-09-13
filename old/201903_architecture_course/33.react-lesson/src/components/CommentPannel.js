import React, { Component } from 'react'
// ref 引用 ref的使用可以传递一个函数 可以直接获取
// 还可以通过 createRef方法来创建 current属性上

// 非受控组件 input （state）
export default class CommentPannel extends Component{
    state = {
        username:'',
        content:''
    }
    handleSubmit =(e)=>{
        e.preventDefault();
        this.props.addComment(this.state);
    }
    handleChange(e,key){
        this.setState({
            [key]:e.target.value
        })
    }
    render(){
        return <div>
            <form onSubmit={this.handleSubmit}>
                用户名<input value={this.state.username} onChange={(e)=>this.handleChange(e,'username')} ></input>
                内容<input value={this.state.content} onChange={(e)=>this.handleChange(e,'content')}></input>
                <button>提交</button>
            </form>
        </div>
    }
}