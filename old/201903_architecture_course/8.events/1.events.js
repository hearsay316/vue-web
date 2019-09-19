let EventEmitter = require('events');
let util = require('util');
// 发布订阅 on  emit  vue eventBus
function Girl () {
}
util.inherits(Girl,EventEmitter);
// Object.setPrototypeOf(Gril.prototype,EventEmitter.prototype);

let girl = new Girl();
let listener = ()=>{
    console.log('失恋')
}
girl.on('newListener',(type)=>{
    console.log(type)
})
girl.once('失恋',listener);
girl.off('失恋',listener)
girl.emit('失恋');
girl.emit('失恋');
// girl.on('newListener',(type)=>{
//     if(type === 'data'){
//        process.nextTick(()=>{
//             girl.emit('data');
//         })
//     }
// })
// girl.on('data',function(){
//     console.log('用户监听了data时间')
// });
// girl.on('data',function(){
//     console.log('用户监听了data时间')
// });


// on once off newListener