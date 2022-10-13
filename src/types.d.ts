export type CommentSortTypes = "latest" | "oldest" | "rating";
export interface EmailPreferences {
  account: boolean;
  updates: boolean;
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
