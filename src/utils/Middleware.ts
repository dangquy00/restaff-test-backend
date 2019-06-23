import { MiddlewareError, IMiddlewareError, Err, Res, Next, Req, Middleware, IMiddleware } from "@tsed/common";
import { Exception, HTTPException } from "ts-httpexceptions";
import * as Express from "express";
import { HttpCode } from "../enum";
import { UsersService } from "../services/UsersService";

@MiddlewareError()
export class ErrorHandlerMiddleware implements IMiddlewareError {
    use(@Err() error: any,
        @Req() request: Express.Request,
        @Res() response: Express.Response,
        @Next() next: Express.NextFunction): any {

        if (response.headersSent) {
            return next(error);
        }
        request.log.debug(error);
        console.log(error);
        if (error instanceof Exception || error.status) {
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
}

@Middleware()
export class RequireUserLoggedIn implements IMiddleware {
    constructor(private userService: UsersService) { }
    use(@Req() request: Express.Request,
        @Res() response: Express.Response,
        @Next() next: Express.NextFunction): any {
        const token = (request.get("authorization") || "").replace("Token", "").trim();
        if (!token) throw new HTTPException(HttpCode.UNAUTHORIZED, "Bạn cần đăng nhập để tiếp tục");

        this.userService.isAuthenticated(token)
            .then(user => {
                if (!user) return  next(new HTTPException(HttpCode.UNAUTHORIZED, "Bạn cần đăng nhập để tiếp tục"));
                next();
            }).catch(error => {  next(error); });
    }
}