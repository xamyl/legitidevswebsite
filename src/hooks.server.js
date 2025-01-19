import * as checkStatus from "$lib/server/checkStatus/index.js";
import { json } from "@sveltejs/kit";
import * as fs from "fs"

export async function init() {
    checkStatus.main()
}

export async function handle({ event, resolve }) {
    if (event.url.pathname == "/uptime") {
        const content = JSON.parse(fs.readFileSync(checkStatus.STATUS_FILE_PATH, "utf-8"))
        return new json(content)
    }

    const response = await resolve(event)
    return response;
}