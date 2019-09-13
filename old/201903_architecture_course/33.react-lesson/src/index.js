import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from './redux';
import counter from './store/actions/counter';
import store from './store'
// promiseify prosifyAll
let actions = bindActionCreators(counter,store.dispatch);
class Counter extends React.Component{
    state = {
        number:store.getState().counter.number
    }
    componentDidMount(){
        this.unsub = store.subscribe(()=>{
            this.setState({
                number:store.getState().counter.number
            })
        })
    }
    componentWillUnmount(){
        this.unsub(); // 取消订阅
    }
    add = ()=>{
        actions.add(1);
    }
    minus = ()=>{ // actionCreator
        actions.minus(1);
    }
    minus2 = ()=>{
        actions.minus(2);
    }
    render(){
        return <div>
            {this.state.number}
            <button onClick={this.add}>+</button>
            <button onClick={this.minus}>-</button>
            <button onClick={this.minus2}>-</button>
        </div>
    }
}
ReactDOM.render(<Counter></Counter>,window.root)