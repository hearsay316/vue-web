let express = require('./lib/express');


let app = express();


// /user/1/2  => {id:1,name:2}   //[id,name]   [1,2]  =>{id:1,name:2}  
// path-to-regexp
app.get('/user/:id/:name',(req,res)=>{
    console.log(req.params,'----');
    res.end(JSON.stringify(req.params))
});



app.listen(3000);

// let pathToRegExp = require('path-to-regexp');
// let arr = [];
// let reg = pathToRegExp('/user/1/2',arr);
// console.log(reg);
