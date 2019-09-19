let EventEmitter = require('./events');
let util = require('util');
/**
 * 三种方法 继承
 * __proto__
 * Object.create
 * Object.setPrototypeof
 *
 */

function Girl(){

}
util.inherits(Girl,EventEmitter);
let girl = new Girl();
let cry = (thing)=>{
    console.log("喝酒");
};
// girl.on("newListener",(type)=>{
//   //  process.nextTick(()=>{
//         girl.emit(type);
//  //   })
//
// });
 girl.once("这是",cry);

 girl.off("这是",cry);
//girl.off("这是",cry);

girl.emit("这是",'被甩了');
// terminal
girl.emit("这是",'被甩了');
