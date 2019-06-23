export interface IUserLogin {
    user: { fullname: string };
    token: string;
    code: number;
}

export interface ITokenInfo {
    userId: string;
    createdAt: number;
}

export interface IVideoSearchResult {
    code: number;
    prevPageToken: string;
    nextPageToken: string;
    items: [];
    totalVideo: 0;
}