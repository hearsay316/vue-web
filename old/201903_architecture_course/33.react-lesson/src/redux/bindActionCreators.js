function bindActionCreater(action,dispatch){
    return (...args)=>{
        // store.dispatch(add(123));  add(123)
        dispatch(action(...args))
    }
}
function bindActionCreators(action,dispatch){
    if(typeof action === 'function'){
        return bindActionCreater(action,dispatch);
    }
    let actions = {};
    for(let key in action){
        actions[key] = bindActionCreater(action[key],dispatch);
    }
    return actions;
}

export default bindActionCreators