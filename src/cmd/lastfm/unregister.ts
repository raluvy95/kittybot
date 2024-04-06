import { Context } from "grammy";
import { Command } from "../../types";
import { bot } from "../../lib/Bot";
import { getAuthorId, withHTMLmarkdown } from "../../lib/utils";

export const cmd: Command = {
    name: "unregister",
    description: "Unregister your last.fm account. You will have to type your lastfm account after you run this command.",
    async run(ctx: Context) {
        const getauthorid = getAuthorId(ctx)
        if (!(await bot.db.lastfm.has(getauthorid))) {
            await ctx.reply("You already unregistered!")
            return
        }
        await bot.db.lastfm.delete(getauthorid)
        await ctx.reply("Successfully unregistered your last.fm account!")
        return
    },
}