let response = require('../response');
let request = require('../request');
exports.init = function(app) {
  return function(req, res, next) {
    res.app = app;
    // end方法是挂在在 res.__proto__
    res = Object.assign(res,response);
    req = Object.assign(req,request)
    next();
  };
};


