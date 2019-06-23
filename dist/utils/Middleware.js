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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const ts_httpexceptions_1 = require("ts-httpexceptions");
const Express = require("express");
const enum_1 = require("../enum");
const UsersService_1 = require("../services/UsersService");
let ErrorHandlerMiddleware = class ErrorHandlerMiddleware {
    use(error, request, response, next) {
        if (response.headersSent) {
            return next(error);
        }
        request.log.debug(error);
        console.log(error);
        if (error instanceof ts_httpexceptions_1.Exception || error.status) {
            return response.status(200).json({
                code: error.status,
                message: error.message
            });
        }
        if (typeof error === "string") {
            return response.status(200).json({
                code: 404,
                message: error
            });
        }
        request.log.error({
            error: {
                status: 500,
                message: error.message,
                stack: error.stack
            }
        });
        return response.status(200).json({
            code: 500,
            message: error.message
        });
    }
};
__decorate([
    __param(0, common_1.Err()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __param(3, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Function]),
    __metadata("design:returntype", Object)
], ErrorHandlerMiddleware.prototype, "use", null);
ErrorHandlerMiddleware = __decorate([
    common_1.MiddlewareError()
], ErrorHandlerMiddleware);
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
let RequireUserLoggedIn = class RequireUserLoggedIn {
    constructor(userService) {
        this.userService = userService;
    }
    use(request, response, next) {
        const token = (request.get("authorization") || "").replace("Token", "").trim();
        if (!token)
            throw new ts_httpexceptions_1.HTTPException(enum_1.HttpCode.UNAUTHORIZED, "Bạn cần đăng nhập để tiếp tục");
        this.userService.isAuthenticated(token)
            .then(user => {
            if (!user)
                return next(new ts_httpexceptions_1.HTTPException(enum_1.HttpCode.UNAUTHORIZED, "Bạn cần đăng nhập để tiếp tục"));
            next();
        }).catch(error => { next(error); });
    }
};
__decorate([
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __param(2, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], RequireUserLoggedIn.prototype, "use", null);
RequireUserLoggedIn = __decorate([
    common_1.Middleware(),
    __metadata("design:paramtypes", [UsersService_1.UsersService])
], RequireUserLoggedIn);
exports.RequireUserLoggedIn = RequireUserLoggedIn;
//# sourceMappingURL=Middleware.js.map