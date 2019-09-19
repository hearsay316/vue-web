import React from "react";
import ReactDOM from "react-dom";

// react可以渲染数组
// <> </> 和 React.Fragment

// let ele = <React.Fragment>
//  <div>1</div> <div>2</div>
// </React.Fragment>


// {} 三元表达式
// 数组的map
/**
<li key=x>香蕉</li>
<li key=p>苹果</li>
<li key=j>橘子</li>

<li key=j>橘子</li>
<li key=p>苹果</li>
<li key=x>香蕉</li>
*/
// 循环时尽量不要使用key属性  id

let ele = ['香蕉','苹果','橘子']
let maps = ele.map((item,index)=>{
  return <li key={index}>{item}</li>
})
// maps [li,li,li]
ReactDOM.render(maps, document.getElementById("root"));

// 组件