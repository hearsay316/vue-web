
let express = require('./lib/express');

let app = express();

app.get('/',function(req,res){
    res.end('hello');
})

app.listen(3000,function(){
    console.log('server start '+ 3000);
}); // not found