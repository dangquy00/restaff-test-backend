"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const Config_1 = require("./Config");
class Utils {
    /**
     *
     * @param password "user password"
     * @returns passwordHash
     */
    static encodePassword(password) {
        return password;
    }
    static comparePassword(passwordHash, password) {
        return passwordHash === password;
    }
    static createToken(user) {
        return jwt.sign({ userId: user.id.toString(), createdAt: new Date().getTime() }, Config_1.CONFIG.JWT_HASH);
    }
    static verifyToken(token) {
        const tokenVerify = jwt.verify(token, Config_1.CONFIG.JWT_HASH);
        if (!tokenVerify)
            return null;
        return { userId: tokenVerify["userId"], createdAt: tokenVerify["createdAt"] };
    }
}
exports.default = Utils;
//# sourceMappingURL=Utils.js.map