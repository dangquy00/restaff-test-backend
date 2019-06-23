import { Service, Status } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection, Code } from "typeorm";
import { User } from "../entity/User";
import { HTTPException } from "ts-httpexceptions";
import { HttpCode } from "../enum";
import { IUserLogin } from "../interfaces";
import Utils from "../utils/Utils";
import { UserSession } from "src/entity/UserSession";
import { UserSessionService } from "./UserSessionService";

@Service()
export class UsersService {
    connection: Connection;
    constructor(
        private typeORMService: TypeORMService,
        private userSessionService: UserSessionService
    ) { }

    $afterRoutesInit() {
        this.connection = this.typeORMService.get();
    }

    async create(user: User): Promise<User> {
        const findExist = await this.connection.manager.findOne(User, { where: { username: user.username } });
        if (findExist) throw new HTTPException(HttpCode.BADREQUEST, "Username has exist.");

        user.password = Utils.encodePassword(user.password);
        return this.connection.manager.save(User, user);
    }

    async register(userInfo: User): Promise<IUserLogin> {
        const user = await this.create(userInfo);
        const token = User;
        return await this.login(userInfo.username, userInfo.password);
    }

    async login(username: string, password: string): Promise<IUserLogin> {
        const user = await this.connection.manager.findOne(User, {
            where: { "username": username }
        });
        if (!user) throw new HTTPException(HttpCode.FORBIDDEN, "Login not success");
        if (!Utils.comparePassword(user.password, password))
            throw new HTTPException(HttpCode.FORBIDDEN, "Login not success");

        const token = await this.userSessionService.createSession(user);
        return { code: HttpCode.SUCCESS, user: { fullname: user.fullname }, token };
    }

    async logout(token: string): Promise<boolean> {
        return this.userSessionService.deleteUserSession(token);
    }

    async isAuthenticated(token: string): Promise<User> {
        return this.userSessionService.getUserLogin(token);
    }
}