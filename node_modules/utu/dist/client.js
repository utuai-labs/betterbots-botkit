'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _methods = require('./methods');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uTu = function () {
  function uTu(apikey) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var hasContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, uTu);

    this.apikey = apikey;
    this.config = config;
    this.values = {};
    this.hasContext = hasContext;
  }

  _createClass(uTu, [{
    key: 'getRequestObject',
    value: function getRequestObject() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return Object.assign({}, this.config, {
        values: this.values
      }, obj);
    }
  }, {
    key: 'setConfig',
    value: function setConfig() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.config = config;
    }
  }, {
    key: 'withContext',
    value: function withContext() {
      var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new uTu(this.apikey, this.getRequestObject(ctx), true);
    }
  }, {
    key: 'setValues',
    value: function setValues() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.hasContext) {
        throw new Error('You can only set values when using context, please see withContext()');
      }

      this.values = values;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(key, value) {
      if (!this.hasContext) {
        throw new Error('You can only add values when using context, please see withContext()');
      }

      Object.assign(this.values, _defineProperty({}, key, value));
      return this;
    }
  }, {
    key: 'user',
    value: function user() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return (0, _methods.user)(this.apikey, this.getRequestObject(data));
    }
  }, {
    key: 'message',
    value: function message() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return (0, _methods.message)(this.apikey, this.getRequestObject(data));
    }
  }, {
    key: 'event',
    value: function event(e) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _methods.event)(e, this.apikey, this.getRequestObject(data));
    }
  }]);

  return uTu;
}();

exports.default = uTu;