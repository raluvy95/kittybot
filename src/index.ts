import 'dotenv/config';
import { bot } from "./lib/Bot";
import { schedule } from "node-cron"
import { wieeeee } from './const';
import { withHTMLmarkdown } from './lib/utils';

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
// Every day at 8:00 am
schedule("* 0 8 * * *", async () => {

    const diff = wieeeee.diffNow(["days", "hours", "minutes", "seconds"])

    const reply = `
    <b>${diff.toHuman({ listStyle: "long", unitDisplay: "short" })}</b> left until aleks and ralu become <b>truly</b> together :3
    `
    await bot.api.sendMessage(channelId, reply, withHTMLmarkdown());

}, { timezone: "Europe/Berlin" })