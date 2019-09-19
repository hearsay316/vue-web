let proto = {}

// ctx.path => ctx.request.path

// ctx.path
function defineGetter(key,obj){
    proto.__defineGetter__(key,function(){
        return this[obj][key];
    })
}
function defineSetter(key,obj){
    //ctx.body = 1000  => ctx.response.body = 100;
    proto.__defineSetter__(key,function(value){
        this[obj][key] = value
    })
}

defineGetter('body','response');
defineSetter('body','response');
defineGetter('path','request'); // 把ctx.path 获取的属性 代理给request.path
defineGetter('url','request')
module.exports = proto;


// let obj = {
//     a:{
//         a:1
//     }
// }
// // 定义属性获取器
// let o = {}
// o.__defineGetter__('a',function(){
//     return obj.a.a;
// })
// console.log(o.a);