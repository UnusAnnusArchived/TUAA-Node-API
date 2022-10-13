import PocketBase from "pocketbase";
import type { User } from "pocketbase";
import { CommentSortTypes, EmailPreferences, Episode, RokuFeed, SwiftGetAllMetadata } from "./types";
export default class TUAA {
    pb: PocketBase;
    pbUser: User;
    apiUrl: string;
    constructor(pocketBaseUrl?: string, apiUrl?: string);
    endpoints: {
        roku: {
            v1: {
                /**
                 * ### Roku Feed
                 * #### `/roku/v1/feed`
                 *
                 * This endpoint provides the Roku specified feed format for the Roku app.
                 *
                 * @returns
                 * * 200: OK
                 *   * Type: `Promise<RokuFeed>`
                 *   * Will return with ~12k lines of JSON with info about every video.
                 *
                 * @see {@link https://docs.unusann.us/endpoints/api/roku/v1/feed}
                 */
                feed: () => Promise<RokuFeed>;
            };
        };
        swift: {
            v1: {
                /**
                 * ### Swift Get All Metadata
                 * #### `/swift/v1/getallmetadata`
                 *
                 * This is just a modified version of `/v1/getallmetadata` that was added while the Swift app was being developed.
                 *
                 * The only thing different about it is that it outputs an object with two keys that contain arrays instead of an array containing 2 other arrays.
                 *
                 * @returns
                 * * 200: OK
                 *   * `Promise<SwiftGetAllMetadata>`
                 *
                 * @see {@link https://docs.unusann.us/endpoints/api/swift/v1/getallmetadata}
                 */
                getallmetadata: () => Promise<SwiftGetAllMetadata>;
            };
        };
        v1: {
            /**
             * ### Get All Metadata
             * #### `/v1/getallmetadata`
             *
             * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
             *
             * #### Responses
             * * 200: OK
             *
             * @returns
             * * 200: OK
             *   * Type: `Promise<Episode[][]>`
             *
             * @see {@link https://docs.unusann.us/endpoints/api/v1/getallmetadata}
             */
            getallmetadata: () => Promise<Episode[][]>;
            /**
             * ### Get Specials Metadata
             * #### `/v1/gets00metadata`
             *
             * This endpoint returns an array of all the episodes in season 0 (specials), in order.
             *
             * @returns
             * * 200: OK
             *   * Type: `Promise<Episode[]>`
             *
             * @see {@link https://docs.unusann.us/endpoints/api/v1/gets00metadata}
             */
            gets00metadata: () => Promise<Episode[]>;
            /**
             * ### Get Season 1 Metadata
             * #### `/v1/gets01metadata`
             *
             * This endpoint returns an array of all the episodes in season 1, in order.
             *
             * @returns
             * * 200: OK
             *   * Type: `Promise<Episode
             *
             * @see {@link https://docs.unusann.us/endpoints/api/v1/gets01metadata}
             */
            gets01metadata: () => Promise<Episode[]>;
            /**
             * ### Get Video Data
             * #### `/v1/getvideodata/{video}`
             *
             * This endpoint accepts a video ID as a path parameter and returns the specified video object.
             *
             * An example request path would be `/v1/metadata/s01.e001`.
             *
             * @param video
             * * Type: `string`
             * * Unus Annus video ID
             * * Example: `s01.e001`
             * * Required parameter
             * @returns
             * * 200: OK
             *   * Type: `Promise<Episode>`
             * * 404: Not Found
             * ```json
             * {
             *   "error": {
             *     "number": 404,
             *     "code": "ERRNOTFOUND",
             *     "message": "404 Not Found! The resource you are trying to access does not exist."
             *   }
             * }
             * ```
             *
             * @see {@link https://docs.unusann.us/endpoints/api/v1/getvideodata}
             */
            getvideodata: (video: string) => Promise<Episode>;
            /**
             * ### Get Video Previews
             * #### `/v1/getvidpreviews/{video}`
             *
             * This endpoint accepts a video ID as a path parameter and returns the specified previews in the WEBVTT format.
             *
             * An example request path would be `/v1/getvidpreviews/s01.e001`.
             *
             * @param video
             * * Type: `string`
             * * Unus Annus video ID
             * * Example: `s01.e001`
             * * Required parameter
             * @returns
             * * 200: OK
             *   * Type: `Promise<string>`
             * * 404: Not Found
             * ```json
             * {
             *   "error": {
             *     "number": 404,
             *     "code": "ERRNOTFOUND",
             *     "message": "404 Not Found! The resource you are trying to access does not exist."
             *   }
             * }
             * ```
             *
             * @see {@link https://docs.unusann.us/endpoints/api/v1/getvidpreviews}
             */
            getvidpreviews: (video: string) => Promise<string>;
        };
        v2: {
            metadata: {
                /**
                 * ### Get Episode Data
                 * #### `/v2/metadata/episode/{video}`
                 *
                 * This endpoint accepts a video ID as a path parameter and returns the specified video object.
                 *
                 * An example request path would be `/v2/metadata/episode/s01.e001`.
                 *
                 * @param video
                 * * Type: `string`
                 * * Unus Annus video ID
                 * * Example: `s01.e001`
                 * * Required parameter
                 * @returns
                 * * 200: OK
                 *   * Type: `Promise<Episode>`
                 * * 404: Not Found
                 * ```json
                 * {
                 *   "error": {
                 *     "number": 404,
                 *     "code": "ERRNOTFOUND",
                 *     "message": "404 Not Found! The resource you are trying to access does not exist."
                 *   }
                 * }
                 * ```
                 *
                 * @see {@link https://docs.unusann.us/endpoints/api/v2/metadata/episode}
                 */
                episode: (video: string) => Promise<Episode>;
                season: {
                    /**
                     * ### Get Specials Metadata
                     * #### `/v2/metadata/season/00`
                     *
                     * This endpoint returns an array of all the episodes in season 0 (specials), in order.
                     *
                     * @returns
                     * * 200: OK
                     *   * Type: `Promise<Episode[]>`
                     *
                     * @see {@link https://docs.unusann.us/endpoints/api/v2/metadata/season#get-specials-metadata}
                     */
                    s00: () => Promise<Episode[]>;
                    /**
                     * ### Get Season 1 Metadata
                     * #### `/v2/metadata/season/01`
                     *
                     * This endpoint returns an array of all the episodes in season 1, in order.
                     *
                     * @returns
                     * * 200: OK
                     *   * Type: `Promise<Episode[]>`
                     *
                     * @see {@link https://docs.unusann.us/endpoints/api/v2/metadata/season#get-season-1-metadata}
                     */
                    s01: () => Promise<Episode[]>;
                };
                /**
                 * ### Get All Metadata
                 * #### `/v2/metadata/all`
                 *
                 * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
                 *
                 * @returns
                 * * 200: OK
                 *   * Type: `Promise<Episode[][]>`
                 *
                 * @see {@link https://docs.unusann.us/endpoints/api/v2/metadata/all}
                 */
                all: () => Promise<Episode[][]>;
            };
            /**
             * ### Get Video Previews
             * #### `/v2/preview/{video}`
             *
             * This endpoint accepts a video ID as a path parameter and returns the specified previews in the WEBTVTT format.
             *
             * An example request path would be `/v2/preview/{s01.e001}`
             *
             * @param video
             * * Type: `string`
             * * Unus Annus video ID
             * * Example: `s01.e001`
             * * Required parameter
             * @returns
             * * 200: OK
             *   * Type: `Promise<string>`
             * * 404: Not Found
             * ```json
             * {
             *   "error": {
             *     "number": 404,
             *     "code": "ERRNOTFOUND",
             *     "message": "404 Not Found! The resource you are trying to access does not exist."
             *   }
             * }
             * ```
             *
             * @see {@link https://docs.unusann.us/endpoints/api/v2/preview}
             */
            preview: (video: string) => Promise<string>;
        };
        /**
         * ### Get Video Subtitles
         * #### `/subtitles`
         *
         * @param url
         * * Type: `string`
         * * Path to subtitles
         * * Example: `https://usc1.contabostorage.com/a7f68355d8c442d8a7a1076a0ac5d924:videos/subs/01/001.en.vtt`
         * * Only accepts the following patterns:
         *   * `https://usc1.contabostorage.com/a7f68355d8c442d8a7a1076a0ac5d924:videos/subs/*`
         *   * `https://cdn.unusann.us/subs/*`
         *   * `https://cdn.unusannusarchive.tk/subs/*`
         * * Required parameter
         * @returns
         * * 200: OK
         *   * Type: `Promise<string>`
         *   * WEBVTT response
         * * 403: Forbidden
         *   * Sent if the `url` parameter is invalid
         * ```json
         * {
         *   "error": "Unauthorized website/path!"
         * }
         * ```
         * * 500: Internal Server Error
         *   * Sent if the `url` parameter returns an invalid response or if the server encountered an error
         * ```json
         * {
         *   "error": "Server error"
         * }
         * ```
         *
         * @see {@link https://docs.unusann.us/endpoints/api/subtitles}
         */
        subtitles: (url: string) => Promise<string>;
    };
    metadata: {
        /**
         * ### Get Episode Data
         * #### `/v2/metadata/episode/{video}`
         *
         * This endpoint accepts a video ID as a path parameter and returns the specified video object.
         *
         * An example request path would be `/v2/metadata/episode/s01.e001`.
         *
         * @param video
         * * Type: `string`
         * * Unus Annus video ID
         * * Example: `s01.e001`
         * * Required parameter
         * @returns
         * * 200: OK
         *   * Type: `Promise<Episode>`
         * * 404: Not Found
         * ```json
         * {
         *   "error": {
         *     "number": 404,
         *     "code": "ERRNOTFOUND",
         *     "message": "404 Not Found! The resource you are trying to access does not exist."
         *   }
         * }
         * ```
         *
         * @see {@link https://docs.unusann.us/endpoints/api/v2/metadata/episode}
         */
        episode: (video: string) => Promise<Episode>;
        season: {
            /**
             * ### Get Specials Metadata
             * #### `/v2/metadata/season/00`
             *
             * This endpoint returns an array of all the episodes in season 0 (specials), in order.
             *
             * @returns
             * * 200: OK
             *   * Type: `Promise<Episode[]>`
             *
             * @see {@link https://docs.unusann.us/endpoints/api/v2/metadata/season#get-specials-metadata}
             */
            s00: () => Promise<Episode[]>;
            /**
             * ### Get Season 1 Metadata
             * #### `/v2/metadata/season/01`
             *
             * This endpoint returns an array of all the episodes in season 1, in order.
             *
             * @returns
             * * 200: OK
             *   * Type: `Promise<Episode[]>`
             *
             * @see {@link https://docs.unusann.us/endpoints/api/v2/metadata/season#get-season-1-metadata}
             */
            s01: () => Promise<Episode[]>;
        };
        /**
         * ### Get All Metadata
         * #### `/v2/metadata/all`
         *
         * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
         *
         * @returns
         * * 200: OK
         *   * Type: `Promise<Episode[][]>`
         *
         * @see {@link https://docs.unusann.us/endpoints/api/v2/metadata/all}
         */
        all: () => Promise<Episode[][]>;
    };
    preview: (video: string) => Promise<string>;
    subtitles: (url: string) => Promise<string>;
    account: {
        /**
         * ### Change Profile Picture
         *
         * Changes the user's profile picture
         *
         * @param pfp
         * * Type: `string | Buffer`
         * * Path to Buffer of image
         * @returns Promise<Record>
         * * Success
         *   * `Promise<Record>`
         * * Error
         *   * Throws error
         */
        changepfp: (pfp: string | Buffer) => Promise<import("pocketbase").Record>;
        /**
         * ### Login
         *
         * @param email
         * * Type: `string`
         * * The user's email
         * * Required parameter
         * @param password
         * * Type: `string`
         * * The user's password
         * * Required parameter
         * @returns
         * * Success
         *   * `Promise<UserAuthResponse>` (see below)
         * ```ts
         * interface UserAuthResponse {
         *   [key: string]: any;
         *   token: string;
         *   user: User;
         * }
         * ```
         * * Error
         *   * Throws error
         */
        login: (email: string, password: string) => Promise<{
            [key: string]: any;
            token: string;
            user: User;
        }>;
        /**
         * ### Logout
         *
         * @returns void
         */
        logout: () => void;
        /**
         * ### Signup
         *
         * @param username
         * * Type: `string`
         * * The user's username
         * * Required parameter
         * @param email
         * * Type: `string`
         * * The user's email address
         * * Required parameter
         * @param password
         * * Type: `string`
         * * The user's password
         * * Required parameter
         * @param passwordConfirm
         * * Type: `string`
         * * The user's password again as confirmation that it's correct
         * * Required parameter
         *
         * @returns
         * * Success
         *   * `Promise<User>`
         * * Error
         *   * Throws error
         */
        signup: (username: string, email: string, password: string, passwordConfirm: string) => Promise<User>;
        /**
         * ### Set Email Preferences
         *
         * Sets the user's email preferences
         *
         * @param preferences
         * * Type: `EmailPreferences` (see below)
         * * Required parameter; values in object are optional
         *
         * #### Interface
         * ```ts
         * interface EmailPreferences {
         *   account?: boolean;
         *   updates?: boolean;
         * }
         * ```
         * @returns
         * * Success
         *   * `Promise<User>`
         * * Error
         *   * Throws error
         */
        setEmailPreferences: (preferences: EmailPreferences) => Promise<User>;
        /**
         * ### Send Email Verification
         *
         * @returns
         * * Success
         *   * Type: `Promise<boolean>`
         * * Error
         *   * Throws error
         */
        sendEmailVerification: () => Promise<boolean>;
        /**
         * ### Reset Email
         *
         * Sends an email to the email in `newEmail` to verify changing the account's email.
         *
         * @param newEmail
         * * Type: `string`
         * * Required parameter
         * @returns
         * * Success
         *   * Type: `Promise<boolean>`
         * * Error
         *   * Throws error
         */
        resetEmail: (newEmail: string) => Promise<boolean>;
        /**
         * ### Reset Password
         *
         * Sends a password reset email to the user's email address.
         *
         * @returns
         * * Success
         *   * Type: `Promise<boolean>`
         * * Error
         *   * Throws error
         */
        resetPassword: () => Promise<boolean>;
        /**
         * ### Delete Account
         *
         * Deletes the user's account if `password` and `confirmPassword` match.
         *
         * @param password
         * * Type: `string`
         * * Required parameter
         * @param confirmPassword
         * * Type: `string`
         * * Required parameter
         * @returns
         * * Success
         *   * Type: `Promise<boolean>`
         * * Invalid login
         *   * Throws `"Invalid login!"`
         * * Passwords don't match
         *   * Throws `"Password and confirm password do not match!"`
         * * Error
         *   * Throws error
         */
        deleteAccount: (password: string, confirmPassword: string) => Promise<boolean>;
    };
    comments: {
        /**
         * ### Get comments
         *
         * Gets the comments for a specific video
         *
         * @param video
         * * Type: `string`
         * * Unus Annus video ID
         * * Required parameter
         * @param sort
         * * Type: `CommentSortTypes` (see below)
         * * Required Parameter
         * ```ts
         * export type CommentSortTypes = "latest" | "oldest" | "rating";
         * ```
         * @param page
         * * Type: `number`
         * * Default: `1`
         * * Which page of comments to display
         * * Optional parameter
         * @param perPage
         * * Type: `number`
         * * Default: `400`
         * * How many comments to display per page
         * * Optional parameter
         * @returns
         * * Success
         *   * Type: `Promise<Record[]>`
         * * Error
         *   * Throws error
         */
        getComments: (video: string, sort: CommentSortTypes, page?: number, perPage?: number) => Promise<import("pocketbase").Record[]>;
        /**
         * ### Post Comment
         *
         * @param episode
         * * Type: `string`
         * * Unus Annus video ID
         * * Required parameter
         * @param markdown
         * * Type: `string`
         * * Comment Markdown
         * * Required parameter
         * @returns
         * * Success
         *   * Type: `Promise<Record>`
         * * Error
         *   * Throws error
         */
        postComment: (episode: string, markdown: string) => Promise<import("pocketbase").Record>;
        /**
         * ### Delete Comment
         *
         * @param commentId
         * * Type: `string`
         * * The comment's ID
         * * Required parameter
         * @returns
         * * Success
         *   * Type: `Promise<boolean`
         * * Error
         *   * Throws error
         */
        deleteComment: (commentId: string) => Promise<boolean>;
        /**
         * ### Edit Comment
         *
         * @param commentId
         * * Type: `string`
         * * The comment's ID
         * * Required parameter
         * @param markdown
         * * Type: `string`
         * * Comment Markdown
         * * Required parameter
         * @returns
         * * Success
         *   * Type: `Promise<Record>`
         * * Error
         *   * Throws error
         */
        editComment: (commentId: string, markdown: string) => Promise<import("pocketbase").Record>;
    };
}
