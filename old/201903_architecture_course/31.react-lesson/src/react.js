
class Component{
    static isReactComponent = true;
    constructor(props){
        this.props = props; // 如果子类传递了props 会出事化这个props对象
    }
}
function ReactElement(type,props){
    return {type,props}
}
// config 我们不希望直接更改config参数
function createElement(type,config={},children){
    let props = {};
    let propName;
    for(propName in config){
        props[propName] = config[propName];
    }
    // children 是在这个props对象中 可能是数组 可能出一个值,还可能是一个对象
    // 当前儿子节点的个数
    let childrenLength = arguments.length - 2;
    if(childrenLength === 1){
        props.children = children;
    }else if(childrenLength>1){
        props.children = Array.from(arguments).slice(2);
    }
    return ReactElement(type,props);
}
// 实现了一个虚拟dom 他可以描述真实dom的样子
export default {
    createElement,
    Component
}