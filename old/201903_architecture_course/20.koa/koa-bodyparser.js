let bodyPaser = ()=>{
    return async (ctx,next)=>{
        await new Promise((resolve,reject)=>{
            let arr = [];
            ctx.req.on('data',function(data){
                arr.push(data);
            });
            ctx.req.on('end',function(){
                // username=admin
                ctx.request.body = {}
                if(ctx.get('content-type') === 'application/x-www-form-urlencoded'){
                    ctx.request.body = require('querystring').parse(Buffer.concat(arr).toString()); 
                }
                if(ctx.get('content-type') === 'application/json'){
                    ctx.request.body = JSON.parse(Buffer.concat(arr).toString()); 
                }
                resolve();
            })
        });
        await next();
    }
}
module.exports = bodyPaser;