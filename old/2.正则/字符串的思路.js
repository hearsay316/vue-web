let time = "2018-4-4 16:26:8";
function strString (){
let arr= [],ut = ['-',':'],bulid = ["年","月","日 ","时","分","秒"]
        ,str ="";
    time.split(" ").map(function (item,index,array) {
        arr.push(...item.split (ut[index]));
    });
    arr.forEach((item,index,array)=>{
        str+=item+bulid[index]
    });
    return str;
}

console.log(strString(time));