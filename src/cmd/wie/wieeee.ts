import { Context } from "grammy";
import { Command } from "../../types";
import { bot } from "../../lib/Bot";
import { getAuthorId, withHTMLmarkdown } from "../../lib/utils";
import { wieeeee } from "../../const";

export const cmd: Command = {
    name: "wieeeee",
    description: ":3",
    async run(ctx: Context) {
        const diff = wieeeee.diffNow(["days", "hours", "minutes", "seconds"])

        const reply = `
        <b>${diff.toHuman({ listStyle: "long", unitDisplay: "short" })}</b> left until aleks and ralu become <b>truly</b> together :3
        `
        ctx.reply(reply, withHTMLmarkdown())
    },
}