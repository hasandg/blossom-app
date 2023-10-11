"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var task_controller_1 = require("../controllers/task.controller");
var middleware_1 = require("../middleware");
var taskRoutes = express_1.default.Router();
taskRoutes.use(middleware_1.authenticationMiddleware);
taskRoutes.route("/").get(task_controller_1.getAllTasks);
taskRoutes.route("/compeleted").get(task_controller_1.getAllCompletedTasks);
taskRoutes.route("/today").get(task_controller_1.getTasksForToday);
taskRoutes.route("/tasks-by-category/:id").get(task_controller_1.getAllTasksByCategoryId);
taskRoutes.route("/").post(task_controller_1.createTask);
taskRoutes.route("/:id").put(task_controller_1.toogleTaskStatus);
exports.default = taskRoutes;
