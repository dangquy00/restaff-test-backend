"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
require("@tsed/swagger");
const ts_log_debug_1 = require("ts-log-debug");
const Middleware_1 = require("./utils/Middleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const rootDir = __dirname;
const port = process.env.PORT || 8002;
let Server = class Server extends common_1.ServerLoader {
    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    $onMountingMiddlewares() {
        this
            .use(common_1.GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
            extended: true
        }))
            .use(cors());
        return null;
    }
    $onReady() {
        ts_log_debug_1.$log.debug("Server initialized");
        console.debug("Server initialized");
    }
    $afterRoutesInit() {
        this.use(Middleware_1.ErrorHandlerMiddleware);
    }
    $onServerInitError(error) {
        ts_log_debug_1.$log.error("Server encounter an error =>", error);
    }
};
Server = __decorate([
    common_1.ServerSettings({
        rootDir,
        port,
        mount: {
            "/api": `${rootDir}/controllers/*.ts`
        },
        statics: {
            "/": `${process.cwd()}/build`
        },
        acceptMimes: ["application/json"],
        typeorm: [
            {
                name: "default",
                type: "mongodb",
                url: "mongodb+srv://restaffDb:restaffDb@cluster0-sqkcy.mongodb.net/test?retryWrites=true&w=majority",
                useNewUrlParser: true,
                entities: [
                    `${__dirname}/entity/*{.ts,.js}`
                ],
                migrations: [
                    `${__dirname}/migrations/*{.ts,.js}`
                ],
                subscribers: [
                    `${__dirname}/subscriber/*{.ts,.js}`
                ]
            }
        ],
        logger: {
            debug: true,
            logRequest: true,
            requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
        },
        swagger: {
            path: "/api-docs"
        },
        debug: true
    })
], Server);
exports.Server = Server;
//# sourceMappingURL=Server.js.map