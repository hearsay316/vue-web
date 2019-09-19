import React from './react';
import ReactDOM from './react-dom';

// 内部react 会去实例化这个组件
class Welcome extends React.Component {
    constructor(props){ // super 指代的是谁 指代的是父类
       super(props); // this.props = props;
       console.log(this.props); // 父类会初始化
    }
    render(){
        return  <h1>{this.props.name} {this.props.age}</h1>
    }
}
let person = {
    name:'zf',
    age:10
}

ReactDOM.render(
        React.createElement('div',{},
            React.createElement(Welcome,{name: "zf",age:10}),React.createElement(Welcome,{name: "zf",age:10}),React.createElement(Welcome,{name: "zf",age:10})
),window.root)
