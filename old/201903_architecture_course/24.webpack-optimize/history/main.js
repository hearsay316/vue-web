// import $ from 'jquery';  // 只要引用一次就能暴露到全局上
// import './a.js'
// console.log($);
// console.log(window.jQuery);


// import {add} from './a';
import './style.css';
// console.log(add());

let button = document.createElement('button');
button.innerHTML= 'xxx'
button.addEventListener('click',()=>{
    let p = document.createElement('p');
    p.innerHTML = 'hello';
    document.body.appendChild(p);
});
document.body.appendChild(button);
import {add} from './a'
// 我希望js是热更新 
if(module.hot){
    // 默认支持热更新 module.hot.accpet
    // websocket
    module.hot.accept(['./a'],function(){
        //需要重新加载摸个模块 需要用require语法
        console.log(require('./a').minus())
        // 如果a文件变化了 想去用它的minus方法
    });
}
// webpack node react vue 专注



