// 目录 像树  react domdiff 树的遍历

let fs = require('fs');
// fs.mkdir fs.mkdirSync 创建目录
// fs.rmdir fs.rmdirSync  删除目录
// fs.unlink fs.unlinkSync 删除文件
// fs.readdir fs.readdirSync 读取文件目录
// fs.stat   fs.statSync
// 创建目录必须要保证 父路径先存在才能创建

let p = 'a/b/d/e/q/w'
// 同步创建目录
// function mkdir(){ // 
//    let arr =  p.split('/');
//    for(let i = 0 ;i < arr.length ;i++){
//        let currentPath = arr.slice(0,i+1).join('/');
//        try{
//         fs.accessSync(currentPath)
//        }catch(e){
//         fs.mkdirSync(currentPath);
//        }
//    }
// }
// 异步的创建目录
// function mkdir(p,fn){ 
//     let arr =  p.split('/');
//     let index = 0;
//     function next(){
//         if(arr.length === index) return fn();
//         let currentPath = arr.slice(0,++index).join('/');
//         fs.access(currentPath,function(err){
//             if(err){
//                 fs.mkdir(currentPath,next)
//             }else{
//                 // 文件已经存在,在继续创建下一层目录
//                 next();
//             }
//         })
//     }
//     next();
// }
// mkdir(p,function(){
//     console.log('创建成功')
// });

// let path = require('path');
// function rmdirSync(dir){ // clean-webpack-plugin
//    let stat = fs.statSync(dir); // 判断当前路径状态 stat.isFile是不是文件
//    if(stat.isFile()){ // 如果是文件直接删除掉 跑路
//        fs.unlinkSync(dir);
//    }else{
//        let dirs = fs.readdirSync(dir); // 只能读取子目录，并且没有父路径
//        dirs = dirs.map(d=>path.join(dir,d));
//        dirs.forEach(dir=>{ // 删除子路径
//             rmdirSync(dir); // b a.js
//        });
//        fs.rmdirSync(dir); // 删除自己
//    }
// }
// rmdirSync('a');


// 异步删除 分两种 
// 1） 串行 第一个兄弟遍历完之后再遍历第二个  series
// 2)  并行 两个一起遍历 paralle

let path = require('path');
function rmdir(dir,callback){ // clean-webpack-plugin
   fs.stat(dir,function(err,stat){
     if(stat.isFile()){ // 是文件直接关掉
         fs.unlink(dir,callback)
     }else{
         // 目录
         fs.readdir(dir,function(err,dirs){ // 没有父路  只有儿子
            dirs = dirs.map(d=>path.join(dir,d));
            let index = 0;
            function next(){ // 串行 ，并行计数器
                // 默认我应该先删除b 在删除c
                // 如果b 和 c 都删除后 会将跟路径删除掉

                if(index === dirs.length) return fs.rmdir(dir,callback)
                let d = dirs[index++]; // 先从中取出第一个来
                rmdir(d,()=>next()); // 去删除这个目录
            }
            next();
         });
     }
   })
}
// 并发删除
// rmdir('a',function(){
//     console.log('删除成功')
// });

//  parrel => promise => async + await


fs.rmdir('a',(err)=>{console.log(err)});