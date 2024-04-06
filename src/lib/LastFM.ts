import { LastFMUser, LastFMUserRecentTracks } from "../types"
import { bot } from "./Bot"


export class LastFM {
    private base: string
    private apikey: string

    public constructor() {
        if (!process.env.LASTFM_API && !process.env.LASTFM_SECRET) {
            throw new Error("LastFM API is required. If you want to disable LastFM, add 'NO_LASTFM=1' to .env file")
        }
        this.base = "http://ws.audioscrobbler.com/2.0/"
        this.apikey = process.env.LASTFM_API!
    }

    public async getUser(name: string) {
        try {
            const existing = bot.getLastFmUserCache(name)
            if (!existing || Date.now() >= (existing.time + 1000 * 60 * 5)) {
                const response = (await fetch(this.base + `?method=user.getinfo&user=${encodeURIComponent(name)}&api_key=${this.apikey}&format=json`).then(r => r.json())) as { user: LastFMUser, error?: boolean }
                if (response?.error) {
                    return undefined
                } else {
                    bot.setLastFmUserCache(name, response.user)
                    return response.user as LastFMUser
                }
            } else {
                return existing.user
            }
        } catch (e) {
            console.error(e)
            return undefined
        }
    }

    public async getRecentTracks(username: string) {
        try {
            const response = (await fetch(this.base + `?method=user.getrecenttracks&user=${encodeURIComponent(username)}&api_key=${this.apikey}&format=json&limit=5`).then(r => r.json())) as { recenttracks: LastFMUserRecentTracks, error?: boolean }
            if (response.error) {
                return undefined
            } else {
                return response.recenttracks as LastFMUserRecentTracks
            }
        } catch (e) {
            console.error(e)
            return undefined
        }
    }

}