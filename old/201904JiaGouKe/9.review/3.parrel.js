
let fs = require('fs');
let path = require('path')
// function rmdir(filePath,callback){
//     fs.stat(filePath,(err,stat)=>{
//         if(stat.isFile()){
//             fs.unlink(filePath,callback)
//         }else{
//             fs.readdir(filePath,(err,dirs)=>{
//                 if(dirs.length === 0){ // 如果目录中没有内容 直接删除即可
//                     fs.rmdir(filePath,callback);
//                 }
//                 dirs = dirs.map(dir=>{
//                     return path.join(filePath,dir);
//                 });
//                 let index = 0;
//                 function done(){ // 每次删除成功后都会调用done ，如果两个都成功后，删除自己
//                     index++;
//                     if(index === dirs.length){
//                         fs.rmdir(filePath,callback);
//                     }
//                 }
//                 dirs.forEach(dir => {
//                     rmdir(dir,done); // a/b  a/c
//                 });
//             })
//         }
//     })
// }
// rmdir('a',function(){
//     console.log('删除完成')
// });
// 实现promise 
// function rmdir(filePath){
//     return new Promise((resolve,reject)=>{
//         fs.stat(filePath,(err,stat)=>{
//             if(stat.isFile()){
//                 fs.unlink(filePath,resolve);
//             }else{
//                 fs.readdir(filePath,(err,dirs)=>{
//                     dirs = dirs.map(dir=>rmdir(path.join(filePath,dir)));
//                     Promise.all(dirs).then(()=>{ // a/b
//                         fs.rmdir(filePath,resolve);
//                     })
//                 })
//             }
//         });
//     });
// }
// rmdir('a').then(()=>{
//     console.log('删除成功')
// })
// mz
// let fs = require('mz/fs');  fs.readFile()
// async function rmdir(filePath){
//     let stat = await fs.stat(filePath);
//     if(stat.isFile()){
//         return fs.unlink(filePath)
//     }else{
//         let dirs = await fs.readdir(filePath);
//         // 当删除所有儿子后删除自己
//         await Promise.all(dirs.map(dir=>rmdir(path.join(filePath,dir))));
//         await fs.rmdir(filePath);
//     }
// }
// rmdir('a').then(()=>{
//     console.log('成功')
// })

// 序  先序深度遍历  

// 广度优先 同步删除 > 先序深度
function wide(filePath){
    let arr = [filePath];
    let index = 0;
    let current;
    while(current = arr[index++]){ // a
        if(fs.statSync(current).isDirectory()){
            let dirs = fs.readdirSync(current);
            dirs = dirs.map(item=>path.join(current,item)); // [a/b,a/c];
            arr = [...arr,...dirs];
        }
    }
    // 倒序删除
}
wide('a');
// 第二周的作业:
// 1) -> 异步的来实现 -> async + awit

