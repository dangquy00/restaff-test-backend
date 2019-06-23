"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["SUCCESS"] = 200] = "SUCCESS";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["ACCEPTED"] = 202] = "ACCEPTED";
    HttpCode[HttpCode["NOCONTENT"] = 204] = "NOCONTENT";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["TOKEN_ERROR"] = 402] = "TOKEN_ERROR";
    HttpCode[HttpCode["BADREQUEST"] = 400] = "BADREQUEST";
    HttpCode[HttpCode["NOTFOUND"] = 404] = "NOTFOUND";
    HttpCode[HttpCode["METHODNOTALLOWED"] = 405] = "METHODNOTALLOWED";
    HttpCode[HttpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCode[HttpCode["ERROR"] = 500] = "ERROR";
})(HttpCode = exports.HttpCode || (exports.HttpCode = {}));
//# sourceMappingURL=index.js.map