"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var category_routes_1 = __importDefault(require("./routes/category.routes"));
var task_routes_1 = __importDefault(require("./routes/task.routes"));
var application = (0, express_1.default)();
application.use(express_1.default.json());
var PORT = 1337;
(0, db_1.default)();
application.get("/ping", function (request, response) {
    response.send("Pong");
});
application.use("/users", user_routes_1.default);
application.use("/categories", category_routes_1.default);
application.use("/tasks", task_routes_1.default);
application.listen(PORT, function () {
    console.log("Server up and running");
});
