
let fs = require('fs');
let Promise = require('./promise')
function readFile(url){
    return new Promise((resolve,reject)=>{
         resolve(1000);
        // fs.readFile(url,'utf8',function(err,data){
        //     if(err) reject(err);
        //     resolve(data);
        // })
    })
}
let p2 = readFile('./name.txt').then((data)=>{ 
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject(2000);
        },2000)
    })
});
p2.then((data)=>{
    console.log(data);
},err=>{
    console.log(err,'err');
})
