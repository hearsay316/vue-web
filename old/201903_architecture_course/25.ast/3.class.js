let code = `class Zfpx{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name
    }
}`
/*
function Zfpx(name){
    this.name = name;
}
Zfpx.prototype.getName = function(){
    return this.name
}
*/
let t = require('@babel/types');
let babel = require('@babel/core'); // @babel/core babylon7
let transformClass ={
    visitor:{
        ClassDeclaration(path){
            let node = path.node;
            let bodys = node.body.body;
            let id = node.id;
            bodys = bodys.map(body=>{
                if(body.kind === 'constructor'){
                    return t.functionExpression(id,body.params,body.body)
                }else{
                   let left = t.memberExpression(id,t.identifier('prototype'));
                   left = t.memberExpression(left,body.key);
                   let right = t.functionExpression(null,body.params,body.body)
                   return t.assignmentExpression('=',left,right);
                }
            });
            path.replaceWithMultiple(bodys);
        }
    }
}
let r =babel.transform(code,{
    plugins:[
        transformClass
    ]
})
console.log(r.code);



