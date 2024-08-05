import { DateTime } from "luxon"

export const wieeeee = DateTime.fromISO("2024-08-23T19:25:00.000+03:00")
export const commandDir = "./src/cmd"
export interface UserStorage {
    lastfmAccount: string | undefined,
}
