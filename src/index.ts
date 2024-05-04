import 'dotenv/config';
import { bot } from "./lib/Bot";
import { withHTMLmarkdown } from './lib/utils';
import { InlineQueryResultBuilder } from 'grammy';


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
    if ([5009218993, 5990130472].includes(ctx.from.id)) {
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

        const r = [InlineQueryResultBuilder
            .article("lastfm:stats", "LastFM stats")
            .text(
                result,
                withHTMLmarkdown(),
            )]

        await ctx.answerInlineQuery(r)
    } else {
        return
    }
})

