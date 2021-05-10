"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// const
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('home');
});
router.get('/calculate', function (req, res, next) {
    res.send('hellos');
});
router.get('/fetchRecords', function (req, res, next) {
    res.send('fetchRecords');
});
exports.default = router;
