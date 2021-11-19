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
var apiUrl = 'https://api.unusann.us';
var cdnUrl = 'https://cdn.unusann.us';
var TUAA = /** @class */ (function () {
    function TUAA() {
        this.roku = {
            v1: {
                /**
                 * This endpoint provides the roku specified feed format for the roku app.
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/roku/v1/feed
                 */
                feed: function () {
                    return makeRequest("".concat(apiUrl, "/roku/v1/feed"));
                }
            }
        };
        this.swift = {
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
                getallmetadata: function () {
                    return makeRequest("".concat(apiUrl, "/swift/v1/getallmetadata"));
                }
            }
        };
        this.v1 = {
            /**
             * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
             *
             * More info: https://api.unusann.us/docs/?page=/api/v1/getallmetadata
            */
            getallmetadata: function () {
                return makeRequest("".concat(apiUrl, "/v1/getallmetadata"));
            },
            /**
             * This endpoint returns an array of all the episodes in season 0 (specials), in order.
             *
             * More info: https://api.unusann.us/docs/?page=/api/v1/gets00metadata
            */
            gets00metadata: function () {
                return makeRequest("".concat(apiUrl, "/v1/gets00metadata"));
            },
            /**
             * This endpoint returns an array of all the episodes in season 1, in order.
             *
             * More info: https://api.unusann.us/docs/?page=/api/v1/gets01metadata
            */
            gets01metadata: function () {
                return makeRequest("".concat(apiUrl, "/v1/gets01metadata"));
            },
            /**
             * This endpoint accepts a video id as an argument and returns the specified video object.
             *
             * An example call of this function would be `TUAA.v1.getvideodata('s01.e001)`
             *
             * More info: https://api.unusann.us/docs/?page=/api/v1/getvideodata
             */
            getvideodata: function (videoId) {
                return makeRequest("".concat(apiUrl, "/v1/getvideodata/").concat(videoId));
            },
            /**
             * This endpoint accepts a video id as an argument and returns the specified previews in the `WEBVTT` format.
             *
             * An example call of this function would be `TUAA.v1.getvidpreviews('s01.e001')`
             *
             * More info: https://api.unusann.us/docs/?page=/api/v1/getvidpreviews
             */
            getvidpreviews: function (videoId) {
                return makeRequest("".concat(apiUrl, "/v1/getvidpreviews/").concat(videoId));
            }
        };
        this.v2 = {
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
                changepfp: function (pfp, loginKey) {
                    var formData = new form_data_1.default();
                    formData.append('loginKey', loginKey);
                    if (typeof pfp === 'string') {
                        //Is file path
                        var splitPath = pfp.replace(/\\/g, '/').split('/');
                        var filename = splitPath[splitPath.length - 1];
                        formData.append(filename, fs_1.default.createReadStream(pfp));
                    }
                    else if (typeof pfp === typeof fs_1.default.ReadStream) {
                        //Is ReadStream
                        var splitPath = pfp.path.replace(/\\/g, '/').split('/');
                        var filename = splitPath[splitPath.length - 1];
                        formData.append(filename, pfp);
                    }
                    return new Promise(function (resolve, reject) {
                        axios_1.default.post("".concat(apiUrl, "/v2/account/changepfp"), formData, {
                            headers: formData.getHeaders()
                        }).then(function (res) {
                            resolve(res.data);
                        }).catch(reject);
                    });
                },
                /**
                 * This endpoint accepts a `POST` request with the `application/json` encoding type.
                 *
                 * It accepts a `loginKey` in the JSON body which contains the user's login key.
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/v2/account/checkloginkey
                 */
                checkloginkey: function (loginKey) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/account/checkloginkey"), { loginKey: loginKey });
                },
                /**
                 * This endpoint accepts a `POST` request with the `application/json` encoding type.
                 *
                 * It accepts a `username` and `password` in the JSON body.
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/v2/account/login
                 */
                login: function (username, password) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/account/login"), { username: username, password: password });
                },
                /**
                 * This endpoint accepts a `POST` request with the `application/json` encoding type.
                 *
                 * It accepts an `id` value containing the user ID, and a `loginKey` containing the login key you want to logout.
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/v2/account/logout
                 */
                logout: function (id, loginKey) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/account/logout"), { id: id, loginKey: loginKey });
                },
                /**
                 * This endpoint accepts a `POST` request with the `application/json` encoding type.
                 *
                 * It accepts an `id` value containing the user ID of the user you'd like to remove all logins from.
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/v2/account/logoutall
                 */
                logoutall: function (id) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/account/logoutall"), { id: id });
                },
                /**
                 * This endpoint accepts a `POST` request with the `application/json` encoding type.
                 *
                 * It accepts the following values in the JSON body: `email`, `username`, `password`, and `confirmpassword`
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/v2/account/signup
                 */
                signup: function (email, username, password, confirmpassword) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/account/signup"), { email: email, username: username, password: password, confirmpassword: confirmpassword });
                }
            },
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
                get: function (videoId, from, to) {
                    var query = '?';
                    if (from) {
                        var From;
                        if (typeof from === 'number') {
                            From = from.toString();
                        }
                        else {
                            From = from;
                        }
                        query = "from=".concat(from);
                    }
                    if (to) {
                        var To;
                        if (typeof to === 'number') {
                            To = to.toString();
                        }
                        else {
                            To = to;
                        }
                        query = "to=".concat(to);
                    }
                    if (query === '?') {
                        query = '';
                    }
                    return makeRequest("".concat(apiUrl, "/v2/comments/get/").concat(videoId).concat(query));
                },
                /**
                 * This endpoint accepts a `POST` request with the `application/json` encoding type.
                 *
                 * It accepts  a `loginKey` and a `comment` (a plaintext string of the comment's text)
                 *
                 * An example call of this function would be `TUAA.v2.comments.post('s01.e001')
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/v2/comments/post
                 */
                post: function (videoId, comment, loginKey) {
                    return makePOSTRequest("".concat(apiUrl, "/v2/comments/post/").concat(videoId), { comment: comment, loginKey: loginKey });
                }
            },
            metadata: {
                season: {
                    /**
                     * This endpoint returns an array of all the episodes in season 0 (specials), in order.
                     *
                     * More info: https://api.unusann.us/docs/?page=/api/v2/metadata/video/season/s00
                     */
                    s00: function () {
                        return makeRequest("".concat(apiUrl, "/v2/metadata/video/season/s00"));
                    },
                    /**
                     * This endpoint returns an array of all the episodes in season 1, in order.
                     *
                     * More info: https://api.unusann.us/docs/?page=/api/v2/metadata/video/season/s01
                     */
                    s01: function () {
                        return makeRequest("".concat(apiUrl, "/v2/metadata/video/season/s01"));
                    }
                },
                /**
                 * This endpoint returns an array, with another nested array for each season, which contains all the video objects for that season, in order.
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/v2/metadata/video/all
                 */
                all: function () {
                    return makeRequest("".concat(apiUrl, "/v2/metadata/video/all"));
                },
                /**
                 * This endpoint accepts a video id as an argument and returns the specified video object.
                 *
                 * An example call of this function would be `TUAA.v2.metadata.video.episode('s01.e001')
                 *
                 * More info: https://api.unusann.us/docs/?page=/api/v2/metadata/video/episode
                 */
                episode: function (videoId) {
                    return makeRequest("".concat(apiUrl, "/v2/metadata/video/episode/").concat(videoId));
                }
            },
            /**
             * This endpoint accepts a video id as a url argument and returns the specified previews in the WEBVTT format.
             *
             * An example call of this function would be `TUAA.v2.preview('s01.e001')`
             *
             * More info: https://api.unusann.us/docs/?page=/api/v2/preview
             */
            preview: function (videoId) {
                return makeRequest("".concat(apiUrl, "/v2/preview/").concat(videoId));
            }
        };
    }
    TUAA.prototype.changeApiUrl = function (url) {
        return apiUrl = url;
    };
    TUAA.prototype.changeCdnUrl = function (url) {
        return apiUrl = url;
    };
    /**
     * This gets the download url for a video from it's video id a specified resolution.
     *
     * The generated url will send the file with `content-disposition` set to `attachment`, and `content-type` set to `application/octet-stream` so the browser will download it instead of displaying it inline.
     *
     * You can also provide an optional filename, which will set `content-disposition` to `attachment; filename=<filename>` so the browser will download the file with a custom filename.
     */
    TUAA.prototype.getVideoDownloadPathFromVideoID = function (videoId, filename) {
        return __awaiter(this, void 0, void 0, function () {
            var url, metadata, lastHighest, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://cdn.unusann.us/download.php?path=";
                        return [4 /*yield*/, this.v2.metadata.episode(videoId)];
                    case 1:
                        metadata = _a.sent();
                        if (Array.isArray(metadata.sources)) {
                            lastHighest = {
                                size: 0,
                                src: ''
                            };
                            for (i = 0; i < metadata.sources.length; i++) {
                                if (metadata.sources[i].size > lastHighest.size) {
                                    lastHighest = metadata.sources[i];
                                }
                            }
                            url += encodeURIComponent(lastHighest.src.replace('//cdn.unusannusarchive.tk', ''));
                        }
                        else {
                            url += encodeURIComponent(metadata.video.replace('//cdn.unusannusarchive.tk', ''));
                        }
                        if (filename) {
                            url += "&filename=".concat(encodeURIComponent(filename));
                        }
                        return [2 /*return*/, url];
                }
            });
        });
    };
    /**
     * This gets the download url for a video from a video url.
     *
     * The generated url will send the file with `content-disposition` set to `attachment`, and `content-type` set to `application/octet-stream` so the browser will download it instead of displaying it inline.
     *
     * You can also provide an optional filename, which will set `content-disposition` to `attachment; filename=<filename>` so the browser will download the file with a custom filename.
     */
    TUAA.prototype.getVideoDownloadPathFromVideoURL = function (videoURL, filename) {
        var url = "https://cdn.unusann.us/download.php?path=".concat(encodeURIComponent(videoURL.replace('//cdn.unusannusarchive.tk', '')));
        if (filename) {
            url += "&filename=".concat(encodeURIComponent(filename));
        }
        return url;
    };
    /**
     * This runs ffprobe on the specified cdn video path
     *
     * To find the cdn video path, go to https://cdn.unusann.us and browse for the video, then take the current path (will start with a `/`), and use it here.
     *
     * More info: https://api.unusann.us/docs/?page=/ffprobe
     */
    TUAA.prototype.ffprobe = function (videoPath) {
        return makeRequest("".concat(cdnUrl, "/ffprobe.php?file=").concat(videoPath));
    };
    /**
     * This gets the size of the specified file/folder on the cdn.
     *
     * To get a path on the cdn, go to https://cdn.unusann.us and browse for the folder/file you want, then take the current path (will start with a `/`) and use it here.
     *
     * More info: https://api.unusann.us/docs/?page=/filesize
     */
    TUAA.prototype.filesize = function (path) {
        return makeRequest("".concat(cdnUrl, "/filesize.php?path=").concat(path));
    };
    return TUAA;
}());
exports.default = TUAA;
function makeRequest(url) {
    return new Promise(function (resolve, reject) {
        axios_1.default.get(url).then(function (res) {
            resolve(res.data);
        }).catch(reject);
    });
}
function makePOSTRequest(url, data) {
    return new Promise(function (resolve, reject) {
        axios_1.default.post(url, data).then(function (res) {
            resolve(res.data);
        }).catch(reject);
    });
}
