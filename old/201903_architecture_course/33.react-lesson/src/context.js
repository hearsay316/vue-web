import React from 'react';
// Provider 提供者  Consumer 消费者

// 组件特点 独立的
function createContext(){
    class Provider extends React.Component{
        constructor(props){
            super();
            this.state = {}
            Provider.value = props.value; // {total,increnet}
        }
        static getDerivedStateFromProps(newProps){
            Provider.value = newProps.value;
            return {}
        }
        render(){
            return this.props.children
        }
    }
    class Consumer extends React.Component{
        render(){
            return this.props.children(Provider.value);
        }
    }
    return {Provider,Consumer}
}
let CommentContext = createContext();
// let MyContext = React.createContext({name:'zf'}); // Provider value
export default CommentContext

// export {MyContext}