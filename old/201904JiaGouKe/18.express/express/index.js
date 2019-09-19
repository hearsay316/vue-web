let http = require('http');
let url = require('url');
let Application = require('./lib/application')
let Router = require('./lib/router')
function createApplication(){
    return new Application;
}
createApplication.Router = Router
module.exports = createApplication;