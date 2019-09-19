let ejs = require('ejs');
let fs = require('fs');
let templateStr = fs.readFileSync('./template.html','utf8')
// 把<%%> 语法替换掉 ，把我们需要的内容用str拼接起来
// 实现一个with(obj);
// new Function
function render(templateStr,obj){
    let start = `let str\r\n`;
    start += `with(obj){\r\n`
    start+= 'str=`'
    templateStr = templateStr.replace(/<%([\s\S]+?)%>/g,function(){
        return '`\r\n'  + arguments[1] +'\r\nstr+=`'
    });
    let tail = '`\r\n} \r\n return str'
    // 让字符串变成函数
    let fnStr = new Function('obj',start + templateStr +tail)
    return fnStr(obj);
}
templateStr = render(templateStr,{arr:[1,2,3]});
console.log(templateStr);


