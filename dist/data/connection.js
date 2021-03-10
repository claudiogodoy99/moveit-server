"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.Promise = global.Promise;

_mongoose.default.connect(String(process.env.MONGODB ?? ''), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

var _default = _mongoose.default;
exports.default = _default;