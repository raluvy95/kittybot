import { withReply } from "../../lib/utils";
import { Command } from "../../types";

export const cmd: Command = {
    name: "meow",
    description: "meow",
    ownerOnly: true,
    async run(ctx) {
        ctx.reply("meow", withReply(ctx));
    },
}