import { randomChar } from "../../lib/char";
import { Command } from "../../types";

export const cmd: Command = {
    name: "randomchar",
    description: "Randomize random unicode chars",
    ownerOnly: true,
    async run(ctx) {
        let arg: number;
        if (!ctx.match) {
            arg = 32;
        } else {
            arg = Number(ctx.match)
        }
        if (Number.isNaN(arg)) {
            arg = 32;
        } else if (arg > 500) {
            arg = 500;
        } else if (arg < 1) {
            arg = 1;
        }
        const result = randomChar(arg)
        ctx.reply(result);
    },
}