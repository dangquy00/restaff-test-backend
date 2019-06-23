"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const typeorm_1 = require("@tsed/typeorm");
const User_1 = require("../entity/User");
const ts_httpexceptions_1 = require("ts-httpexceptions");
const enum_1 = require("../enum");
const Utils_1 = require("../utils/Utils");
const UserSessionService_1 = require("./UserSessionService");
let UsersService = class UsersService {
    constructor(typeORMService, userSessionService) {
        this.typeORMService = typeORMService;
        this.userSessionService = userSessionService;
    }
    $afterRoutesInit() {
        this.connection = this.typeORMService.get();
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = Utils_1.default.encodePassword(user.password);
            return this.connection.manager.save(User_1.User, user);
        });
    }
    register(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.create(userInfo);
            const token = User_1.User;
            return yield this.login(userInfo.username, userInfo.password);
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.connection.manager.findOne(User_1.User, {
                where: { "username": username }
            });
            if (!user)
                throw new ts_httpexceptions_1.HTTPException(enum_1.HttpCode.UNAUTHORIZED, "Đăng nhập không thành công");
            if (!Utils_1.default.comparePassword(user.password, password))
                throw new ts_httpexceptions_1.HTTPException(enum_1.HttpCode.UNAUTHORIZED, "Đăng nhập không thành công");
            const token = yield this.userSessionService.createSession(user);
            return { user: { fullname: user.fullname }, token };
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userSessionService.deleteUserSession(token);
        });
    }
    isAuthenticated(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userSessionService.getUserLogin(token);
        });
    }
};
UsersService = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.TypeORMService,
        UserSessionService_1.UserSessionService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=UsersService.1.js.map