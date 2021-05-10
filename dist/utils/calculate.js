"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDb = exports.calcResult = void 0;
var fs_1 = __importDefault(require("fs"));
var dbPath = process.env.NODE_ENV === 'test'
    ? __dirname + "/../database-test.json"
    : __dirname + "/../database.json";
var calcResult = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, db, data, allData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                result = 0;
                req.body.shape === 'square' ? (result = calcSquare(req.body.dimension)) : 0;
                req.body.shape === 'circle' ? (result = calcCircle(req.body.dimension)) : 0;
                req.body.shape === 'triangle'
                    ? (result = calcTriangle(req.body.dimension))
                    : 0;
                req.body.shape == 'rectangle'
                    ? (result = calcRectangle(req.body.dimension))
                    : 0;
                if (!(result && result > 1)) return [3 /*break*/, 2];
                return [4 /*yield*/, exports.readDb()];
            case 1:
                db = _a.sent();
                data = {
                    id: db.id + 1,
                    shape: req.body.shape,
                    dimension: req.body.dimension,
                    result: result,
                    createdAt: new Date(Date.now()),
                };
                allData = __spreadArray(__spreadArray([], db.data), [data]);
                writeToDb(allData);
                return [2 /*return*/, res.status(201).json({
                        status: 'success',
                        data: data,
                    })];
            case 2:
                res.status(400).json({
                    status: 'fail',
                    message: 'invalid dimension',
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(400).json({
                    status: 'fail',
                    message: 'invalid dimension',
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.calcResult = calcResult;
var calcSquare = function (dimension) {
    if (typeof dimension !== 'number')
        throw new Error('invalid dimension');
    return dimension * dimension;
};
var calcCircle = function (dimension) {
    if (typeof dimension !== 'number')
        throw new Error('invalid dimension');
    return +(Math.PI * dimension * dimension).toFixed(2);
};
var calcRectangle = function (dimension) {
    if (typeof dimension.a !== 'number' || typeof dimension.b !== 'number')
        throw new Error('invalid dimension');
    return dimension.a * dimension.b;
};
var calcTriangle = function (dimension) {
    var a = dimension.a, b = dimension.b, c = dimension.c;
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number')
        throw new Error('invalid dimension');
    var s = (a + b + c) / 2;
    return +Math.sqrt(s * ((s - a) * (s - b) * (s - c))).toFixed(2);
};
var readDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    var db, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs_1.default.promises.readFile(dbPath, 'utf-8')];
            case 1:
                db = _a.sent();
                data = JSON.parse(db);
                return [2 /*return*/, {
                        data: data,
                        id: data.length + 1,
                    }];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, {
                        data: [],
                        id: 0,
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readDb = readDb;
var writeToDb = function (data) {
    fs_1.default.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
