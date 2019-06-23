import * as jwt from "jsonwebtoken";
import { User } from "src/entity/User";
import { ITokenInfo } from "src/interfaces";
import { CONFIG } from "./Config";


export default class Utils {
    /**
     * 
     * @param password "user password"
     * @returns passwordHash
     */
    static encodePassword(password: string) {
        return password;
    }

    static comparePassword(passwordHash:string, password: string) {
        return passwordHash === password;
    }

    static createToken(user: User): string {
        return jwt.sign({ userId: user.id.toString(), createdAt: new Date().getTime() }, CONFIG.JWT_HASH);
    }

    static verifyToken(token: string): ITokenInfo {
        const tokenVerify = jwt.verify(token, CONFIG.JWT_HASH);
        if (!tokenVerify) return null;

        return { userId: tokenVerify["userId"], createdAt: tokenVerify["createdAt"] };
    }
}