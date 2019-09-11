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
 function a () {
    
};
 function aa(){};

let b = new a();
a.prototype=[];
let c = new a();
console.log(b.constructor,c.constructor,2..constructor);