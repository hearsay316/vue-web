let ejs = require('ejs');
let fs = require('fs');
let path = require('path');
let templateStr = fs.readFileSync(path.resolve(__dirname,'template.html'),'utf8')
// let r = ejs.render(templateStr,{name:'hello'});
// 1) es6 模板字符串
// function render(str,obj){
//     return str.replace(/<%=([\s\S]+?)%>/g,function(){
//         return obj[arguments[1]]
//     })
// }
// let r = render(templateStr,{name:'hello'});
// eval new Function 
// 2) 解析带有js语法的模板 拼字符串
function render(templateStr,a){ //es6 模板字符串
    // 需要在内部拼接一个字符串，这个字符串是我最终想要的结果
    let str = `let str=''; \r\n`;
    // with 保证当前取值的时候 可以通过我们自己的上下文来取值
    str+= `with(obj){\r\n`
    str += 'str+=`'
    // 去掉<%%>
    templateStr = templateStr.replace(/<%=([\s\S]+?)%>/g,function(){
        return '${'+arguments[1]+'}'; // 去模板中取值
    });
    let content = templateStr.replace(/<%([\s\S]+?)%>/g,function(){
        return '`\r\n'+arguments[1] +'\r\nstr+=`';
    });
    let strTemplate =  str + content +'`\r\n}\r\n return str';
    // 转化成函数
    let fn = new Function('obj',strTemplate);
    // 将参数传入 获取最终的结果
    return fn(a);
}
let r = render(templateStr,{arr:[1,2,3]}); // with 
fs.writeFileSync('1.js',r);
console.log(r);
