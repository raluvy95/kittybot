import { Context } from "grammy";
import { Command } from "../../types";

export const cmd: Command = {
    name: "shrug",
    description: "I miss /shrug command from discord. Inline reply exists",
    async run(ctx: Context) {
        await ctx.reply("¯\\_(ツ)_/¯")
    },
}