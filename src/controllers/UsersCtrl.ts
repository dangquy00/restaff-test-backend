import {
    Authenticated,
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Required,
    Status
} from "@tsed/common";
import { NotFound } from "ts-httpexceptions";
import { User } from "../entity/User";
import { UsersService } from "../services/UsersService";

@Controller("/users")
export class UsersCtrl {

    constructor(private usersService: UsersService) { }

    @Post("/register")
    async register(@BodyParams() user: User) {
        return this.usersService.register(user);
    }

    @Post("/login")
    async login(
        @Required() @BodyParams("username") username: string,
        @Required() @BodyParams("password") password: string
    ) {
        return this.usersService.login(username, password);
    }

    @Post("/logout")
    async logout(
        @Required() @BodyParams("token") token: string
    ) {
        return this.usersService.logout(token);
    }

}
