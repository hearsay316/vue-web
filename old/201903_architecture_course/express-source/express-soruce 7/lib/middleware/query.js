let url = require('url');
let init = function(){ // app
    let middle = (req,res,next) =>{
        console.log(req.url);  // /  req.url.slice(remove.length)
        let {pathname,query} = url.parse(req.url,true);
        console.log(pathname)
        req.path = pathname;
        req.query = query;
        next();
    }
    return middle
}
module.exports = init;