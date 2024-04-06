import { Bot, Context } from "grammy";
import { Command, LastFMUser } from "../types";
import { readdir } from "fs/promises";
import { LastFM } from "./LastFM";
import { autoRetry } from "@grammyjs/auto-retry";
import { limit } from "@grammyjs/ratelimiter";
import { QuickDB } from "quick.db";
import { UserStorage } from "../const";
import { hydrate, HydrateFlavor } from "@grammyjs/hydrate";
import { getAuthorId } from "./utils";

const databases = {
    lastfm: new QuickDB<string>({
        filePath: ".db.sqlite3",
        table: "lastfm"
    })
}
export type Ctx = HydrateFlavor<Context>;

export class MeowBot extends Bot<Ctx> {
    public commands: Command[]
    public lastfm: LastFM | undefined
    public db = databases;
    private lastfmUserCache: Map<string, { user: LastFMUser, time: number }>;
    constructor() {
        super(process.env.TELEGRAM_BOT!)
        this.commands = []
        if (process.env.NO_LASTFM) {
            this.lastfm = new LastFM()
        }
        this.lastfmUserCache = new Map()
        this.catch = (e) => {
            console.error("yabba yabba")
            console.error(e);
        }

        this.api.config.use(autoRetry())

        this.use(limit({
            limit: 3,
            onLimitExceeded: async (ctx, _) => {
                await ctx.reply("Calm down!")
            },
        }))

        this.use(hydrate())
    }

    public setLastFmUserCache(name: string, lastfmuser: LastFMUser) {
        this.lastfmUserCache.set(name, { user: lastfmuser, time: Date.now() })
    }

    public getLastFmUserCache(name: string) {
        return this.lastfmUserCache.get(name)
    }
    async initCommand() {
        const commandDir = "./src/cmd"
        const dir = await readdir(commandDir);
        for (const modules of dir) {
            if (modules == "lastfm" && !process.env.NO_LASTFM) {
                continue
            }
            const mod = await readdir(`${commandDir}/${modules}`)
            for (const cmds of mod) {
                const cmd = (await import(`${__dirname}/../../${commandDir}/${modules}/${cmds}`)).cmd as Command
                this.addCommand({ ...cmd, module: modules });
            }
        }
    }

    addCommand(cmd: Command) {
        if (this.commands.find(x => x.name == cmd.name)) {
            console.error("Cannot add command that has same name as existing command")
            return;
        }
        this.commands.push(cmd);
        console.info(`Added ${cmd.name} command`)
    }

    async runCommand(name: string, ctx: Ctx) {
        const command = this.commands.find(x => x.name == name);
        if (!command) {
            return;
        }
        console.log(getAuthorId(ctx))

        await command.run(ctx);
    }

    removeCommand(name: string) {
        const found = this.commands.findIndex(x => x.name == name)
        if (found > -1) {
            this.commands.splice(found, 1);
        } else {
            console.error("Already removed");
        }
    }

}

export const bot = new MeowBot();