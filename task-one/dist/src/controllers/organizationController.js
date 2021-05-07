"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.deleteOrganization = exports.updateOrganization = exports.getOneOrganization = exports.getAllOrganizations = exports.createOrganization = void 0;
var fs_1 = __importDefault(require("fs"));
var dbPath = __dirname + "/../data/database.json";
var writeFile = function (data) {
    fs_1.default.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
var createOrganization = function (req, res) {
    try {
        var database = fs_1.default.readFileSync(dbPath, 'utf-8');
        var oldData = JSON.parse(database);
        var lastId = oldData[oldData.length - 1].id;
        var newData = __assign(__assign({}, req.body), { createdAt: new Date(Date.now()), id: lastId + 1 });
        var allData = __spreadArray(__spreadArray([], oldData), [newData]);
        writeFile(allData);
        res.status(201).json({
            status: 'success',
            data: newData,
        });
    }
    catch (error) {
        if (req.body) {
            var data = [__assign(__assign({}, req.body), { id: 1, createdAt: new Date(Date.now()) })];
            writeFile(data);
            res.status(200).json({
                status: 'success',
                data: data,
            });
        }
        else {
            res.status(400).json({
                status: 'bad req ❌',
                message: 'missing body',
            });
        }
    }
};
exports.createOrganization = createOrganization;
var getAllOrganizations = function (req, res) {
    try {
        var database = fs_1.default.readFileSync(dbPath, 'utf-8');
        var parsedData = JSON.parse(database);
        res.status(200).json({
            status: 'success',
            results: parsedData.length,
            data: parsedData,
        });
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'data not found',
        });
    }
};
exports.getAllOrganizations = getAllOrganizations;
var getOneOrganization = function (req, res) {
    try {
        var database = fs_1.default.readFileSync(dbPath, 'utf-8');
        var parsedData = JSON.parse(database);
        var requestedData = parsedData.find(function (el) { return el.id === +req.params.id; });
        if (!requestedData)
            throw new Error('data not found');
        res.status(200).json({
            status: 'success',
            data: requestedData,
        });
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'data not found',
        });
    }
};
exports.getOneOrganization = getOneOrganization;
var updateOrganization = function (req, res) {
    try {
        var database = fs_1.default.readFileSync(dbPath, 'utf-8');
        var parsedData = JSON.parse(database);
        var dataToUpdate = parsedData.find(function (el) { return el.id === +req.params.id; });
        var dataIndex = parsedData.findIndex(function (el) { return el.id === +req.params.id; });
        if (dataToUpdate) {
            var updatedData = __assign(__assign(__assign({}, dataToUpdate), req.body), { updatedAt: new Date(Date.now()) });
            parsedData.splice(dataIndex, 1, updatedData);
            writeFile(parsedData);
            res.status(200).json({
                status: 'success',
                data: updatedData,
            });
        }
        else {
            res.status(404).json({
                status: 'fail',
                message: 'document not found',
            });
        }
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'an error occurred',
        });
    }
};
exports.updateOrganization = updateOrganization;
var deleteOrganization = function (req, res) {
    try {
        var database = fs_1.default.readFileSync(dbPath, 'utf-8');
        var parsedData = JSON.parse(database);
        var dataToDelete = parsedData.find(function (el) { return el.id === +req.params.id; });
        var dataIndex = parsedData.findIndex(function (el) { return el.id === +req.params.id; });
        if (dataToDelete) {
            parsedData.splice(dataIndex, 1);
            writeFile(parsedData);
            res.status(200).json({
                status: 'success',
            });
        }
        else {
            res.status(404).json({
                status: 'fail',
                message: 'document not found',
            });
        }
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'an error occurred',
        });
    }
};
exports.deleteOrganization = deleteOrganization;
