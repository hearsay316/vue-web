let fs = require('fs');
let path = require('path')
function rmdir(dirname,callback){
   fs.stat(dirname,(err,statObj)=>{
        if(statObj.isDirectory()){
            fs.readdir(dirname,(err,dirs)=>{
                dirs = dirs.map(d=>{
                    return path.join(dirname,d)
                });
                if(dirs.length === 0){
                    return fs.rmdir(dirname,callback);
                }
                let index = 0;
                let done = () =>{ // 成功后调用一下done方法，子目录都删除成功后 ，删除自己即可
                    index++;
                    if(index == dirs.length){
                        fs.rmdir(dirname,callback);
                    }
                }
                dirs.forEach(dir=>{
                    rmdir(dir,done)
                })
            })
        }else{
            fs.unlink(dirname,callback)
        }
   })
}
rmdir('a',()=>{
    console.log('删除成功')
});
// 深度先序 异步串行 mz模块 可以把方法直接改造成promise的格式
// 把这一坨代码 变成promise格式 -> async + await 