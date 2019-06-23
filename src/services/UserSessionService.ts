import { Service, Status } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection, Code } from "typeorm";
import { User } from "../entity/User";
import { HTTPException } from "ts-httpexceptions";
import { HttpCode } from "../enum";
import { IUserLogin } from "../interfaces";
import Utils from "../utils/Utils";
import { UserSession } from "../entity/UserSession";

@Service()
export class UserSessionService {
    connection: Connection;
    constructor(private typeORMService: TypeORMService) { }

    $afterRoutesInit() {
        this.connection = this.typeORMService.get();
    }

    async createSession(user: User): Promise<string> {
        const session = new UserSession();
        session.token = Utils.createToken(user);
        session.user = user;
        this.connection.manager.save(UserSession, session);
        return session.token;
    }

    async getUserLogin(token: string): Promise<User> {
        const session = await this.connection.manager.findOne(UserSession, { relations: ["user"], where: { token } });
        if (!session) return null;
        const tokenInfo = Utils.verifyToken(token);
        const user = await this.connection.manager.findOne(User, tokenInfo.userId);
        return user;
    }

    async deleteUserSession(token: string): Promise<boolean> {
        const result = await this.connection.manager.delete(UserSession, { token });
        return result.affected === 1;
    }
}