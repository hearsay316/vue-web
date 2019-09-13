let url = require('url');
let request = { 
    get method(){ // req.method 目的是可以获取到原声req或者res
       return this.req.method
    },
    get path(){
        return url.parse(this.req.url).pathname;
    }
    // ......

    
}

module.exports = request

