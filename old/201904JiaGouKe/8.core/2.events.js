let EventEmitter = require('./events');
let util = require('util');
// {'女生失恋':[fn1,fn2]}
//  on emit once (remveListener) off newListener
function Girl(){}
util.inherits(Girl,EventEmitter);
let girl = new Girl();

// 我想实现如果用户绑定了一个data事件 我就直接触发这个事件
// girl.on('newListener',function(type){
//     if(type === 'data'){
//         process.nextTick(()=>{
//             girl.emit('data');
//         })
//     }
// })
let fn = function(who){
    console.log('哭'+who);
}
girl.once('data',fn)
girl.off('data',fn);
girl.emit('data','123'); // 在emit之后会把once绑定事件移除掉
girl.emit('data','123');