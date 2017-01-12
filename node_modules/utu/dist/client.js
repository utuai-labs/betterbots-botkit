'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _methods = require('./methods');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(apikey) {
    _classCallCheck(this, Client);

    this.apikey = apikey;
  }

  _createClass(Client, [{
    key: 'user',
    value: function user(data) {
      return (0, _methods.user)(this.apikey, data);
    }
  }, {
    key: 'message',
    value: function message(data) {
      return (0, _methods.message)(this.apikey, data);
    }
  }, {
    key: 'event',
    value: function event(e, data) {
      return (0, _methods.event)(e, this.apikey, data);
    }
  }]);

  return Client;
}();

exports.default = Client;