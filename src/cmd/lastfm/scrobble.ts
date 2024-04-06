import { bot } from "../../lib/Bot"
import { getAuthorId, getLastFmUser, withHTMLmarkdown, withReply } from "../../lib/utils"
import { Command } from "../../types"

export const cmd: Command = {
    name: "scrobble",
    description: "Show Last.fm scrobbles",
    async run(ctx) {
        const user = await getLastFmUser(ctx)
        if (!user) return

        const msgToBeEdited = await ctx.reply(`<i>Getting ${user}'s info...</i>`, withHTMLmarkdown())

        const userInfo = await bot.lastfm!.getUser(user.toString())

        if (!userInfo) {
            await ctx.reply("Unable to find Last.fm username to fetch!")
            return
        }

        const result = `<b>${userInfo.name}</b> has <b>${userInfo.playcount}</b> scrobblers on <a href="${userInfo.url}">Last.fm</a>!`
        await msgToBeEdited.editText(result, { ...withHTMLmarkdown(), ...withReply(ctx) })
    },
}