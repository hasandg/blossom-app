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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.editTask = exports.deleteTask = exports.toggleTaskStatus = exports.createTask = exports.getTasksForToday = exports.getAllCompletedTasks = exports.getAllTasksByCategory = exports.getAllTasks = void 0;
var task_model_1 = __importDefault(require("../models/task-model"));
var getAllTasks = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, tasks, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = request.user;
                return [4 /*yield*/, task_model_1.default.find({
                        user: userId,
                    })];
            case 1:
                tasks = _a.sent();
                response.send(tasks);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log("error in getAllTasks", error_1);
                response.send({ error: "Error while fetching tasks" });
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllTasks = getAllTasks;
var getAllTasksByCategory = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, id, tasks, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = request.user;
                id = request.params.id;
                return [4 /*yield*/, task_model_1.default.find({
                        user: userId,
                        categoryId: id,
                    })];
            case 1:
                tasks = _a.sent();
                response.send(tasks);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log("error in getAllTasksByCategory", error_2);
                response.send({ error: "Error while fetching tasks" });
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllTasksByCategory = getAllTasksByCategory;
var getAllCompletedTasks = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, tasks, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = request.user;
                return [4 /*yield*/, task_model_1.default.find({
                        user: userId,
                        isCompleted: true,
                    })];
            case 1:
                tasks = _a.sent();
                response.send(tasks);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log("error in getAllCompletedTasks", error_3);
                response.send({ error: "Error while fetching tasks" });
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllCompletedTasks = getAllCompletedTasks;
var getTasksForToday = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, todaysISODate, tasks, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = request.user;
                todaysISODate = new Date();
                todaysISODate.setHours(0, 0, 0, 0);
                return [4 /*yield*/, task_model_1.default.find({
                        user: userId,
                        date: todaysISODate.toISOString(),
                    })];
            case 1:
                tasks = _a.sent();
                response.send(tasks);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log("error in getTasksForToday", error_4);
                response.send({ error: "Error while fetching tasks" });
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTasksForToday = getTasksForToday;
var createTask = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, name_1, date, categoryId, task, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = request.user;
                _a = request.body, name_1 = _a.name, date = _a.date, categoryId = _a.categoryId;
                return [4 /*yield*/, task_model_1.default.create({
                        name: name_1,
                        date: date,
                        categoryId: categoryId,
                        user: userId,
                    })];
            case 1:
                task = _b.sent();
                response.send(task);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                console.log("error in createTask", error_5);
                response.send({ error: "Error while creating task" });
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createTask = createTask;
var toggleTaskStatus = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var isCompleted, id, task, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                isCompleted = request.body.isCompleted;
                id = request.params.id;
                return [4 /*yield*/, task_model_1.default.updateOne({
                        _id: id,
                    }, {
                        isCompleted: isCompleted,
                    })];
            case 1:
                task = _a.sent();
                response.send({ message: "Task status updated" });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.log("error in toggleTaskStatus", error_6);
                response.send({ error: "Error while toggling status task" });
                throw error_6;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.toggleTaskStatus = toggleTaskStatus;
var deleteTask = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = request.params.id;
                return [4 /*yield*/, task_model_1.default.deleteOne({
                        _id: id,
                    })];
            case 1:
                _a.sent();
                response.send({ message: "Task deleted" });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.log("error in deleteTask", error_7);
                response.send({ error: "Error while deleting task" });
                throw error_7;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteTask = deleteTask;
var editTask = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, categoryId, date, name_2, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = request.body, _id = _a._id, categoryId = _a.categoryId, date = _a.date, name_2 = _a.name;
                return [4 /*yield*/, task_model_1.default.updateOne({
                        _id: _id,
                    }, {
                        $set: {
                            name: name_2,
                            categoryId: categoryId,
                            date: date,
                        },
                    })];
            case 1:
                _b.sent();
                response.send({ message: "Task updated successfully" });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _b.sent();
                console.log("error in editTask", error_8);
                response.send({ error: " Error while updating the task" });
                throw error_8;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editTask = editTask;
