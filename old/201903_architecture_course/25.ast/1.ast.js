// 把源代码转化成树 esprima
// 深度优先遍历树   estraverse
// 修改树  
// 生成树         escodegen
let esprima = require('esprima');
let estraverse = require('estraverse');
let escodegen = require('escodegen');
let code = `function code(){}`
let ast = esprima.parseScript(code); // 解析树
estraverse.traverse(ast,{ // 遍历树
    enter(node){ // 每个节点 都要有type属性
        console.log('enter:'+node.type);
        if(node.type === 'Identifier'){
            node.name = 'zhufeng'; // 修改树
        }
    },
    leave(node){
        console.log('leave:'+node.type)
    }
})
let r = escodegen.generate(ast); // 生成树
console.log(r);