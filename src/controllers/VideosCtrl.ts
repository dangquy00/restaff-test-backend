import { RequireUserLoggedIn } from "../utils/Middleware";
import { Controller, Get, QueryParams, UseBefore, Required } from "@tsed/common";
import { VideosService } from "../services/VideosService";

@Controller("/videos")
export class VideosCtrl {

    constructor(private videosService: VideosService) { }

    @Get("/")
    @UseBefore(RequireUserLoggedIn)
    async getListVideo(
        @Required() @QueryParams("lat") lat: string,
        @Required() @QueryParams("lng") lng: string,
        @Required() @QueryParams("radius") radius = 1,
        @QueryParams("pageToken") pageToken
    ) {
        return this.videosService.getListVideo(lat, lng, radius, pageToken);
    }
}
