'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'event';
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'POST';
  return function (apikey, bod) {
    return new Promise(function (resolve, reject) {
      var options = {
        host: 'api.utu.ai',
        path: '/api/v1/' + endpoint,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          apikey: apikey
        }
      };

      var request = _https2.default.request(options, function (res) {
        var error = false;

        if (res.statusCode < 200 || res.statusCode > 299) {
          error = true;
        }

        var body = [];

        res.on('data', function (chunk) {
          return body.push(chunk);
        });

        res.on('end', function () {
          var b = JSON.parse(body.join(''));
          if (error) {
            reject(b);
          } else {
            resolve(b);
          }
        });
      });

      request.on('error', function (err) {
        return reject(err);
      });
      request.write(JSON.stringify(bod));
      request.end();
    });
  };
};