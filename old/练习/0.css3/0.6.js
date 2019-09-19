"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key] (arg);
        var value = info.value;
    } catch (error) {
        reject (error);
        return;
    }
    if (info.done) {
        resolve (value);
    } else {
        Promise.resolve (value).then (_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this, args = arguments;
        return new Promise (function (resolve, reject) {
            var gen = fn.apply (self, args);

            function _next(value) {
                asyncGeneratorStep (gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                asyncGeneratorStep (gen, resolve, reject, _next, _throw, "throw", err);
            }

            _next (undefined);
        });
    };
}

function user() {
    return _user.apply (this, arguments);
}

function _user() {
    _user = _asyncToGenerator (
        /*#__PURE__*/
        regeneratorRuntime.mark (function _callee() {
            var f1, f2;
            return regeneratorRuntime.wrap (function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return readFile ('/etc/fstab');

                        case 2:
                            f1 = _context.sent;
                            _context.next = 5;
                            return readFile ('/etc/shells');

                        case 5:
                            f2 = _context.sent;
                            console.log (f1.toString ());
                            console.log (f2.toString ());

                        case 8:
                        case "end":
                            return _context.stop ();
                    }
                }
            }, _callee);
        }));
    return _user.apply (this, arguments);
};