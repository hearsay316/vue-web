function render(element,container){
    // 处理element的类型 element 有可能是 字符串 或者 数组
    if(typeof element === 'string' || typeof element === 'number'){
        return container.appendChild(document.createTextNode(element));
    }
    // 其他情况 就是element是由 type 和props组成
    let {type,props} = element; // props=> ['我很帅',{}]

    // type如果是一个函数 是一个react组件，让函数执行，那么就获取这个函数的返回结果，将结果渲染
    if(typeof type === 'function'){
        let returnElement
        if(type.isReactComponent){ // 这是一个类组件
            let instance = new type(props);
            instance.props = props; // 保证子类可以通过this获取到props属性
            returnElement = instance.render();
        }else{
            returnElement = type(props); // 返回的元素是一个虚拟dom type,props
            // return Element => {type:h1,props:{}}
            // {type:h1,props:{}}
        }
        type = returnElement.type;
        props = returnElement.props;
    }

    let ele = document.createElement(type);
    // 看一看属性中有没有children属性,如果有children属性
    // props 是一个对象
    for(let key in props){ // 属性的处理
        if(/on[A-Z][a-z]/.test(key)){ // body 通过事件委托的形式
            // 事件
            let type = key.slice(2).toLowerCase(); // onClick = click
            ele.addEventListener(type,props[key]);
        }else if(key === 'className'){
            ele.setAttribute('class',props[key]);
        }else if(key === 'style'){
            let obj = props[key]; // {color:'red',fontSize:100px}
            // cssText color:red;fontSize:100px  a=1&b=2 {a:1,b:2}
            let cssText = Object.keys(obj).map(key=>{
                return `${key}:${obj[key]}`
            }).join(';').replace(/([A-Z])/g,function(){
                return '-'+arguments[1].toLowerCase();
            });
            ele.style.cssText = cssText;
        }else if(key === 'children'){ // 有可能children是一个字符串还有可能是一个数组
            if(!Array.isArray(props.children)){
                // 如果不是数组 那就变成数组，可以后续迭代这个数组
                props.children = [props.children];
            }
            props.children.forEach(child => {
                // '我很帅' / {}
                // 递归将儿子节点渲染到页面中
                render(child,ele); // 我很帅 h1
            });
        }else{
            // 属性
            ele.setAttribute(key,props[key]);
        }
    }
    container.appendChild(ele);
}
export default {
    render
}