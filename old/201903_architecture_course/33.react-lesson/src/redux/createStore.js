export default function createStore(reducer, preloadState) {
  let state = preloadState;
  let getState = () => {
      return state;
  };
  // 调用dispatch 需要返还一个新的状态，覆盖掉来的状态
  let listeners = [];
  let dispatch = (action) => {
    if(typeof action !== 'object'){
        throw new Error('出错了');
    }
    if(typeof action.type ==='undefined'){
        throw new Error('没有type')
    }
    state = reducer(state,action);
    listeners.forEach(fn=>fn());
  };
  // 为了能取到默认的状态
  dispatch({type:'@@REDUX/INIT'})
  let subscribe = (fn) => {
    listeners.push(fn);
    let isSubscribed = true; // 防止多次调用
    return ()=>{
        if(isSubscribed){
            let index = listeners.indexOf(fn);
            listeners.splice(index,1);
            isSubscribed = false
        }
    }
  };
  return {
    getState,
    dispatch,
    subscribe
  };
}
