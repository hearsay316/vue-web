/**
 * @return {string}
 */
/*function Integer(num){
    let desc = "0.";
    let [num1,num2]=num.toString ().split (".");
    if(desc+num2>0.5){
        num1++;
    }
    return num1
}
let a = 1;*/
// console.log ( Integer (a));
/*var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};
console.log(foo);  // undefined
console.log(bar); //  Object {n: 1, x: {n:2}}*/
/*
let  A = [2,3,4,5,6,9,10],B=[6,9,10,13,15],C=[2,3,4,7,9,10];
let E = {}; //&&E[B[i]]&&E[[i]]
let  d = [];
for(let i=0;i<A.length;i++){
/!*    if(E[A[i]]&&E[C[i]]&&E[B[i]]){
        continue
    }
     E[C[i]]=1;
     E[B[i]]=1;
     E[A[i]]=1;*!/
    let a = A[i],b=B[i],c=C[i];
    let max;
    if(typeof a==="number"){
        if (typeof b==="number") {
            if (typeof c==="number") {
                if (a>=b){
                    if(a>=c){
                        max =a;
                        if(b>=c){
                            d.push(c,b,a)
                        }else {
                            d.push(b,c,a)
                        }
                    }else {
                        max = c;
                        d.push(b,a,c)
                    }
                }else{
                    if(b>=c){
                        max = b;
                        if(a>c){
                            d.push(c,a,b)
                        }else{
                            d.push(a,c,b)
                        }
                    }else {
                        max = c;
                        d.push(a,b,c)
                    }
                }
            }else {
                if(a>b){
                    d.push(b,a)
                }else {
                    d.push(a,b)
                }
            }
        }else {
            if (typeof c==="number"){
                if(a>c){
                    d.push( c,a)
                }else {
                    d.push(a,c)
                }
            }else {
                d.push(a)
            }
        }
    }else {
        if(typeof b==="number"){
            if(typeof c==="number"){
                if(c>b){
                    d.push(b,c)
                }else {
                    d.push(c,b);
                }
            }else {
                d.push(b)
            }
        }else {
            if(typeof c==="number"){
                d.push(c)
            }
        }
    }
}*/


/*for(let i=0;i<Object.keys(E).length;i++){
   console.log();
   if(Object.keys(E)[i]!=="undefined"){
       D.push(Object.keys(E)[i]);
   }
}*/


/*
console.log (d);*/


/*
let arr = [{a:1},{a:2},{a:3}];
let b = {a:4};
console.log (JSON.stringify (arr).indexOf (JSON.stringify (b)));*/


// let obj = {a:14,b:{125:1254}};
// obj = [obj];
// console.log(obj);

let a = [[1,2],[3,4]];


function f(obj) {
    return Array.prototype.concat.apply([],obj)
}

let name = "swdewd";
let fun = function () {
    console.log(this.name);
};
fun();
