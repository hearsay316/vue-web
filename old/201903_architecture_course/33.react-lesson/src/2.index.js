// 组件通信
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

function shallow(prevObj,nextObj){
    if(prevObj === nextObj){
        return true
    }
    // 比较上一次的属性和本次的属性的个数，如果不一样直接更新即可
    let prevLen = Object.keys(prevObj).length;
    let nextLen = Object.keys(nextObj).length;
    if(prevLen !== nextLen){
        return false;
    }
    for(let key in prevObj){
        if(!nextObj.hasOwnProperty(key)){
            return false;
        }
        if(typeof prevObj[key] === 'object' &&  typeof nextObj[key] === 'object'){
            return shallow(prevObj[key],nextObj[key]);
        }
        if(prevObj[key] !== nextObj[key]){
            return false;
        }
    }
    return true;
}
// {number:undefind} {a:1}
class PureComponent extends Component{
    shouldComponentUpdate(nextProps,nextState){
        // 浅比较
        return !(shallow(this.props,nextProps) && shallow(this.state,nextState));
    }
}

// PureComponent 重写了shouldComponentUpdate
function Test(){
    console.log('child render')
    return <h1>hello</h1>
}
// PureComponent + memo 
function memo(Component){
    return class extends PureComponent{
        render(){
            return <Component></Component>
        }
    }
}
Test = memo(Test);
class Counter extends PureComponent { 
    state = {
        count:0
    }
    handleClick =()=>{
        // 对应的值，属性的个数
        this.setState({
            count:this.state.count+1,
        })
    }
    render() {
        return (
            <div>
                {this.state.count}
                <Test></Test>
                {/* 不合法的 */}
                <button onClick={this.handleClick}>点击增加</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter/>,window.root);

