// require('!!inline-loader!./a.js');// 行内loader只能在代码中使用
// expose-loader!?jquery
// !! 不在匹配其它loader
// -! 把pre 和normal屏蔽掉
// ！ 没有normalloader 

// loader的分类 4类 执行顺序


// let fn = () =>{
//     console.lo('~~~~~')
// }
// fn();
import url from './1.png' // module.exports='xxxxx.png'
let img = document.createElement('img');
img.src = url;
document.body.appendChild(img);