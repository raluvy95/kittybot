import { Ctx } from "./lib/Bot";

export interface Command {
    name: string,
    module?: string,
    ownerOnly?: boolean,
    description?: string,
    run: (ctx: Ctx) => unknown | Promise<unknown>
}

export interface LastFMUser {
    name: string,
    age: string,
    subscriber: string,
    realname: string,
    bootstrap: string,
    playcount: string,
    artist_count: string,
    playlists: string,
    track_count: string,
    album_count: string,
    image: { size: string, "#text": string }[],
    registered: { unixtime: string, "#text": number }
    country: string,
    gender: string,
    url: string,
    type: string
}

export interface LastFMUserRecentTracks {
    track: {
        artist: { mbid: string, "#text": string },
        streamable: string,
        image: {
            size: string,
            "#text": string
        }[],
        mbid: string,
        album: {
            mbid: string,
            "#text": string
        },
        name: string,
        "@attr"?: {
            nowplaying: string
        },
        url: string,
    }[],
    "@attr": {
        user: string,
        totalPages: string,
        page: string,
        total: string,
        perPage: string
    }
}