// redux store => createStore  
// reducer 自己定义的
// store.getState() 获取store中的状态
// store.dispatch() action = {type}
// store.subscribe() 订阅
import {createStore} from './redux';
window.root.innerHTML = `
    <div id="content"></div>
    <button id="add">增加</button>
    <button id="minus">减少</button>
`
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
let initialState = {number:0}; // 默认状态是0
function reducer(state=initialState,action){ // reducer 需要返还一个新的状态，覆盖掉老的状态
    switch(action.type){ // action = {type:'INCREMENT',count:5}
        case INCREMENT:
         return {number:state.number+action.count};
        case DECREMENT:
         return {number:state.number-action.count};
        default:
         return state;
    }
}
let store = createStore(reducer);
function render(){
    window.content.innerHTML = store.getState().number;
}
render();
let unsub = store.subscribe(render);
window.add.addEventListener('click',()=>{
    store.dispatch({type:INCREMENT,count:5});
})
window.minus.addEventListener('click',()=>{
    store.dispatch({type:DECREMENT,count:3});
    unsub();
    unsub();
})