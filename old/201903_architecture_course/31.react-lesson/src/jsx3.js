import React from 'react';

import ReactDOM from 'react-dom';

// 可以渲染一个数组
// render 函数的参数只能渲染一个节点
// 如果希望渲染两个标签 那么需要用<></>  <React.Fragment>  包裹一下

// [].map()
// 如果数据有频繁的更新 尽量不要使用 index，如果单纯的渲染可以使用index

// 尽量用id 不用索引
let ele = ['香蕉','苹果','橘子'].map((fruit,index)=>{
    return <li key={index}>{fruit}</li>
});
// 如果渲染的有多个元素 ，要传递属性，不知道传递给哪个元素 
ReactDOM.render(ele,window.root); 



