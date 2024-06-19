import { Context, InputFile } from "grammy";
import { Command } from "../../types";

export const cmd: Command = {
    name: "cat",
    description: "Meow :3",
    async run(ctx: Context) {
        let blob = await fetch("https://cataas.com/cat").then(r => r.blob())
        const buffer = await new Response(blob).arrayBuffer();

        await ctx.replyWithPhoto(new InputFile(new Uint8Array(buffer)))
    },
}