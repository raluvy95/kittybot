import { DateTime } from "luxon"

export const commandDir = "./src/cmd"
export const wieeeee = DateTime.fromISO("2024-05-03T01:30:00.000+03:00")
export interface UserStorage {
    lastfmAccount: string | undefined,
}