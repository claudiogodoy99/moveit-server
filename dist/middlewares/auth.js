"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../config/auth.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authMiddleware = (request, res, next) => {
  if (!request.headers?.authorization) {
    return res.status(401).json({
      erro: 'No token provided'
    });
  }

  const authHeader = request.headers.authorization;
  const parts = authHeader.split(' ');

  if (!(parts.length === 2)) {
    return res.status(401).json({
      erro: 'Token error'
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({
      erro: 'Token bad format'
    });
  }

  _jsonwebtoken.default.verify(token, _auth.default.secret, (error, decoded) => {
    if (error) return res.status(401).json({
      erro: 'Invalid Token'
    });
    request.query.userId = decoded._id;
  });

  return next();
};

var _default = authMiddleware;
exports.default = _default;