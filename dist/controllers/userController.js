"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.use(_auth.default);

const completeChallenge = (user, amount) => {
  const experienceToNextLevel = Math.pow((user.profile.level + 1) * 4, 2);
  let finalExperience = user.profile.experience + amount;

  if (finalExperience > experienceToNextLevel) {
    finalExperience = finalExperience - experienceToNextLevel;
    user.profile.level += 1;
  }

  user.profile.experience = finalExperience;
  user.profile.completedChallenges += 1;
  return user;
};

router.put('/completechallenge', async (request, response) => {
  const _id = request.query.userId;
  const {
    challengeAmount
  } = request.body;
  let user = await _User.default.findById({
    _id
  }).select('+password');

  if (!user) {
    return response.status(400).json({
      error: 'User not found'
    });
  }

  user = completeChallenge(user, Number(challengeAmount));
  await _User.default.replaceOne({
    _id
  }, user);
  return response.json(user.profile);
});

const UserController = app => app.use('/user', router);

var _default = UserController;
exports.default = _default;