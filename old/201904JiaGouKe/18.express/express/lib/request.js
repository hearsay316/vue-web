let url = require('url');
// function defineGetter(obj,key,fn){
//     Object.defineProperty(obj,key,{
//         enumerable:true,
//         get:fn
//     })
// }
let request = {
    path(){
        return url.parse(this.url).pathname;
    }
}

// defineGetter(request,'path',function(){
//    console.log(this,'----');
//    return  
// })

module.exports = request;