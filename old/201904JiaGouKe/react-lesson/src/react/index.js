
// 创建虚拟节点
// {type,props}
function createElement(type,config={},children){// Clock,{value:1}
    // 纯函数 不能改变入参数
    let props = {};
    let propName;
    for(propName in config){
        props[propName] = config[propName];
    }
    // 判断当前儿子的个数
    let args = Array.from(arguments).slice(2);
    if(args.length === 1){
        props.children = children
    }else{
        props.children = args
    }
    return {
        type,props
    } 
}
class Component { // 类组件为了标示自己是类 
    constructor(props){
        this.props = props;
    }   
    static isClassComponent = true;
    // static get isClassComponent(){
    //     return true
    // }
}
// 虚拟dom的创建
export default {
    createElement,
    Component
}