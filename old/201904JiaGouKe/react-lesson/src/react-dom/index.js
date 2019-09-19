

function render(eleObj,container){
    if(typeof eleObj === 'number' || typeof eleObj === 'string'){
        return container.appendChild(document.createTextNode(eleObj))
    }
   
    let {type,props} = eleObj;
    if(typeof type === 'function'){ // 是组件
        // 如果是函数就让这个函数执行，并且传入属性将返回结果进行渲染
        let returnEle
        if(type.isClassComponent){
            let instance = new type(props);
            instance.props = props; // 虽然你没有将属性传递给父亲 但是可以调用this.props获取属性
            returnEle = instance.render();
        
        }else{
            returnEle = type(props); // clock({value:1});
        }
        return render(returnEle,container);
    }
    let ele = document.createElement(type);

    // 循环子节点
    if(!Array.isArray(props.children)){
        props.children = [props.children];
    }
    // 深度优先
    for(let key in props){ // className
        if(/on[A-Z][a-z]+/.test(key)){
            // 事件 onClick => onclick => click
            ele.addEventListener(key.toLocaleLowerCase().slice(2),props[key]);
        }else if(key === 'style'){
          let styleObj = props[key];  // {color:'red',fontSize:100px}
          // color:red;font-size:100px  // [color:red,font-size:100px]
          let arr = [];
         for(let key in styleObj){ // 处理样式问题
             let value = styleObj[key];
             key = key.replace(/([A-Z])/,function(){
                 return '-'+arguments[1].toLowerCase();
             });
            arr.push(`${key}:${value}`)
         }
          ele.style.cssText = arr.join(';')
        }else  if(key === 'dangerouslySetInnerHTML'){
           let {__html} = props[key];
           ele.innerHTML = __html;
        }else if(key === 'className'){
            ele.setAttribute('class',props[key]);
        }else if(key === 'children'){
            props.children.forEach(child => {
                render(child,ele);
            });
            container.appendChild(ele);
        }
        else{
            ele.setAttribute(key,props[key]);
        }
    }
}

export default {
    render
}