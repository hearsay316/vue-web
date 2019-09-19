import React,{Component} from 'react';
import ReactDOM from 'react-dom';

// 外部可以传入数据给组件 组件可以使用
// 单向数据流

// 函数组件 没有this 没有状态
class Counter extends Component{
    // 1) bind（this）
    // 2) 箭头函数方式
    // 3) 在构造函数中绑定this
    // 4) 使用es7 箭头函数
    constructor(props){
        super();
        this.state = {
            number:0
        }
        // this.handleClick = this.handleClick.bind(this);
    }
    handleClick =()=>{
       // 状态不能直接修改, 调用setState之后 页面可以刷新
       // react 说： setState 不保证同步执行的 （异步） promise 事务实现
       // 内部可以给setState传递一个函数
        this.setState({number:this.state.number+1},()=>{
            this.setState({number:this.state.number+1},()=>{

            });
        });
      // -----
      //    this.setState(prevState=>({number:prevState.number+1}));
      //    this.setState(prevState=>({number:prevState.number+1}));
    }
    render(){
        return <>
            {this.props.name} {this.state.number}
            <button onClick={this.handleClick}>点击增加</button>
        </>
    }
}

ReactDOM.render(<Counter name="计数器" />, document.getElementById('root'));
