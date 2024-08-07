import 'dotenv/config';
import { bot } from "./lib/Bot";
import { withHTMLmarkdown } from './lib/utils';
import { InlineQueryResultBuilder } from 'grammy';
import { wieeeee } from './const';
import { schedule } from "node-cron"

const channelId = "-1002117460117";

bot.start({
    onStart: async (botinfo) => {
        console.log(`Logged as ${botinfo.username}`)
        await bot.initCommand()

        for (const cmds of bot.commands) {
            bot.command(cmds.name, cmds.run);
        }

        bot.command("start", bot.commands.find(m => m.name == "help")!.run)
    }
})

bot.on("inline_query", async ctx => {
    let query = ctx.inlineQuery.query

    if (query.length < 1 || !query) {
        if (!(await bot.db.lastfm.has(ctx.from.id.toString()))) {
            const r = InlineQueryResultBuilder
                .article("error", "You must type the username")
                .text(
                    "meow",
                );

            return await ctx.answerInlineQuery([r])

        } else {
            query = await bot.db.lastfm.get(ctx.from.id.toString()) as string
        }
    } else if (query.toLowerCase().includes("shrug")) {
        const r = InlineQueryResultBuilder
            .article("shrug", "Shrug")
            .text("¯\\_(ツ)_/¯");

        return await ctx.answerInlineQuery([r])
    }

    const userRecenttrack = await bot.lastfm!.getRecentTracks(query)

    if (!userRecenttrack) {
        return
    }

    let result: string = `<b>${query}</b>'s Last.fm stats | <b>${userRecenttrack?.['@attr'].total || 0}</b> scrobblers.\n\n`
    if (!userRecenttrack?.track || userRecenttrack.track.length < 1) {
        result += "No tracks scrobbled."
    } else {
        for (const track of userRecenttrack.track) {
            if (track['@attr']?.nowplaying) {
                result += `<b><u>Now scrobbling:</u>  ${track.name}</b> <i>by ${track.artist['#text']}</i>\n\n`
            } else {
                result += `<b>${track.name}</b> <i>by ${track.artist['#text']}</i>\n`
            }
        }
    }

    const r = [
        InlineQueryResultBuilder
            .article("lastfm:stats", "LastFM stats")
            .text(
                result,
                withHTMLmarkdown(),
            ),
        InlineQueryResultBuilder
            .article("shrug", "Send as shrug")
            .text("¯\\_(ツ)_/¯")
    ]

    await ctx.answerInlineQuery(r)
})

// Every day at 8:00 am
schedule("0 0 8 * * *", async () => {

    const diff = wieeeee.diffNow(["days", "hours", "minutes", "seconds"])

    if (diff.hours < 0) {
        return;
    }

    const reply = `
    <b>${diff.toHuman({ listStyle: "long", unitDisplay: "short" })}</b> left until aleks and ralu become <b>truly</b> together :3
    `
    await bot.api.sendMessage(channelId, reply, withHTMLmarkdown());

})