// let a = 'world';
// // 字符串拼接 ' '' '   换行的问题
// let str = `hello 
//     ${a}
// `
// console.log(str);

// 如何实现一个模板字符串 => 如何实现一个模板引擎

let ejs = require('ejs');
let fs = require('fs');
let templateStr = fs.readFileSync('./template.html','utf8')
function render(str,obj){
    // <%=num%>
    return str.replace(/<%=([\s\S]+?)%>/g,function(){
        return obj[arguments[1]];
    })
}
templateStr = render(templateStr,{num:1000,bbb:2000, ccc:3000})
console.log(templateStr);
