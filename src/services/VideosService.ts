import { Service, Status } from "@tsed/common";
import { CONFIG } from "../utils/Config";
import { IVideoSearchResult } from "../interfaces";
import { HttpCode } from "../enum";

const searchYoutube = require("youtube-api-v3-search");

@Service()
export class VideosService {
    constructor() { }
    async getListVideo(lat: string, lng: string, radius: number, pageToken: string): Promise<IVideoSearchResult> {
        // End of list video
        const apiKey = CONFIG.YOUTUBE_API_KEY;
        const options = {
            location: lat + "," + lng,
            locationRadius: radius + "km",
            pageToken,
            part: "snippet",
            type: "video"
        };

        const result = await searchYoutube(apiKey, options);
        if (result && result.items) {
            return {
                code: HttpCode.SUCCESS,
                items: result.items,
                nextPageToken: result.nextPageToken,
                prevPageToken: result.prevPageToken,
                totalVideo: result.pageInfo.totalResults
            };
        }
        return {
            code: HttpCode.NOTFOUND,
            items: [],
            nextPageToken: "",
            prevPageToken: "",
            totalVideo: 0
        };
    }
}