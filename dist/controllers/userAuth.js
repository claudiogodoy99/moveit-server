"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../models/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../config/auth.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

const getByEmail = async request => {
  const {
    email
  } = request.body;
  return _User.default.findOne({
    email
  });
};

const generateJwtToken = user => {
  return _jsonwebtoken.default.sign({
    _id: user._id
  }, _auth.default.secret, {
    expiresIn: 86400
  });
};

router.post('/register', async (request, response) => {
  try {
    if (await getByEmail(request)) {
      return response.status(400).json({
        error: 'This email already existis '
      });
    }

    const user = await _User.default.create(request.body);
    user.password = '';
    return response.status(201).json({
      user,
      token: generateJwtToken(user)
    });
  } catch (err) {
    return response.status(400).json({
      error: 'Register failed'
    });
  }
});
router.post('/authenticate', async (request, response) => {
  const {
    email,
    password
  } = request.body;

  try {
    const user = await _User.default.findOne({
      email
    }).select('+password');

    if (!user) {
      return response.status(401).json({
        error: 'User not found'
      });
    }

    if (!(await _bcryptjs.default.compare(password, String(user.password)))) {
      return response.status(401).json({
        error: 'Invalid password'
      });
    }

    user.password = '';
    const token = generateJwtToken(user);
    return response.status(200).json({
      user,
      token
    });
  } catch (err) {
    return response.status(500).send();
  }
});

const AuthController = app => app.use('/auth', router);

var _default = AuthController;
exports.default = _default;