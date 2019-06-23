import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from "@tsed/common";
import "@tsed/swagger";
import { $log } from "ts-log-debug";
import { ErrorHandlerMiddleware } from "./utils/Middleware";
const cors = require("cors");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const rootDir = __dirname;
const port = process.env.PORT || 8002;
@ServerSettings({
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
export class Server extends ServerLoader {
    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    $onMountingMiddlewares(): void | Promise<any> {
        this
            .use(GlobalAcceptMimesMiddleware)
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
        $log.debug("Server initialized");
        console.debug("Server initialized");
    }

    $afterRoutesInit() {
        this.use(ErrorHandlerMiddleware);
    }
    $onServerInitError(error): any {
        $log.error("Server encounter an error =>", error);
    }
}
