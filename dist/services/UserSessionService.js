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
const Utils_1 = require("../utils/Utils");
const UserSession_1 = require("../entity/UserSession");
let UserSessionService = class UserSessionService {
    constructor(typeORMService) {
        this.typeORMService = typeORMService;
    }
    $afterRoutesInit() {
        this.connection = this.typeORMService.get();
    }
    createSession(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = new UserSession_1.UserSession();
            session.token = Utils_1.default.createToken(user);
            session.user = user;
            this.connection.manager.save(UserSession_1.UserSession, session);
            return session.token;
        });
    }
    getUserLogin(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.connection.manager.findOne(UserSession_1.UserSession, { relations: ["user"], where: { token } });
            if (!session)
                return null;
            const tokenInfo = Utils_1.default.verifyToken(token);
            const user = yield this.connection.manager.findOne(User_1.User, tokenInfo.userId);
            return user;
        });
    }
    deleteUserSession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.manager.delete(UserSession_1.UserSession, { token });
            return result.affected === 1;
        });
    }
};
UserSessionService = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.TypeORMService])
], UserSessionService);
exports.UserSessionService = UserSessionService;
//# sourceMappingURL=UserSessionService.js.map