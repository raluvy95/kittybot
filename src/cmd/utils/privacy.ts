import { withHTMLmarkdown } from "../../lib/utils";
import { Command } from "../../types";

export const cmd: Command = {
    name: "privacy",
    description: "Privacy Policy",
    async run(ctx) {
        ctx.reply(`<b>Privacy Policy</b>

We don't collect any required data and we don't sell your personal information, your messages and the data you provided while using our commands.
We only store your user id and your Last.fm name in our database when you are using /register command (so therefore opt-in). You can delete your data on request by using /unregister

This bot is <a href="https://github.com/raluvy95/kittybot">open source</a> and has privacy mode enabled, so no hidden data collection at all.`, withHTMLmarkdown());
    },
}