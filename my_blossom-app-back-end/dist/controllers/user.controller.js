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
exports.loginUser = exports.createUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_model_1 = __importDefault(require("../models/user-model"));
var getUserToken = function (_id) {
    var authenticatedUserToken = jsonwebtoken_1.default.sign({ _id: _id }, "express", { expiresIn: "7d", });
    return authenticatedUserToken;
};
var createUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, existingUser, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = request.body, name_1 = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })
                    //console.dir(existingUser)
                ];
            case 1:
                existingUser = _b.sent();
                //console.dir(existingUser)
                if (existingUser) {
                    return [2 /*return*/, response.status(409).send("user already exist")];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 12)];
            case 2:
                hashedPassword = _b.sent();
                console.log("created hash: ", hashedPassword);
                return [4 /*yield*/, user_model_1.default.create({
                        name: name_1,
                        email: email,
                        password: hashedPassword,
                    })];
            case 3:
                user = _b.sent();
                return [2 /*return*/, response.status(201).send({ message: "User created successfully" })];
            case 4:
                error_1 = _b.sent();
                console.log('error in createUser', error_1);
                throw (error_1);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var loginUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, isPasswordIdentical, _b, _c, _d, token, _e, _f, _g, error_2;
    var _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _k.trys.push([0, 9, , 10]);
                _a = request.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 1:
                existingUser = (_k.sent()).$clone();
                if (!existingUser) {
                    return [2 /*return*/, response.status(409).send({ message: "User doesn't exist!" })];
                }
                _c = (_b = bcrypt_1.default).compare;
                _d = [password];
                return [4 /*yield*/, existingUser];
            case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([(_k.sent()).password]))];
            case 3:
                isPasswordIdentical = _k.sent();
                if (!isPasswordIdentical) return [3 /*break*/, 7];
                _e = getUserToken;
                return [4 /*yield*/, existingUser];
            case 4:
                token = _e.apply(void 0, [(_k.sent())._id]);
                _g = (_f = response).send;
                _h = {
                    token: token
                };
                _j = {};
                return [4 /*yield*/, existingUser];
            case 5:
                _j.email = (_k.sent()).email;
                return [4 /*yield*/, existingUser];
            case 6: return [2 /*return*/, _g.apply(_f, [(_h.user = (_j.name = (_k.sent()).name,
                        _j),
                        _h)])];
            case 7: return [2 /*return*/, response.status(400).send({ message: "Wrong credentials" })];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_2 = _k.sent();
                console.log('error in loginUser', error_2);
                throw (error_2);
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
