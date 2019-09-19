import React, { Component } from 'react'
import CommentItem from './CommentItem'

export default class CommentContent extends Component{
    render(){
        return this.props.comments.map((comment,key)=>(
            <CommentItem  key={key} comment={comment}></CommentItem>
        ))
    }
}