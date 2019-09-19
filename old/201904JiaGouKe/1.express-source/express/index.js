let http = require('http');
let url = require('url');
let Application = require('./lib/application')

function createApplication(){
    return new Application;
}
module.exports = createApplication;