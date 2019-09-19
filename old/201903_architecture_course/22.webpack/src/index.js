let str = require('./a');


import style from './style.css';
console.log(style);

// 行内loader
require('!!style-loader!css-loader!./a.css')



// cssmodule  scoped:true
let div = document.createElement('div');
div.innerHTML = 'hello';
div.className = style.cc;
document.body.appendChild(div);