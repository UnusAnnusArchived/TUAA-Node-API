import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import PocketBase from "pocketbase";
import moment from "moment";
import type { User } from "pocketbase";
import { CommentSortTypes, EmailPreferences, Episode, RokuFeed, SwiftGetAllMetadata } from "./types";

export default class TUAA {
  pb: PocketBase;
  pbUser: User;
  apiUrl: string;

  constructor(pocketBaseUrl: string = "https://db.unusann.us", apiUrl: string = "https://unusann.us/api") {
    this.pb = new PocketBase(pocketBaseUrl);
    this.apiUrl = apiUrl;
  }

  endpoints = {
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
        feed: () => {
          return makeRequest<RokuFeed>(`${this.apiUrl}/roku/v1/feed`);
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
        getallmetadata: () => {
          return makeRequest<SwiftGetAllMetadata>(`${this.apiUrl}/swift/v1/getallmetadata`);
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
      getallmetadata: () => {
        return makeRequest<Episode[][]>(`${this.apiUrl}/v1/getallmetadata`);
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
      gets00metadata: () => {
        return makeRequest<Episode[]>(`${this.apiUrl}/v1/gets00metadata`);
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
      gets01metadata: () => {
        return makeRequest<Episode[]>(`${this.apiUrl}/v1/gets01metadata`);
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
      getvideodata: (video: string) => {
        return makeRequest<Episode>(`${this.apiUrl}/v1/getvideodata/${video}`);
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
      getvidpreviews: (video: string) => {
        return makeRequest<string>(`${this.apiUrl}/v1/getvidpreviews/${video}`);
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
        episode: (video: string) => {
          return makeRequest<Episode>(`${this.apiUrl}/v2/metadata/episode/${video}`);
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
          s00: () => {
            return makeRequest<Episode[]>(`${this.apiUrl}/v2/metadata/season/s00`);
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
          s01: () => {
            return makeRequest<Episode[]>(`${this.apiUrl}/v2/metadata/season/s01`);
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
        all: () => {
          return makeRequest<Episode[][]>(`${this.apiUrl}/v2/metadata/all`);
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
      preview: (video: string) => {
        return makeRequest<string>(`${this.apiUrl}/v2/preview/${video}`);
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
    subtitles: (url: string) => {
      return makeRequest<string>(`${this.apiUrl}/subtitles?url=${encodeURIComponent(url)}`);
    },
  };

  metadata = this.endpoints.v2.metadata;
  preview = this.endpoints.v2.preview;
  subtitles = this.endpoints.subtitles;

  account = {
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
    changepfp: async (pfp: string | Buffer) => {
      let image: Buffer;

      if (typeof pfp === "string") {
        image = fs.readFileSync(pfp);
      } else {
        image = pfp;
      }

      const formData = new FormData();
      formData.append("avatar", image);

      return await this.pb.records.update("profiles", this.pbUser.profile.id);
    },
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
    login: async (email: string, password: string) => {
      const res = await this.pb.users.authViaEmail(email, password);
      this.pbUser = res.user;
      return res;
    },
    /**
     * ### Logout
     *
     * @returns void
     */
    logout: () => {
      return this.pb.authStore.clear();
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
    signup: async (username: string, email: string, password: string, passwordConfirm: string) => {
      const pbUser = await this.pb.users.create({ email, password, passwordConfirm });

      await this.pb.users.authViaEmail(email, password);

      await this.pb.records.update("profiles", pbUser.profile.id, {
        name: username,
        emails_account: true,
        emails_updates: false,
      });

      await this.pb.users.requestVerification(email);

      const user = await this.pb.users.getOne(pbUser.id);
      return (this.pbUser = user);
    },
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
    setEmailPreferences: async (preferences: EmailPreferences) => {
      await this.pb.records.update("profiles", this.pbUser.profile.id, {
        emails_account: preferences.account,
        emails_updates: preferences.updates,
      });

      this.pbUser.profile.emails_account = preferences.account;
      this.pbUser.profile.emails_updates = preferences.updates;

      return this.pbUser;
    },
    /**
     * ### Send Email Verification
     *
     * @returns
     * * Success
     *   * Type: `Promise<boolean>`
     * * Error
     *   * Throws error
     */
    sendEmailVerification: () => {
      return this.pb.users.requestVerification(this.pbUser.email);
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
    resetEmail: (newEmail: string) => {
      return this.pb.users.requestEmailChange(newEmail);
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
    resetPassword: () => {
      return this.pb.users.requestPasswordReset(this.pbUser.email);
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
    deleteAccount: async (password: string, confirmPassword: string) => {
      if (password === confirmPassword) {
        const res = await this.pb.users.authViaEmail(this.pbUser.email, password);
        if (res.token) {
          const deleteRes = await this.pb.users.delete(res.user.id);
          return deleteRes;
        } else {
          throw "Invalid login!";
        }
      } else {
        throw "Password and confirm password do not match!";
      }
    },
  };

  comments = {
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
    getComments: async (video: string, sort: CommentSortTypes, page: number = 1, perPage: number = 400) => {
      const comments = (
        await this.pb.records.getList("comments", page, perPage, {
          filter: `episode="${video}"`,
          $autoCancel: false,
        })
      ).items;

      if (sort === "latest" || sort === "oldest") {
        comments.sort((aDate, bDate) => {
          const a = moment.utc(aDate.created).unix();
          const b = moment.utc(bDate.created).unix();

          if (a > b) {
            return -1;
          } else if (a < b) {
            return 1;
          } else if (a === b) {
            return 0;
          }
        });
      } else if (sort === "rating") {
        comments.sort((a, b) => {
          const ratingA = a.likes - a.dislikes;
          const ratingB = b.likes - b.dislikes;

          if (ratingA > ratingB) {
            return -1;
          } else if (ratingA < ratingB) {
            return 1;
          } else if (ratingA === ratingB) {
            const timeA = moment.utc(a.created).unix();
            const timeB = moment.utc(b.created).unix();

            if (timeA > timeB) {
              return -1;
            } else if (timeA < timeB) {
              return 1;
            } else if (timeA === timeB) {
              return 0;
            }
          }
        });
      }

      if (sort === "oldest") {
        comments.reverse();
      }

      return comments;
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
    postComment: async (episode: string, markdown: string) => {
      const commentText = markdown.trim();

      if (commentText.length === 0) {
        return;
      }

      return await this.pb.records.create("comments", {
        episode,
        markdown: commentText,
        user: this.pbUser.id,
      });
    },
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
    deleteComment: (commentId: string) => {
      return this.pb.records.delete("comments", commentId);
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
    editComment: (commentId: string, markdown: string) => {
      const commentText = markdown.trim();

      if (commentText.length === 0) {
        return;
      }

      return this.pb.records.update("comments", commentId, {
        markdown: commentText,
        isEdited: true,
      });
    },
  };
}

function makeRequest<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch(reject);
  });
}
