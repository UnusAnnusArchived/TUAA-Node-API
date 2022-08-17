"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var form_data_1 = __importDefault(require("form-data"));
var fs_1 = __importDefault(require("fs"));
var apiUrl = "https://unusann.us/api";
var TUAA = /** @class */ (function () {
    function TUAA() {
        this.roku = {
            v1: {
                /**
                 * This endpoint provides the Roku specified feed format for the Roku app.
                 *
                 * More info: https://docs.unusann.us/reference/api/roku/v1/feed
                 */
                feed: function () {
                    return makeRequest("".concat(apiUrl, "/roku/v1/feed"));
                },
            },
        };
        this.swift = {
            v1: {
                /**
                 * This is just a modified version of `/v1/getallmetadata` that was added while the Swift app was being developed.
                 *
                 * The only thing different about it is that it outputs an object with two keys that contain arrays instead of an array containing 2 other arrays.
                 *
                 * More info: https://docs.unusann.us/reference/api/swift/v1/getallmetadata
                 */
                getallmetadata: function () {
                    return makeRequest("".concat(apiUrl, "/swift/v1/getallmetadata"));
                },
            },
        };
        this.v1 = {
            /**
             * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
             *
             * More info: https://docs.unusann.us/reference/api/v1/getallmetadata
             */
            getallmetadata: function () {
                return makeRequest("".concat(apiUrl, "/v1/getallmetadata"));
            },
            /**
             * This endpoint returns an array of all the episodes in season 0 (specials), in order.
             *
             * More info: https://docs.unusann.us/reference/api/v1/gets00metadata
             */
            gets00metadata: function () {
                return makeRequest("".concat(apiUrl, "/v1/gets00metadata"));
            },
            /**
             * This endpoint returns an array of all the episodes in season 1, in order.
             *
             * More info: https://docs.unusann.us/reference/api/v1/gets01metadata
             */
            gets01metadata: function () {
                return makeRequest("".concat(apiUrl, "/v1/gets01metadata"));
            },
            /**
             * This endpoint accepts a video ID as a path parameter and returns the specified video object.
             *
             * An example request path would be `/v1/getmetadata/s01.e001`.
             *
             * More info: https://docs.unusann.us/reference/api/v1/getvideodata
             *
             * @param video String; Unus Annus video ID. Example: `s01.e001`; Required parameter
             */
            getvideodata: function (video) {
                return makeRequest("".concat(apiUrl, "/v1/getvideodata/").concat(video));
            },
            /**
             * This endpoint accepts a video ID as a path parameter and returns the specified previews in the WEBVTT format.
             *
             * An example request path would be `/v1/getvidpreviews/s01.e001`.
             *
             * More info: https://docs.unusann.us/reference/api/v1/getvidpreviews
             *
             * @param video String; Unus Annus video ID. Example: `s01.e001`; Required parameter
             */
            getvidpreviews: function (video) {
                return makeRequest("".concat(apiUrl, "/v1/getvidpreviews/").concat(video));
            },
        };
        this.v2 = {
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
                    get: function (uid, loginKey, uaid) {
                        return makePOSTRequest("".concat(apiUrl, "/v2/account/videoprogress/get"), { uid: uid, loginKey: loginKey, uaid: uaid });
                    },
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
                    set: function (uid, loginKey, uaid, progress) {
                        return makePOSTRequest("".concat(apiUrl, "/v2/account/videoprogress/set"), { uid: uid, loginKey: loginKey, uaid: uaid, progress: progress });
                    },
                },
                /**
                 * Changes the user's profile picture
                 *
                 * More info: https://docs.unusann.us/reference/api/v2/account/changepfp
                 *
                 * @param pfp ReadStream | Path to file; Image file attached to body; Required parameter
                 * @param loginKey 16 character login key/token; Required parameter
                 */
                changepfp: function (pfp, loginKey) {
                    var formData = new form_data_1.default();
                    formData.append("loginKey", loginKey);
                    if (typeof pfp === "string") {
                        //Is file path
                        var splitPath = pfp.replace(/\\/g, "/").split("/");
                        var filename = splitPath[splitPath.length - 1];
                        formData.append(filename, fs_1.default.createReadStream(pfp));
                    }
                    else if (typeof pfp === typeof fs_1.default.ReadStream) {
                        //Is ReadStream
                        var splitPath = pfp.path.replace(/\\/g, "/").split("/");
                        var filename = splitPath[splitPath.length - 1];
                        formData.append(filename, pfp);
                    }
                    return new Promise(function (resolve, reject) {
                        axios_1.default
                            .post("".concat(apiUrl, "/v2/account/changepfp"), formData, {
                            headers: formData.getHeaders(),
                        })
                            .then(function (res) {
                            resolve(res.data);
                        })
                            .catch(reject);
                    });
                },
                /**
                 * Check the user's login key to see if they're logged in
                 *
                 * More info: https://docs.unusann.us/reference/api/v2/account/checkloginkey
                 *
                 * @param loginKey String; 16 character login key/token; Required parameter
                 */
                checkloginkey: function (loginKey) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/account/checkloginkey"), { loginKey: loginKey });
                },
                /**
                 * More info: https://docs.unusann.us/reference/api/v2/account/login
                 *
                 * @param username String; The user's username or email. If this field has an @ symbol in it, it will be processed as an email; otherwise it will be processed as a username. Required parameter
                 * @param password String; Required parameter
                 * @param sendEmail Boolean; Whether to send an email to the user after they login. This is always true unless the user creates an account for the first time. Optional parameter; will default to `true` if not provided.
                 */
                login: function (username, password, sendEmail) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/account/login"), { username: username, password: password, sendEmail: sendEmail });
                },
                /**
                 * More info: https://docs.unusann.us/reference/api/v2/account/logout
                 *
                 * @param loginKeys String[]; Array of 16 character login keys/tokens to logout or `["*"]` to logout all. Either this parameter, or `loginKey` is required in the request.
                 * @param loginKey String; 16 character login key/token to logout singular device. Either this parameter, or `loginKeys` is required in the request.
                 * @param id String; 32 character user ID; Required parameter
                 */
                logout: function (id, loginKeys, loginKey) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/account/logout"), { id: id, loginKeys: loginKeys, loginKey: loginKey });
                },
                /**
                 * More info: https://docs.unusann.us/reference/api/v2/account/signup
                 *
                 * @param email String; The user's email address; Required parameter
                 * @param username String; The user's username; Required parameter
                 * @param password String; The user's password; Required parameter
                 * @param confirmpassword String; The user's password again as confirmation that it's correct. Required parameter
                 */
                signup: function (email, username, password, confirmpassword) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/account/signup"), { email: email, username: username, password: password, confirmpassword: confirmpassword });
                },
            },
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
                get: function (video, from, to) {
                    var query = "?";
                    if (from) {
                        var From;
                        if (typeof from === "number") {
                            From = from.toString();
                        }
                        else {
                            From = from;
                        }
                        query += "from=".concat(From);
                    }
                    if (to) {
                        var To;
                        if (typeof to === "number") {
                            To = to.toString();
                        }
                        else {
                            To = to;
                        }
                        query += "to=".concat(To);
                    }
                    if (query === "?") {
                        query = "";
                    }
                    return makeRequest("".concat(apiUrl, "/v2/comments/get/").concat(video).concat(query));
                },
                /**
                 * Posts a comment on the specified video
                 *
                 * More info: https://docs.unusann.us/reference/api/v2/comments#post-comment
                 *
                 * @param video String; Unus Annus video ID. Example: `s01.e001`; Required parameter
                 * @param comment String; Comment data. Limited Markdown is accepted. Required parameter
                 * @param loginKey String; 16 character login key/token; Required parameter
                 */
                post: function (video, comment, loginKey) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/comments/post/").concat(video), { comment: comment, loginKey: loginKey });
                },
            },
            metadata: {
                season: {
                    /**
                     * This endpoint returns an array of all the episodes in season 0 (specials), in order.
                     *
                     * More info: https://docs.unusann.us/reference/api/v2/metadata/season#get-specials-metadata
                     */
                    s00: function () {
                        return makeRequest("".concat(apiUrl, "/v2/metadata/season/s00"));
                    },
                    /**
                     * This endpoint returns an array of all the episodes in season 1, in order.
                     *
                     * More info: https://docs.unusann.us/reference/api/v2/metadata/season#get-season-1-metadata
                     */
                    s01: function () {
                        return makeRequest("".concat(apiUrl, "/v2/metadata/season/s01"));
                    },
                },
                /**
                 * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
                 *
                 * More info: https://docs.unusann.us/reference/api/v2/metadata/all
                 */
                all: function () {
                    return makeRequest("".concat(apiUrl, "/v2/metadata/all"));
                },
                /**
                 * This endpoint accepts a video ID as a path parameter and returns the specified video object.
                 *
                 * An example request would be `TUAA.v2.metadata.episode("s01.e001")`
                 *
                 * More info: https://docs.unusann.us/reference/api/v2/metadata/episode
                 *
                 * @param video String; Unus Annus video ID. Example `s01.e001`; Required parameter
                 */
                episode: function (video) {
                    return makeRequest("".concat(apiUrl, "/v2/metadata/episode/").concat(video));
                },
            },
            /**
             * This endpoint accepts a video ID as a path parameter and returns the specified previews in the WEBVTT format.
             *
             * An example call of this function would be `TUAA.v2.preview("s01.e001")`
             *
             * More info: https://docs.unusann.us/reference/api/v2/preview
             *
             * @param video String; Unus Annus video ID; Example: `s01.e001`; Required parameter
             */
            preview: function (video) {
                return makeRequest("".concat(apiUrl, "/v2/preview/").concat(video));
            },
        };
    }
    TUAA.prototype.changeApiUrl = function (url) {
        return (apiUrl = url);
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
    TUAA.prototype.subtitles = function (url) {
        return makeRequest("".concat(apiUrl, "/subtitles?url=").concat(encodeURIComponent(url)));
    };
    return TUAA;
}());
exports.default = TUAA;
function makeRequest(url) {
    return new Promise(function (resolve, reject) {
        axios_1.default
            .get(url)
            .then(function (res) {
            resolve(res.data);
        })
            .catch(reject);
    });
}
function makePOSTRequest(url, data) {
    return new Promise(function (resolve, reject) {
        axios_1.default
            .post(url, data)
            .then(function (res) {
            resolve(res.data);
        })
            .catch(reject);
    });
}
