import { Ctx, bot } from "../../lib/Bot"
import { getLastFmUser, withHTMLmarkdown, withReply } from "../../lib/utils"
import { Command } from "../../types"

export const cmd: Command = {
    name: "track",
    description: "Show Last.fm user's recent track",
    async run(ctx: Ctx) {
        const user = await getLastFmUser(ctx)
        if (!user) return
        const msgToBeEdited = await ctx.reply(`<i>Getting ${user}'s tracks...</i>`, withHTMLmarkdown())

        const userRecenttrack = await bot.lastfm!.getRecentTracks(user.toString())

        let result: string = `<b>${user}</b>'s latest track\n\n`
        if (!userRecenttrack?.track || userRecenttrack.track.length < 1) {
            result += "No tracks scrobbed."
        } else {
            for (const track of userRecenttrack.track) {
                if (track['@attr']?.nowplaying) {
                    result += `<b><u>Now scrobbling:</u>  ${track.name}</b> <i>by ${track.artist['#text']}</i>\n\n`
                } else {
                    result += `<b>${track.name}</b> <i>by ${track.artist['#text']}</i>\n`
                }
            }
        }
        await msgToBeEdited.editText(result, { ...withReply(ctx), ...withHTMLmarkdown() })
    },
}