import fs from 'fs';
export default class TUAA {
    constructor();
    changeApiUrl(url: string): string;
    changeCdnUrl(url: string): string;
    roku: {
        v1: {
            /**
             * This endpoint provides the roku specified feed format for the roku app.
             *
             * More info: https://api.unusann.us/docs/?page=/api/roku/v1/feed
             */
            feed(): Promise<RokuFeed>;
        };
    };
    swift: {
        v1: {
            /**
             * This is just a modified version of `TUAA.v1.getallmetadata()` that was added while the Swift app was being developed.
             *
             * The only thing different about it is that it outputs an object with 2 keys that contain an array instead of an array containing 2 other arrays.
             *
             * `TUAA.v1.getallmetadata()`:
             * ```json
             *  [
             *    [
             *      "season 0"
             *    ],
             *    [
             *      "season 1"
             *    ]
             *  ]
             * ```
             *
             * `TUAA.swift.v1.getallmetadata()`:
             * ```json
             *  {
             *    "specials": [
             *      "season 0"
             *    ],
             *    "season1": [
             *      "season 1"
             *    ]
             *  }
             * ```
             *
             * More info: https://api.unusann.us/docs/?page=/api/swift/v1/getallmetadata
             */
            getallmetadata(): Promise<SwiftGetAllMetadata>;
        };
    };
    v1: {
        /**
         * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
         *
         * More info: https://api.unusann.us/docs/?page=/api/v1/getallmetadata
        */
        getallmetadata(): Promise<Array<Episode & OldEpisode>[]>;
        /**
         * This endpoint returns an array of all the episodes in season 0 (specials), in order.
         *
         * More info: https://api.unusann.us/docs/?page=/api/v1/gets00metadata
        */
        gets00metadata(): Promise<Array<Episode & OldEpisode>>;
        /**
         * This endpoint returns an array of all the episodes in season 1, in order.
         *
         * More info: https://api.unusann.us/docs/?page=/api/v1/gets01metadata
        */
        gets01metadata(): Promise<Array<Episode & OldEpisode>>;
        /**
         * This endpoint accepts a video id as an argument and returns the specified video object.
         *
         * An example call of this function would be `TUAA.v1.getvideodata('s01.e001)`
         *
         * More info: https://api.unusann.us/docs/?page=/api/v1/getvideodata
         */
        getvideodata(videoId: string): Promise<Episode & OldEpisode>;
        /**
         * This endpoint accepts a video id as an argument and returns the specified previews in the `WEBVTT` format.
         *
         * An example call of this function would be `TUAA.v1.getvidpreviews('s01.e001')`
         *
         * More info: https://api.unusann.us/docs/?page=/api/v1/getvidpreviews
         */
        getvidpreviews(videoId: string): Promise<string>;
    };
    v2: {
        account: {
            /**
             * This endpoint accepts a POST request with the `multipart/form-data` encoding type.
             *
             * It accepts a file input which is a file upload of the profile picture, and a `loginKey` input which contains the loginKey in plaintext.
             *
             * You can also add a redirect query variable to the request to make it redirect to a certain page instead of sending a response.
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/account/changepfp
             */
            changepfp(pfp: fs.ReadStream | string, loginKey: string): Promise<ChangePFPResponse>;
            /**
             * This endpoint accepts a `POST` request with the `application/json` encoding type.
             *
             * It accepts a `loginKey` in the JSON body which contains the user's login key.
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/account/checkloginkey
             */
            checkloginkey(loginKey: string): Promise<CheckLoginKeyResponse>;
            /**
             * This endpoint accepts a `POST` request with the `application/json` encoding type.
             *
             * It accepts a `username` and `password` in the JSON body.
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/account/login
             */
            login(username: string, password: string): Promise<LoginResponse>;
            /**
             * This endpoint accepts a `POST` request with the `application/json` encoding type.
             *
             * It accepts an `id` value containing the user ID, and a `loginKey` containing the login key you want to logout.
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/account/logout
             */
            logout(id: string, loginKey: string): Promise<LogoutResponse>;
            /**
             * This endpoint accepts a `POST` request with the `application/json` encoding type.
             *
             * It accepts an `id` value containing the user ID of the user you'd like to remove all logins from.
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/account/logoutall
             */
            logoutall(id: string): Promise<LogoutResponse>;
            /**
             * This endpoint accepts a `POST` request with the `application/json` encoding type.
             *
             * It accepts the following values in the JSON body: `email`, `username`, `password`, and `confirmpassword`
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/account/signup
             */
            signup(email: string, username: string, password: string, confirmpassword: string): Promise<SignupResponse>;
        };
        comments: {
            /**
             * This endpoint accepts a video id as an argument and returns an array of comment objects.
             *
             * It also has optional `from` and `to` query variables that control how many comments get sent.
             *
             * An example call of this function would be `TUAA.v2.comments.get('s01.e001', 0, 20)`.
             *
             * Another example could be `TUAA.v2.comments.get('s01.e002', '0', '20')`.
             *
             * And another could be `TUAA.v2.comments.get('s01.e003')`, which would default to from being `0` and to being `20`
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/comments/get
             */
            get(videoId: string, from?: number | string, to?: number | string): Promise<Comment[]>;
            /**
             * This endpoint accepts a `POST` request with the `application/json` encoding type.
             *
             * It accepts  a `loginKey` and a `comment` (a plaintext string of the comment's text)
             *
             * An example call of this function would be `TUAA.v2.comments.post('s01.e001')
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/comments/post
             */
            post(videoId: string, comment: string, loginKey: string): Promise<PostCommentResponse>;
        };
        metadata: {
            season: {
                /**
                 * This endpoint returns an array of all the episodes in season 0 (specials), in order.
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/v2/metadata/video/season/s00
                 */
                s00(): Promise<Array<Episode & OldEpisode>>;
                /**
                 * This endpoint returns an array of all the episodes in season 1, in order.
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/v2/metadata/video/season/s01
                 */
                s01(): Promise<Array<Episode & OldEpisode>>;
            };
            /**
             * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/metadata/video/all
             */
            all(): Promise<Array<Episode & OldEpisode>[]>;
            /**
             * This endpoint accepts a video id as an argument and returns the specified video object.
             *
             * An example call of this function would be `TUAA.v2.metadata.video.episode('s01.e001')
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/metadata/video/episode
             */
            episode(videoId: string): Promise<Episode & OldEpisode>;
        };
        /**
         * This endpoint accepts a video id as a url argument and returns the specified previews in the WEBVTT format.
         *
         * An example call of this function would be `TUAA.v2.preview('s01.e001')`
         *
         * More info: https://api.unusann.us/docs/?page=/api/v2/preview
         */
        preview(videoId: string): Promise<string>;
    };
    /**
     * This gets the download url for a video from it's video id a specified resolution.
     *
     * The generated url will send the file with `content-disposition` set to `attachment`, and `content-type` set to `application/octet-stream` so the browser will download it instead of displaying it inline.
     *
     * You can also provide an optional filename, which will set `content-disposition` to `attachment; filename=<filename>` so the browser will download the file with a custom filename.
     */
    getVideoDownloadPathFromVideoID(videoId: string, filename?: string): Promise<string>;
    /**
     * This gets the download url for a video from a video url.
     *
     * The generated url will send the file with `content-disposition` set to `attachment`, and `content-type` set to `application/octet-stream` so the browser will download it instead of displaying it inline.
     *
     * You can also provide an optional filename, which will set `content-disposition` to `attachment; filename=<filename>` so the browser will download the file with a custom filename.
     */
    getVideoDownloadPathFromVideoURL(videoURL: string, filename?: string): string;
    /**
     * This runs ffprobe on the specified cdn video path
     *
     * To find the cdn video path, go to https://cdn.unusann.us and browse for the video, then take the current path (will start with a `/`), and use it here.
     *
     * More info: https://api.unusann.us/docs/?page=/ffprobe
     */
    ffprobe(videoPath: string): Promise<string>;
    /**
     * This gets the size of the specified file/folder on the cdn.
     *
     * To get a path on the cdn, go to https://cdn.unusann.us and browse for the folder/file you want, then take the current path (will start with a `/`) and use it here.
     *
     * More info: https://api.unusann.us/docs/?page=/filesize
     */
    filesize(path: string): Promise<FileSizeResponse>;
}
export interface RokuFeed {
    providerName: 'The Unus Annus Archive';
    lastUpdated: string;
    language: 'en';
    playlists: RokuPlaylist[];
    series: RokuSeries[];
}
export interface RokuPlaylist {
    name: 'Specials' | 'Season 1';
    itemIds: string[];
}
export interface RokuSeries {
    id: 'UnusAnnus';
    title: 'Unus Annus';
    seasons: RokuSeason[];
    genres: ['comedy'];
    thumbnail: 'https://cdn.unusann.us/roku-assets/series-thumbnail.jpg';
    releaseDate: '2019-11-15';
    shortDescription: '"What would you do if you only had a year left to live? Would you squander the time you were given? Or would you make every second count? Welcome to Unus Annus. In exactly 365 days this channel will be...';
    longDescription: 'What would you do if you only had a year left to live? Would you squander the time you were given? Or would you make every second count? Welcome to Unus Annus. In exactly 365 days this channel will be deleted along with all of the daily uploads accumulated since then. Nothing will be saved. Nothing will be reuploaded. This is your one chance to join us at the onset of our adventure. To be there from the beginning. To make every second count. Subscribe now and relish what little time we have left or have the choice made for you as we disappear from existence forever. But remember... everything has an end. Even you. Memento mori. Unus annus.';
}
export interface RokuSeason {
    seasonNumber: '0' | '1';
    episodes: RokuEpisode[];
}
export interface RokuEpisode {
    id: string;
    title: string;
    content: RokuEpisodeContent;
    thumbnail: string;
    releaseDate: string;
    episodeNumber: number;
    shortDescription: 'This episode doesn\'t have a description' | string;
    longDescription?: string;
}
export interface RokuEpisodeContent {
    dateAdded: string;
    videos: RokuVideo[];
    duration: number;
    captions: RokuCaption[];
    language: 'en';
}
export interface RokuVideo {
    url: string;
    quality: 'UHD' | 'FHD' | 'HD' | 'SD';
    videoType: 'MP4';
}
export interface RokuCaption {
    url: string;
    language: string;
    captionType: 'SUBTITLE';
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
    type: 'video/mp4';
    size: number;
}
export interface Track {
    kind: 'captions';
    label: string;
    srclang: string;
    src: string;
}
export interface Poster {
    src: string;
    type: 'image/webp' | 'image/jpeg';
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
    status?: 'success' | string;
    error?: 'Not logged in!' | string;
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
    format: 'image/jpeg';
}
export interface LoginResponse {
    isValid?: boolean;
    loginKey?: string;
    user?: LimitedUser;
}
export interface LogoutResponse {
    status: 'success' | 'error';
    error?: 'Account does not exist!' | string;
}
export interface SignupResponse {
    success: boolean;
    loginURI?: '/api/v2/account/login';
    error?: {
        code: 0 | 1 | 2 | number;
        message: 'Passwords do not match!' | 'Account exists!' | 'Missing info!' | string;
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
    status?: 'success';
    comment?: Comment;
    error?: {
        code: 3 | '401' | number | string;
        message: 'Invalid message length!' | 'Unauthorized!' | string;
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
