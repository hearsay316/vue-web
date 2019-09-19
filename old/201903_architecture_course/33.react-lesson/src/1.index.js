// 组件通信
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CommentContent from './components/CommentContent';
import CommentPannel from './components/CommentPannel'
import Total from './components/CommentTotal'
import CommentContext from './context'
// react 单向数据流 父-> 子
// 平级组件通信 通过共同的父亲  
// 子->父 通过属性 回调函数的方式
// react-dev-tool

// contextApi 去统一的上下文中取值
class Comment extends React.PureComponent {
    state = {
        comments:[],
        total:0
    }
    addComment = (comment)=>{
        this.setState({ // react中更新状态必须要返还一个新的数据
            comments:[...this.state.comments,comment]
        })
    }
    increment = () =>{
        this.setState({total:this.state.total+1})
    }
    render() {
        return (
            // 统一把数据传递一下
            <CommentContext.Provider value={{
                total:this.state.total,
                increment:this.increment
            }}>
                <CommentPannel addComment={this.addComment}></CommentPannel>
                <CommentContent  comments={this.state.comments}></CommentContent>
                <Total></Total>
            </CommentContext.Provider>
        )
    }
}

ReactDOM.render(<Comment/>,window.root);