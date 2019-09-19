let path = require('path');
let fs = require('fs');
let response = {
    render(filePath, data, callback) {
        let dirname = this.app.get("views"); // views
        let extension = this.app.get("view engine"); // .html
        let absPath = path.join(dirname, `${filePath}${extension}`);
        this.app.engines[extension](absPath, data, function(err, html) {
            callback(null, html);
        });
    },
    send(value){
        if(typeof value === 'object'){
            this.setHeader('Content-Type','application/json')
            this.end(JSON.stringify(value));
        }
    },
    sendFile(filepath){
        fs.createReadStream(filepath).pipe(this);
    }
}
module.exports = response