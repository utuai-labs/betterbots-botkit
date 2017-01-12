'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiBaseURL = 'https://api.utu.ai/api/v1';

exports.default = function () {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'event';
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'POST';
  return function (apikey, body) {
    var request = new Request(apiBaseURL + '/' + endpoint, {
      headers: new Headers({
        'Content-Type': 'application/json',
        apikey: apikey
      }),
      method: method,
      body: JSON.stringify(body)
    });

    return fetch(request).then(function (r) {
      return r.json();
    });
  };
};