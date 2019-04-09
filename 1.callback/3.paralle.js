// 并发调用接口 两个ajax ajax ==> name   ajax ==> age
let fs = require('fs');
// 浏览器的并发链接  chrome是6个  ie6是2个
function after(times,callback){ // 满足一点就是高阶函数
    let result = {};
    return function(key,data){ // promise.all
        result[key] = data
        if(--times===0){
            callback(result);
        }
    }
}
let newFn = after(2,function (result) { //这个是所有异步之后执行
    console.log(result);
});
fs.readFile('../name.txt','utf8',function(err,data){
    if(err){
        console.log(err);
        return
    }
    newFn("name : ",data);
    console.log(data);
});
fs.readFile('../age.txt','utf8',function(err,data){
    if(err){
        console.log(err);
        return
    }
    console.log(data);
    newFn("age:",data);
});
console.log('hello');
// 串行  两个人有关系 上一个人的输入 是下个人的输出
// 并行 两个人没关系 还可以一起执行
//前端模式   发布订阅模式  观察者模式