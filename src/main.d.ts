import fs from "fs";
export default class TUAA {
    constructor();
    changeApiUrl(url: string): string;
    roku: {
        v1: {
            /**
             * This endpoint provides the Roku specified feed format for the Roku app.
             *
             * More info: https://docs.unusann.us/reference/api/roku/v1/feed
             */
            feed(): Promise<RokuFeed>;
        };
    };
    swift: {
        v1: {
            /**
             * This is just a modified version of `/v1/getallmetadata` that was added while the Swift app was being developed.
             *
             * The only thing different about it is that it outputs an object with two keys that contain arrays instead of an array containing 2 other arrays.
             *
             * More info: https://docs.unusann.us/reference/api/swift/v1/getallmetadata
             */
            getallmetadata(): Promise<SwiftGetAllMetadata>;
        };
    };
    v1: {
        /**
         * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
         *
         * More info: https://docs.unusann.us/reference/api/v1/getallmetadata
         */
        getallmetadata(): Promise<Array<Episode & OldEpisode>[]>;
        /**
         * This endpoint returns an array of all the episodes in season 0 (specials), in order.
         *
         * More info: https://docs.unusann.us/reference/api/v1/gets00metadata
         */
        gets00metadata(): Promise<Array<Episode & OldEpisode>>;
        /**
         * This endpoint returns an array of all the episodes in season 1, in order.
         *
         * More info: https://docs.unusann.us/reference/api/v1/gets01metadata
         */
        gets01metadata(): Promise<Array<Episode & OldEpisode>>;
        /**
         * This endpoint accepts a video ID as a path parameter and returns the specified video object.
         *
         * An example request path would be `/v1/getmetadata/s01.e001`.
         *
         * More info: https://docs.unusann.us/reference/api/v1/getvideodata
         *
         * @param video String; Unus Annus video ID. Example: `s01.e001`; Required parameter
         */
        getvideodata(video: string): Promise<Episode & OldEpisode>;
        /**
         * This endpoint accepts a video ID as a path parameter and returns the specified previews in the WEBVTT format.
         *
         * An example request path would be `/v1/getvidpreviews/s01.e001`.
         *
         * More info: https://docs.unusann.us/reference/api/v1/getvidpreviews
         *
         * @param video String; Unus Annus video ID. Example: `s01.e001`; Required parameter
         */
        getvidpreviews(video: string): Promise<string>;
    };
    v2: {
        account: {
            videoprogress: {
                /**
                 * Get the user's video progress for the specified episode.
                 *
                 * **THIS ENDPOINT IS NOT FULLY IMPLEMENTED YET**
                 *
                 * More info: https://docs.unusann.us/reference/api/v2/account/videoprogress#get-video-progress
                 *
                 * @param uid String; 32 character user ID; Required parameter
                 * @param loginKey String; 16 character login key/token; Required parameter
                 * @param uaid String; Unus Annus video ID. Example `s01.e001`; Required parameter
                 */
                get(uid: string, loginKey: string, uaid: string): Promise<VideoProgress>;
                /**
                 * Set the user's video progress for the specified episode.
                 *
                 * **THIS ENDPOINT IS NOT FULLY IMPLEMENTED YET**
                 *
                 * More info: https://docs.unusann.us/reference/api/v2/account/videoprogress#set-video-progress
                 *
                 * @param uid String; 32 character user ID; Required parameter
                 * @param loginKey String; 16 character login key/token; Required parameter
                 * @param uaid String; Unus Annus video ID. Example `s01.e001`; Required parameter
                 * @param progress Integer; Amount of seconds watched in video; Required parameter
                 */
                set(uid: string, loginKey: string, uaid: string, progress: number): Promise<VideoProgress>;
            };
            /**
             * Changes the user's profile picture
             *
             * More info: https://docs.unusann.us/reference/api/v2/account/changepfp
             *
             * @param pfp ReadStream | Path to file; Image file attached to body; Required parameter
             * @param loginKey 16 character login key/token; Required parameter
             */
            changepfp(pfp: fs.ReadStream | string, loginKey: string): Promise<ChangePFPResponse>;
            /**
             * Check the user's login key to see if they're logged in
             *
             * More info: https://docs.unusann.us/reference/api/v2/account/checkloginkey
             *
             * @param loginKey String; 16 character login key/token; Required parameter
             */
            checkloginkey(loginKey: string): Promise<CheckLoginKeyResponse>;
            /**
             * More info: https://docs.unusann.us/reference/api/v2/account/login
             *
             * @param username String; The user's username or email. If this field has an @ symbol in it, it will be processed as an email; otherwise it will be processed as a username. Required parameter
             * @param password String; Required parameter
             * @param sendEmail Boolean; Whether to send an email to the user after they login. This is always true unless the user creates an account for the first time. Optional parameter; will default to `true` if not provided.
             */
            login(username: string, password: string, sendEmail?: boolean): Promise<LoginResponse>;
            /**
             * More info: https://docs.unusann.us/reference/api/v2/account/logout
             *
             * @param loginKeys String[]; Array of 16 character login keys/tokens to logout or `["*"]` to logout all. Either this parameter, or `loginKey` is required in the request.
             * @param loginKey String; 16 character login key/token to logout singular device. Either this parameter, or `loginKeys` is required in the request.
             * @param id String; 32 character user ID; Required parameter
             */
            logout(id: string, loginKeys?: string[], loginKey?: string): Promise<LogoutResponse>;
            /**
             * More info: https://docs.unusann.us/reference/api/v2/account/signup
             *
             * @param email String; The user's email address; Required parameter
             * @param username String; The user's username; Required parameter
             * @param password String; The user's password; Required parameter
             * @param confirmpassword String; The user's password again as confirmation that it's correct. Required parameter
             */
            signup(email: string, username: string, password: string, confirmpassword: string): Promise<SignupResponse>;
        };
        comments: {
            /**
             * Gets a segmented list of comments from the specified video
             *
             * More info: https://docs.unusann.us/reference/api/v2/comments#get-comments
             *
             * @param video String; Unus Annus video ID. Example: `s01.e001`; Required parameter
             * @param from Integer | String; Select the first index for the segment of comments to recieve. Optional parameter; defaults to `0`
             * @param to Integer | String; Selects the last index for the segment of comments to recieve. Optional parameter; defaults to `20`
             */
            get(video: string, from?: number | string, to?: number | string): Promise<Comment[]>;
            /**
             * Posts a comment on the specified video
             *
             * More info: https://docs.unusann.us/reference/api/v2/comments#post-comment
             *
             * @param video String; Unus Annus video ID. Example: `s01.e001`; Required parameter
             * @param comment String; Comment data. Limited Markdown is accepted. Required parameter
             * @param loginKey String; 16 character login key/token; Required parameter
             */
            post(video: string, comment: string, loginKey: string): Promise<PostCommentResponse>;
        };
        metadata: {
            season: {
                /**
                 * This endpoint returns an array of all the episodes in season 0 (specials), in order.
                 *
                 * More info: https://docs.unusann.us/reference/api/v2/metadata/season#get-specials-metadata
                 */
                s00(): Promise<Array<Episode & OldEpisode>>;
                /**
                 * This endpoint returns an array of all the episodes in season 1, in order.
                 *
                 * More info: https://docs.unusann.us/reference/api/v2/metadata/season#get-season-1-metadata
                 */
                s01(): Promise<Array<Episode & OldEpisode>>;
            };
            /**
             * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
             *
             * More info: https://docs.unusann.us/reference/api/v2/metadata/all
             */
            all(): Promise<Array<Episode & OldEpisode>[]>;
            /**
             * This endpoint accepts a video ID as a path parameter and returns the specified video object.
             *
             * An example request would be `TUAA.v2.metadata.episode("s01.e001")`
             *
             * More info: https://docs.unusann.us/reference/api/v2/metadata/episode
             *
             * @param video String; Unus Annus video ID. Example `s01.e001`; Required parameter
             */
            episode(video: string): Promise<Episode & OldEpisode>;
        };
        /**
         * This endpoint accepts a video ID as a path parameter and returns the specified previews in the WEBVTT format.
         *
         * An example call of this function would be `TUAA.v2.preview("s01.e001")`
         *
         * More info: https://docs.unusann.us/reference/api/v2/preview
         *
         * @param video String; Unus Annus video ID; Example: `s01.e001`; Required parameter
         */
        preview(video: string): Promise<string>;
    };
    /**
     * More info: https://docs.unusann.us/reference/api/subtitles
     *
     * @param url String
     *
     * Path to subtitles. Example: ```https://usc1.contabostorage.com/a7f68355d8c442d8a7a1076a0ac5d924:videos/subs/01/001.en.vtt```
     *
     * Only accepts the following patterns:
     * * `https://usc1.contabostorage.com/a7f68355d8c442d8a7a1076a0ac5d924:videos/subs/*`
     * * `https://cdn.unusann.us/subs/*`
     * * `https://cdn.unusannusarchive.tk/subs/*`
     *
     * Required parameter
     */
    subtitles(url: string): Promise<string>;
}
export interface VideoProgress {
    uaid: string;
    progress: number;
}
export interface RokuFeed {
    providerName: "The Unus Annus Archive";
    lastUpdated: string;
    language: "en";
    playlists: RokuPlaylist[];
    series: RokuSeries[];
}
export interface RokuPlaylist {
    name: "Specials" | "Season 1";
    itemIds: string[];
}
export interface RokuSeries {
    id: "UnusAnnus";
    title: "Unus Annus";
    seasons: RokuSeason[];
    genres: ["comedy"];
    thumbnail: "https://cdn.unusann.us/roku-assets/series-thumbnail.jpg";
    releaseDate: "2019-11-15";
    shortDescription: '"What would you do if you only had a year left to live? Would you squander the time you were given? Or would you make every second count? Welcome to Unus Annus. In exactly 365 days this channel will be...';
    longDescription: "What would you do if you only had a year left to live? Would you squander the time you were given? Or would you make every second count? Welcome to Unus Annus. In exactly 365 days this channel will be deleted along with all of the daily uploads accumulated since then. Nothing will be saved. Nothing will be reuploaded. This is your one chance to join us at the onset of our adventure. To be there from the beginning. To make every second count. Subscribe now and relish what little time we have left or have the choice made for you as we disappear from existence forever. But remember... everything has an end. Even you. Memento mori. Unus annus.";
}
export interface RokuSeason {
    seasonNumber: "0" | "1";
    episodes: RokuEpisode[];
}
export interface RokuEpisode {
    id: string;
    title: string;
    content: RokuEpisodeContent;
    thumbnail: string;
    releaseDate: string;
    episodeNumber: number;
    shortDescription: "This episode doesn't have a description" | string;
    longDescription?: string;
}
export interface RokuEpisodeContent {
    dateAdded: string;
    videos: RokuVideo[];
    duration: number;
    captions: RokuCaption[];
    language: "en";
}
export interface RokuVideo {
    url: string;
    quality: "UHD" | "FHD" | "HD" | "SD";
    videoType: "MP4";
}
export interface RokuCaption {
    url: string;
    language: string;
    captionType: "SUBTITLE";
}
export interface SwiftGetAllMetadata {
    specials: Array<Episode & OldEpisode>;
    season1: Array<Episode & OldEpisode>;
}
export interface Episode {
    sources: Source[];
    tracks: Track[];
    posters: Poster[];
    season: 0 | 1;
    episode: number;
    title: string;
    description: string;
    date: number;
    duration: number;
    islast?: boolean;
}
export interface Source {
    src: string;
    type: "video/mp4";
    size: number;
}
export interface Track {
    kind: "captions";
    label: string;
    srclang: string;
    src: string;
}
export interface Poster {
    src: string;
    type: "image/webp" | "image/jpeg";
}
export interface OldEpisode {
    video: string;
    season: 0 | 1;
    episode: number;
    title: string;
    description: string;
    releasedate: number;
    thumbnail: string;
    islast?: boolean;
}
export interface Song {
    audio: string;
    title: string;
    type: string;
    artist: string;
    thumbnail: string;
    i: string;
    number: number;
    islastsong?: boolean;
}
export interface ChangePFPResponse {
    status?: "success" | string;
    error?: "Not logged in!" | string;
}
export interface CheckLoginKeyResponse {
    isValid: boolean;
    user?: LimitedUser;
}
export interface LimitedUser {
    id: string;
    email: string;
    username: string;
    pfp: UserPFP;
}
export interface UserPFP {
    originalFilename: string;
    filename: string;
    width: number;
    height: number;
    format: "image/jpeg";
}
export interface LoginResponse {
    isValid?: boolean;
    loginKey?: string;
    user?: LimitedUser;
}
export interface LogoutResponse {
    status: "success" | "error";
    error?: "Account does not exist!" | string;
}
export interface SignupResponse {
    success: boolean;
    loginURI?: "/api/v2/account/login";
    error?: {
        code: 0 | 1 | 2 | number;
        message: "Passwords do not match!" | "Account exists!" | "Missing info!" | string;
    };
}
export interface Comment {
    episode: string;
    uid: string;
    comment: CommentBody;
    stats: CommentStats;
    user: CommentUser;
}
export interface CommentBody {
    plaintext: string;
    html: string;
}
export interface CommentStats {
    published: number;
    likes: number;
    dislikes: number;
}
export interface CommentUser {
    id: string;
    username: string;
    pfp: UserPFP;
}
export interface PostCommentResponse {
    status?: "success";
    comment?: Comment;
    error?: {
        code: 3 | "401" | number | string;
        message: "Invalid message length!" | "Unauthorized!" | string;
    };
}
export interface FileSizeResponse {
    filesize: {
        bytes: number;
        kb: number;
        mb: number;
        gb: number;
        tb: number;
    };
}
