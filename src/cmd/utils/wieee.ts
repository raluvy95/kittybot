
import { Context } from "grammy";
import { Command } from "../../types";
import { withHTMLmarkdown } from "../../lib/utils";
import { wieeeee } from "../../const";

export const cmd: Command = {
    name: "wieee",
    description: ":3",
    async run(ctx: Context) {
        const diff = wieeeee.diffNow(["days", "hours", "minutes", "seconds"])
        if (diff.hours < 0) {
            return
        }

        const reply = `
        <b>${diff.toHuman({ listStyle: "long", unitDisplay: "short" })}</b> left until aleks and ralu become <b>truly</b> together :3
        `
        await ctx.reply(reply, withHTMLmarkdown())
    },
}