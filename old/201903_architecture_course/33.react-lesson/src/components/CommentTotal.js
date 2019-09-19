import React, { Component } from 'react';
import CommentContext from '../context';

function useContext(context){
    return context.Provider.value
}
function Total(){ // render props
    let context = useContext(CommentContext);
    return <h1>{context.total}</h1>
    // return <CommentContext.Consumer>
    //     {({total,increnemnt})=>{
    //         return <h1>总点赞数:{total}</h1>
    //     }}
    // </CommentContext.Consumer>
}
export default Total;

// 上下文的实现