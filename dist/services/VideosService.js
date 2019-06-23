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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const Config_1 = require("../utils/Config");
const enum_1 = require("../enum");
const searchYoutube = require("youtube-api-v3-search");
let VideosService = class VideosService {
    constructor() { }
    getListVideo(lat, lng, radius, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // End of list video
            const apiKey = Config_1.CONFIG.YOUTUBE_API_KEY;
            const options = {
                location: lat + "," + lng,
                locationRadius: radius + "km",
                pageToken,
                part: "snippet",
                type: "video"
            };
            const result = yield searchYoutube(apiKey, options);
            if (result && result.items) {
                return {
                    code: enum_1.HttpCode.SUCCESS,
                    items: result.items,
                    nextPageToken: result.nextPageToken,
                    prevPageToken: result.prevPageToken,
                    totalVideo: result.pageInfo.totalResults
                };
            }
            return {
                code: enum_1.HttpCode.NOTFOUND,
                items: [],
                nextPageToken: "",
                prevPageToken: "",
                totalVideo: 0
            };
        });
    }
};
VideosService = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [])
], VideosService);
exports.VideosService = VideosService;
//# sourceMappingURL=VideosService.js.map