// node api 有异步的api readFile

// 获取结果的时候 需要通过回调
// 错误处理 只能通过回调函数的参数来处理
// 处理并发的异步将结果进行同步
let fs = require('fs');

// 1) 页面中需要通过ajax 获取两段数据 渲染模板
// let data = {}; // 
// function render(){
//     if(Object.keys(data).length === 2){
//         console.log(data);
//     }
// }
function after(times,callback){
    let data = {}
    return function(key,value){ // 每次成功后都会把 数据的结果保存到对象中
        data[key] = value;
        // 如果次数 和数据的个数相等
        if(times ===Object.keys(data).length){
            // 调用渲染方法
            callback(data)
        }
    }
}
function render(obj){
    console.log(obj);
}
let newRender = after(2,render);
fs.readFile('./name.txt','utf8',function(err,name){ // 5s
    newRender('name',name);
});
fs.readFile('./age.txt','utf8',function(err,age){ // 15s
    newRender('age',age);
});