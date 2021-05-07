"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var morgan_1 = __importDefault(require("morgan"));
var express_1 = __importDefault(require("express"));
var organizationRoutes_1 = __importDefault(require("./routes/organizationRoutes"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use('/api', organizationRoutes_1.default);
exports.default = app;
