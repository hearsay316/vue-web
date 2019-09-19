/*
var generateParenthesis = function(n) {
    let total = n;
    let curr = '';
    let result = [];
    parenthes(curr,result,0,0);
    return result;
    function parenthes(curr,result,leftNum,rightNum){
        if(leftNum == total && rightNum == total) {
            result.push(curr);
            console.log(result);
        }
        if(leftNum < total) {
            parenthes(curr + "(",result,leftNum + 1,rightNum);

        }
        if(leftNum > rightNum) {
            parenthes(curr + ")",result,leftNum,rightNum + 1)

        }
    }
};
console.log (generateParenthesis (3));*/
/*
console.log(app());
function app() {
    console.log(123);
}
app();
var app = 123;

function app() {
    console.log(654);
}

function app() {
    console.log(789);
}*/
/*
 function a () {
    
};
 function aa(){};

let b = new a();
a.prototype=[];
let c = new a();
console.log(b.constructor,c.constructor,2..constructor);*/
/*const getUser = ()=> new Promise((resolve, reject) => {
 console.log(2225);
 resolve("xsxsx");
});
console.log(222);

async function add() {
 await getUser()
}
add();
console.log(2223);*/

/*
const getUser = () => new Promise((resolve, reject)=>{
 resolve('zhangsan')
});

async function add() {
 console.log (226);
 let a = await getUser ().then((res)=>console.log(res));
 console.log (225);
}
add();
console.log(1);
*/

/*function sleep (time) {
 return new Promise((resolve) => setTimeout(resolve, time));
}
(async function() {
 console.log('Do some thing, ' + new Date());
 await sleep(3000);
 console.log(2225);
})();*/
//console.log('Do other things, ' + new Date(),55555);


function app(b) {
 let a = (value) => {
  a.value = a.value || b;
  a.value = value + a.value;
  return a
 };

 a.valueOf = function () {
  return a.value
 };
 return a;
}

let c = app(6)(6);
console.log(c);