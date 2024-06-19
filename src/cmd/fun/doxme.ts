import { Context } from "grammy";
import { Command } from "../../types";

export const cmd: Command = {
    name: "doxme",
    description: "Bot will attempt to dox you",
    async run(ctx: Context) {
        const lat = Math.floor(Math.random() * (90 - -90 + 1)) + -90
        const lot = Math.floor(Math.random() * (180 - -180 + 1)) + -180
        await ctx.replyWithLocation(lat, lot);
    },
}