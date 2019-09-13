// 广度  深度

// 文件夹

let fs = require('fs');
// fs.mkdir('./b/a/c/d',(err)=>{
//     console.log(err);
// });
// 1) --------
// fs.mkdir 同步和异步
// function mkdirSync(path){
//     let arr = path.split('/');
//     for(let i = 0 ; i< arr.length;i++){
//         let p = arr.slice(0,i+1).join('/')
//         try{
//             // 如果文件夹不存在 才创建
//             fs.accessSync(p);
//         }catch(e){
//             fs.mkdirSync(p);
//         }
//     }
// }
// mkdirSync('q/a/b/c/d/e/g');
// 2) --------
// function mkdir(path,callback){
//     let arr = path.split('/'); // [e,q,c,w,f,w]
//     let index = 0;
//     function next(){
//         //递归必须 要有终止条件
//        if(index >= arr.length) return callback();
//        let p = arr.slice(0,index+1).join('/');
//        // 每次取当前的路径看书否存在
//        fs.access(p,(err)=>{
//             if(err){
//                 index++; // 不存在就创建
//                 fs.mkdir(p,next);
//             }else{
//                 index++;
//                 next(); // 如果文件夹存在 就去创建下一个
//             }
//        })
//     }
//     next();
// }
// mkdir('e/q/c/w/f/w',()=>{
//     console.log('停止')
// }); 


// 3) 如何删除目录
// 同步删除文件
// fs.unlinkSync('./name2.txt');
// 删除文件夹
// fs.rmdirSync('a');
// 读取目录
// let dirs = fs.readdirSync('a');
// 文件的状态 isDirectory  isFile
// let statObj = fs.statSync('a');
// console.log(statObj.isDirectory());

let path = require('path');
function rmdirSync(p){ // compose  
    // 判断文件的状态
    let statObj = fs.statSync(p);
    if(statObj.isDirectory()){
        // 如果是目录的话
        let dirs = fs.readdirSync(p); // [b,c]
        // 如果有内容 需要删除儿子 
        dirs.forEach(dir=>{
            let current = path.join(p,dir);
            rmdirSync(current);
        })
         fs.rmdirSync(p);
    }else{
        // 如果是文件 直接删除即可
        fs.unlinkSync(p);
    }
}
rmdirSync('q');
function wide(p){
    let arr = [p];
    let index = 0;
    let current;
    while(current = arr[index++]){
       let statObj =  fs.statSync(current);
       if(statObj.isDirectory()){
           // 读取当前目录
           let dirs = fs.readdirSync(current); // [c,1.js]
           // 给目录添加前缀
           dirs = dirs.map(d=>path.join(current,d));// [a/c,a/1.js]
           // 放到数组中，指针会向后移动，继续读取指针指向的目录，如果不是目录跳过即可
           arr = [...arr,...dirs];
       }
    }
    for(let i = arr.length-1;i>=0;i--){
       let current = arr[i];
       let statObj =  fs.statSync(current);
       if(statObj.isDirectory()){
           fs.rmdirSync(current);
       }else{
           fs.unlinkSync(current);
       }
    }
}
wide('a');
// 1）实现一个异步删除(先序深度(串行，并行),广度) stat,readdir,rmdir,unlink
// 2) -> promise -> async + await