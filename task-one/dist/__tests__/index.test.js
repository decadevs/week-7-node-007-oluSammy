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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../src/app"));
var id = '';
var dataPreFilled = {};
var testData = {
    organization: 'node ninja',
    products: ['developers', 'pizza'],
    marketValue: '90%',
    address: 'sangotedo',
    ceo: 'cn',
    country: 'Taiwan',
    noOfEmployees: 2,
    employees: ['james bond', 'jackie chan'],
};
describe('create organization', function () {
    it('should create an organization', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).post('/api').send(testData)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(res.body).toHaveProperty('data');
                    expect(res.body).toHaveProperty('status');
                    expect(res.body.status).toEqual('success');
                    id = res.body.data.id || res.body.data[0].id;
                    if (Array.isArray(res.body.data)) {
                        // eslint-disable-next-line prefer-destructuring
                        dataPreFilled = res.body.data[0];
                    }
                    else {
                        dataPreFilled = res.body.data;
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('fetch data', function () {
    it('should get all organizations', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).get('/api')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty('data');
                    expect(res.body).toHaveProperty('status');
                    expect(res.body.status).toEqual('success');
                    expect(Array.isArray(res.body.data)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get one organization', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).get("/api//" + id)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty('data');
                    expect(res.body).toHaveProperty('status');
                    expect(res.body.status).toEqual('success');
                    expect(res.body.data[0] || res.body.data).toMatchObject(dataPreFilled);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('update an organization', function () {
    it('should update an organization', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testData.organization = 'updated ninja';
                    return [4 /*yield*/, supertest_1.default(app_1.default).put("/api/" + id).send(testData)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty('data');
                    expect(res.body).toHaveProperty('status');
                    expect(res.body.status).toEqual('success');
                    expect(res.body.data.id).toBe(id);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('delete an organization', function () {
    it('should delete an organization', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).delete("/api/" + id)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty('status');
                    expect(res.body.status).toEqual('success');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('should show 404 error when trying to get a deleted data', function () {
    it('should show 404 error for deleted data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).get("/api/" + id)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(404);
                    expect(res.body).toHaveProperty('status');
                    expect(res.body.status).toEqual('fail');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('should show 404 error when trying to update a deleted data', function () {
    it('should show 404 error for deleted data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).put("/api/" + id)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(404);
                    expect(res.body).toHaveProperty('status');
                    expect(res.body.status).toEqual('fail');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('should show 404 error when trying to delete a deleted data', function () {
    it('should show 404 error for deleted data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).delete("/api/" + id)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(404);
                    expect(res.body).toHaveProperty('status');
                    expect(res.body.status).toEqual('fail');
                    return [2 /*return*/];
            }
        });
    }); });
});
