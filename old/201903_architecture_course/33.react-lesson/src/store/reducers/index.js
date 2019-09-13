import counter from './counter.js'; // {number:0};
import counter1 from './counter1.js'; // {number:0}
// import {combineReducers} from 'redux';
// {counter:{number:0},counter1:{number:0}}

function combineReducers(reducers){
    return (state={},action)=>{ // reducer
        let obj = {}
        for(let key in reducers){ // 把每个reducer 都执行一下将返回值赋予给当前的reducer 作为默认状态
            // obj[counter1] = {number:0}
            obj[key] = reducers[key](state[key],action);
        };
        return obj;
    }
}
export default combineReducers({
    counter,
    counter1
})