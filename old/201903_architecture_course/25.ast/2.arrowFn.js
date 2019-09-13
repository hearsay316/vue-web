// 把es6 箭头函数 转化成 es5 的函数

// @babel/core -> @babe/preset-env
let babel = require('@babel/core');
let code = `let fn = (a,b)=> {return a+b}`; 
let t = require('@babel/types');
let arrowFunctions = {
    visitor:{ // 访问者模式
        ArrowFunctionExpression(path){
            // 匹配到箭头函数
            let node = path.node;
            let body = node.body;
            if(!t.isBlockStatement(node.body)){
                body = t.blockStatement([t.returnStatement(node.body)])
            }
            let newNode = t.functionExpression(null,node.params,body);
            path.replaceWith(newNode);
        }
    }
}
let r = babel.transform(code,{
    plugins:[
        arrowFunctions
        // '@babel/plugin-transform-arrow-functions'
    ]
    // presets:[
    //     '@babel/preset-env'
    // ]
});
console.log(r.code);