let express = require('express');


let app = express();

app.get('/user',function(req,res){
    console.log(req.headers)
    res.json({user:'zf'})
})

app.listen(3000);



