let url = require('url')
module.exports = function(){
    return function(req,res,next){
        let { query,pathname} = url.parse(req.url,true);
        req.query = query;
        req.path = pathname;
        next();
    }
}