"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connection = _interopRequireDefault(require("../data/connection"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _connection.default.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  profile: {
    level: {
      type: Number,
      default: 1,
      require: false
    },
    experience: {
      type: Number,
      default: 0,
      require: false
    },
    completedChallenges: {
      type: Number,
      default: 0,
      require: false
    },
    rankingPosition: {
      type: Number,
      require: false
    }
  }
});
userSchema.pre('save', async function (next) {
  const hash = await _bcryptjs.default.hash(String(this.password), 10);
  this.password = hash;
  next();
});

var _default = _connection.default.model('user', userSchema);

exports.default = _default;