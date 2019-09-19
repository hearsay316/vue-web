let Router = require('koa-router');
let user = new Router({
    prefix:'/user'
});

// prefix 做前缀来用
user.post('/add',(ctx)=>{
    ctx.body = 'user add'
});

module.exports = user