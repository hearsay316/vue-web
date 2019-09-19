let url = require('url');
let request = {
    get url(){ // this指代的是谁获取的url
        return this.req.url;
    },
    get path(){ // 里面可以存放各种逻辑
        let {pathname} = url.parse(this.req.url,true);
        return pathname
    },
    get query(){ // 里面可以存放各种逻辑
        let {query} = url.parse(this.req.url,true);
        return query
    }
}
module.exports = request;

