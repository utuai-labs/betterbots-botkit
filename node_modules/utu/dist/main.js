'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constants = exports.Client = undefined;

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('es6-promise').polyfill();
require('isomorphic-fetch');

exports.Client = _client2.default;
exports.constants = _constants2.default;