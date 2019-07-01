
function f() {
    console.log(arguments.length);
    Array.from(arguments,function (a,b) {
        console.log(a,b);
        return b
    })
}
f(123,2334)
let b=[1,23,0].form({length:5})
console.log(b);