
function OutPutMaxStr(str) {
    let obj = {};
    for(let i=0;i<str.length;i++){
        obj[str[i]] ? obj[str[i]] += 1 : obj[str[i]] = 1;
    }
    Object.fromEntries()
    return Object.entries(obj).sort((item,item2)=>item2[1]-item[1])[0];
}
let arr = OutPutMaxStr("sssdesssde");
console.log(arr);
/*
function OutArray(num) {
    let arr = [];
    let base = 1;
    while(num>base){
        arr.push(base);
        base *=2;
    }
    return arr;
}
 let arr = OutArray(7);
console.log(arr);


    console.log(1 instanceof Number);
    let a = 10;*/
    //switch 是三个等号
//instanceof
//Object.prototype.toString.call();
// constructor
// typeof

function App() {
    let a = 1;

    this.geta = () => {
        return a;
    };
    this.setA = (aa) => {
        a = aa
    }

}
App.user = function () {
    console.log(1);
};
App.prototype.username = function () {
    console.log(1);
};
let a =new App();
console.log(a.username());
let arr = [];
arr.sort();

//document.getElementById();
