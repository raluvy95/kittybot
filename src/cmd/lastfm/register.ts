import { Context } from "grammy";
import { Command } from "../../types";
import { bot } from "../../lib/Bot";
import { getAuthorId, withHTMLmarkdown } from "../../lib/utils";

export const cmd: Command = {
    name: "register",
    description: "Register your Last.fm username to save typing out your username as an argument",
    async run(ctx: Context) {
        const getauthorid = getAuthorId(ctx)
        if (!ctx.match) {
            await ctx.reply("Please input your Last.fm username to register!")
            return
        }
        if (await bot.db.lastfm.has(getauthorid) && !ctx.match?.includes("--force")) {
            await ctx.reply("Already registered! Maybe put '--force' if you switch to different last.fm")
            return
        } else {
            const lastfmuser = ctx.match!.toString().replace("--force", '')
            await bot.db.lastfm.set(getauthorid, lastfmuser)
            await ctx.reply(`Successfully set your last.fm account! - <b>${lastfmuser}</b>\nYou can use my lastfm commands without having to input your lastfm username!`, withHTMLmarkdown())
            return
        }
    },
}