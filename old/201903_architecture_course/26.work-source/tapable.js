// 同步的钩子 node events 发布订阅

// 流程管理

let  {SyncHook} = require('tapable');
let s = new SyncHook(['xxx','ccc']);
// 订阅
s.tap('webplugin1',function(a){
    console.log(1,a)
});
s.tap('webplugin2',function(a){
    console.log(2,a)
});
s.call('1');