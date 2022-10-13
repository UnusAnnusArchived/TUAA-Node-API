"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var form_data_1 = __importDefault(require("form-data"));
var fs_1 = __importDefault(require("fs"));
var pocketbase_1 = __importDefault(require("pocketbase"));
var moment_1 = __importDefault(require("moment"));
var TUAA = /** @class */ (function () {
    function TUAA(pocketBaseUrl, apiUrl) {
        if (pocketBaseUrl === void 0) { pocketBaseUrl = "https://db.unusann.us"; }
        if (apiUrl === void 0) { apiUrl = "https://unusann.us/api"; }
        var _this = this;
        this.endpoints = {
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
                    feed: function () {
                        return makeRequest("".concat(_this.apiUrl, "/roku/v1/feed"));
                    },
                },
            },
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
                    getallmetadata: function () {
                        return makeRequest("".concat(_this.apiUrl, "/swift/v1/getallmetadata"));
                    },
                },
            },
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
                getallmetadata: function () {
                    return makeRequest("".concat(_this.apiUrl, "/v1/getallmetadata"));
                },
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
                gets00metadata: function () {
                    return makeRequest("".concat(_this.apiUrl, "/v1/gets00metadata"));
                },
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
                gets01metadata: function () {
                    return makeRequest("".concat(_this.apiUrl, "/v1/gets01metadata"));
                },
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
                getvideodata: function (video) {
                    return makeRequest("".concat(_this.apiUrl, "/v1/getvideodata/").concat(video));
                },
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
                getvidpreviews: function (video) {
                    return makeRequest("".concat(_this.apiUrl, "/v1/getvidpreviews/").concat(video));
                },
            },
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
                    episode: function (video) {
                        return makeRequest("".concat(_this.apiUrl, "/v2/metadata/episode/").concat(video));
                    },
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
                        s00: function () {
                            return makeRequest("".concat(_this.apiUrl, "/v2/metadata/season/s00"));
                        },
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
                        s01: function () {
                            return makeRequest("".concat(_this.apiUrl, "/v2/metadata/season/s01"));
                        },
                    },
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
                    all: function () {
                        return makeRequest("".concat(_this.apiUrl, "/v2/metadata/all"));
                    },
                },
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
                preview: function (video) {
                    return makeRequest("".concat(_this.apiUrl, "/v2/preview/").concat(video));
                },
            },
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
            subtitles: function (url) {
                return makeRequest("".concat(_this.apiUrl, "/subtitles?url=").concat(encodeURIComponent(url)));
            },
        };
        this.metadata = this.endpoints.v2.metadata;
        this.preview = this.endpoints.v2.preview;
        this.subtitles = this.endpoints.subtitles;
        this.account = {
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
            changepfp: function (pfp) { return __awaiter(_this, void 0, void 0, function () {
                var image, formData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof pfp === "string") {
                                image = fs_1.default.readFileSync(pfp);
                            }
                            else {
                                image = pfp;
                            }
                            formData = new form_data_1.default();
                            formData.append("avatar", image);
                            return [4 /*yield*/, this.pb.records.update("profiles", this.pbUser.profile.id)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
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
            login: function (email, password) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pb.users.authViaEmail(email, password)];
                        case 1:
                            res = _a.sent();
                            this.pbUser = res.user;
                            return [2 /*return*/, res];
                    }
                });
            }); },
            /**
             * ### Logout
             *
             * @returns void
             */
            logout: function () {
                return _this.pb.authStore.clear();
            },
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
            signup: function (username, email, password, passwordConfirm) { return __awaiter(_this, void 0, void 0, function () {
                var pbUser, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pb.users.create({ email: email, password: password, passwordConfirm: passwordConfirm })];
                        case 1:
                            pbUser = _a.sent();
                            return [4 /*yield*/, this.pb.users.authViaEmail(email, password)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.pb.records.update("profiles", pbUser.profile.id, {
                                    name: username,
                                    emails_account: true,
                                    emails_updates: false,
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.pb.users.requestVerification(email)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.pb.users.getOne(pbUser.id)];
                        case 5:
                            user = _a.sent();
                            return [2 /*return*/, (this.pbUser = user)];
                    }
                });
            }); },
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
            setEmailPreferences: function (preferences) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pb.records.update("profiles", this.pbUser.profile.id, {
                                emails_account: preferences.account,
                                emails_updates: preferences.updates,
                            })];
                        case 1:
                            _a.sent();
                            this.pbUser.profile.emails_account = preferences.account;
                            this.pbUser.profile.emails_updates = preferences.updates;
                            return [2 /*return*/, this.pbUser];
                    }
                });
            }); },
            /**
             * ### Send Email Verification
             *
             * @returns
             * * Success
             *   * Type: `Promise<boolean>`
             * * Error
             *   * Throws error
             */
            sendEmailVerification: function () {
                return _this.pb.users.requestVerification(_this.pbUser.email);
            },
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
            resetEmail: function (newEmail) {
                return _this.pb.users.requestEmailChange(newEmail);
            },
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
            resetPassword: function () {
                return _this.pb.users.requestPasswordReset(_this.pbUser.email);
            },
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
            deleteAccount: function (password, confirmPassword) { return __awaiter(_this, void 0, void 0, function () {
                var res, deleteRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(password === confirmPassword)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.pb.users.authViaEmail(this.pbUser.email, password)];
                        case 1:
                            res = _a.sent();
                            if (!res.token) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.pb.users.delete(res.user.id)];
                        case 2:
                            deleteRes = _a.sent();
                            return [2 /*return*/, deleteRes];
                        case 3: throw "Invalid login!";
                        case 4: return [3 /*break*/, 6];
                        case 5: throw "Password and confirm password do not match!";
                        case 6: return [2 /*return*/];
                    }
                });
            }); },
        };
        this.comments = {
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
            getComments: function (video, sort, page, perPage) {
                if (page === void 0) { page = 1; }
                if (perPage === void 0) { perPage = 400; }
                return __awaiter(_this, void 0, void 0, function () {
                    var comments;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.pb.records.getList("comments", page, perPage, {
                                    filter: "episode=\"".concat(video, "\""),
                                    $autoCancel: false,
                                })];
                            case 1:
                                comments = (_a.sent()).items;
                                if (sort === "latest" || sort === "oldest") {
                                    comments.sort(function (aDate, bDate) {
                                        var a = moment_1.default.utc(aDate.created).unix();
                                        var b = moment_1.default.utc(bDate.created).unix();
                                        if (a > b) {
                                            return -1;
                                        }
                                        else if (a < b) {
                                            return 1;
                                        }
                                        else if (a === b) {
                                            return 0;
                                        }
                                    });
                                }
                                else if (sort === "rating") {
                                    comments.sort(function (a, b) {
                                        var ratingA = a.likes - a.dislikes;
                                        var ratingB = b.likes - b.dislikes;
                                        if (ratingA > ratingB) {
                                            return -1;
                                        }
                                        else if (ratingA < ratingB) {
                                            return 1;
                                        }
                                        else if (ratingA === ratingB) {
                                            var timeA = moment_1.default.utc(a.created).unix();
                                            var timeB = moment_1.default.utc(b.created).unix();
                                            if (timeA > timeB) {
                                                return -1;
                                            }
                                            else if (timeA < timeB) {
                                                return 1;
                                            }
                                            else if (timeA === timeB) {
                                                return 0;
                                            }
                                        }
                                    });
                                }
                                if (sort === "oldest") {
                                    comments.reverse();
                                }
                                return [2 /*return*/, comments];
                        }
                    });
                });
            },
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
            postComment: function (episode, markdown) { return __awaiter(_this, void 0, void 0, function () {
                var commentText;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            commentText = markdown.trim();
                            if (commentText.length === 0) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.pb.records.create("comments", {
                                    episode: episode,
                                    markdown: commentText,
                                    user: this.pbUser.id,
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
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
            deleteComment: function (commentId) {
                return _this.pb.records.delete("comments", commentId);
            },
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
            editComment: function (commentId, markdown) {
                var commentText = markdown.trim();
                if (commentText.length === 0) {
                    return;
                }
                return _this.pb.records.update("comments", commentId, {
                    markdown: commentText,
                    isEdited: true,
                });
            },
        };
        this.pb = new pocketbase_1.default(pocketBaseUrl);
        this.apiUrl = apiUrl;
    }
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
