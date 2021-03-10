"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../models/User"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.use(_auth.default);
router.get('/', async (request, response) => {
  try {
    const userByRanking = _User.default.find().sort({
      level: 1,
      experience: 1
    });

    return response.status(200).json(await userByRanking);
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      error: 'Somehing happens'
    });
  }
});

const RankingController = app => app.use('/ranking', router);

var _default = RankingController;
exports.default = _default;