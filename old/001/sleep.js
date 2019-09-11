/*
let sleep = ()=>{
    return    new Promise((resolve, reject)=>
           setTimeout(function () {
               console.log(22);
               resolve();
           },1000)
       )
};
(async function () {
   await sleep();
   console.log(111);
})()
*/

function takeLongTime() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
            console.log(1)
        }, 1000)
    })
}
async function test() {
    await takeLongTime();
    console.log(2)
}
test();


