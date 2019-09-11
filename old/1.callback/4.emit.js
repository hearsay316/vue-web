// let fs = require('fs');
//
// //  发布订阅 [fn,fn]
// function EventEmitter(){
//     this._arr = []
// }
// EventEmitter.prototype.on = function(callback){
//     this._arr.push(callback)
// };
// EventEmitter.prototype.emit = function(){
//     this._arr.forEach(fn => fn.apply(this,arguments));
// };
// let e = new EventEmitter();
// let school = {};
// e.on(function (data,key) {
//     school[key] = data;
//     if(Object.keys(school).length===2){
//         console.log(school);
//     }
// });
// fs.readFile('../name.txt','utf8',function(err,data){
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(data);
//     e.emit(data,"name");
// });
// fs.readFile('../age.txt','utf8',function(err,data){
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(data);
//     e.emit(data,"age");
// });