import React from 'react';
import ReactDOM from 'react-dom';
function Test(){
    console.log('test ~~~ render');
    return <h1>hello</h1>
}
Test = React.memo(Test); // 函数组件中的PureComponent
class SubCounter extends React.PureComponent{
    // 父组件传递给子组件的一个dom元素
    state = {
        n:10
    }
    componentWillReceiveProps(newProps){ // 第一次不会执行
        console.log(newProps);
        console.log('child newProps')
        this.setState({n:newProps.n}); // 把属性演变成自己的状态
    }
    componentWillMount(){
        console.log('child willMount')
    }
    render(){
        console.log('child render')
        return <div>子计数器 {this.state.n}</div>
    }
    componentDidMount(){ // ajax 获取操作
        console.log('child didMount')
    }
    componentWillUnmount(){ // 组件将要卸载
        // 他的主要作用就是 取消定时器 、 取消时事件绑定
        console.log('componentWillUnmount')
    }
}
// 组件的重新渲染 状态变化会重新 属性
// PureComponent 帮我们重写了shouldComponentUpdate
class Counter extends React.Component{
    // constructor(props){ // 同步操作
    //     super(props); // this.props
    //     this.state = {
    //         number:10
    //     }
    // }
    state = { // this.state
        number:10
    }
    componentWillMount(){ // 后续react可能会中断渲染，有可能会执行多次
        console.log('willMount')
      //  this.setState({number:10});
    }
    // 可以做react优化使用
    shouldComponentUpdate(nextProps,nextState){ // 阻止组件是否重新渲染
        if(nextState.number === this.state.number){
            return false
        }
        console.log('shouldComponentUpdate');
        return true; //默认情况下 返回true 表示始终更新
    }
    componentWillUpdate(){ // 这里可以调用setState
        console.log('willUpdate')
    }
    componentDidUpdate(){ // 这里不能调用setState
        console.log('didUpdate');
    }
    handleClick = () =>{
        // this.forceUpdate(); // 强制更新组件
        this.setState({ // 默认调用setState就会更新视图不管数据有没有变化
            number:this.state.number+1
        })
    }
    render(){
        console.log('render');
        return <div>
            {this.state.number%2?<SubCounter n={this.state.number}></SubCounter>:null}
            <Test></Test>
            计数器 {this.state.number}
            <button onClick={this.handleClick}>点击增加</button>
        </div>
    }
    componentDidMount(){ // 获取到真实的dom元素
        console.log('didMount')
    }
}
ReactDOM.render(<Counter></Counter>,window.root)

// hook 

// componentWillMount
// render 
// componentDildMount

// shouldComponentUpdate
// componentWillUpdate
// render
// componentDidUpdate

// componentWillReceiveProps
// shouldComponentUpdate
// componentWillUpdate
// render
// componentDidUpdate

// componentWillUnmount