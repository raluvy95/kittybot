import { Context } from "grammy";
import { ParseMode } from "grammy/types";
import { bot } from "./Bot";

export function withReply(ctx: Context) {
    return { reply_parameters: { message_id: ctx.msg?.message_id! } }
}

export function withHTMLmarkdown() {
    return { parse_mode: "HTML" as ParseMode }
}

export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getAuthorId(ctx: Context) {
    return (ctx.message?.from.id || ctx.msg?.from?.id)!.toString()
}

export async function getLastFmUser(ctx: Context) {
    let user = ctx.match

    if (!user) {
        if (await bot.db.lastfm.has(getAuthorId(ctx))) {
            user = (await bot.db.lastfm.get(getAuthorId(ctx)))!
        } else {
            await ctx.reply(`Looks like you don't have Last.fm username saved!\nPlease type /register <your Last.fm username here>\nOr insert username in /track <username> you want to fetch their recent tracks`, withReply(ctx))
            return null
        }
    }
    return user
}