let response = { 
    _body:'',   
    get body(){
        return this._body
    },
    set body(val){
        this.res.statusCode = 200; // 如果调用了ctx.body 会将状态码 变成200
        this._body = val;
    }
}
module.exports = response;