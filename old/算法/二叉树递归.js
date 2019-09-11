function bserch(A,p,r,x) {
    const guess = Math.floor((r-p)/2) //5
    console.log(A,p,r,x,A[guess],guess, A[guess]>x);
    if(p>=r || guess ===0){return -1}
    if(A[guess]===x)return guess;
    return A[guess]>x?bserch(A,p/2,r,x):bserch(A,guess,r,x)
} //  88>145
       //0,1,2,3,4,5,6,7,8,9
let a = [1,5,55,56,87,88,99,110,145,155];

console.log(bserch(a,0,9,155))