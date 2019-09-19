// import './index.css'
// import './test.ts';
// ie 不支持的
const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

class MyComponent {

}
const my = new MyComponent();

// 如何实现代理 跨域 http-proxy 
// webpack 中解决跨域问题 有三种方式

// 如果是开发模式 http://localhost:3000/api  xxxxx
let baseUrl; // process.env.NODE_ENV  development,production
if(production && production !== 'production'){
    baseUrl = `http://localhost:3000/api`
}else{
    baseUrl = `http://www.zf.cn`;
};

let xhr = new XMLHttpRequest();
xhr.open('GET',baseUrl+'/api/user',true)
xhr.onload = function(){
  console.log(xhr.response)
}
xhr.send();


import cli from  './vue-cli.png'
let img = document.createElement('img');
img.src = cli;
document.body.appendChild(img);