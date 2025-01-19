import { SITE_CONFIG, STATUS_CHECKING_CONFIG } from "$lib/config";
import * as path from "path"
import * as fs from "fs"


// type uptime = { status: 0 "good" | 1 "warning" | 2 "bad", time: unix timestamp }
let scraperErrorFetchTries = 0;
export const STATUS_FILE_PATH = path.join(import.meta.dirname, "status.json")
let CHECKING_INTERVAL

export function main() {
    console.log("Started checkStatus.main")
    fs.stat(STATUS_FILE_PATH, (err, stat) => {
        if (err == null) return
        if (err.code == "ENOENT") {
            fs.writeFileSync(STATUS_FILE_PATH, JSON.stringify(STATUS_CHECKING_CONFIG.DEFAULT_CONTENT))
            return
        }
        console.error(err.code)
        return
    })

    if (CHECKING_INTERVAL) {
        clearInterval(CHECKING_INTERVAL)
    }

    CHECKING_INTERVAL = setInterval(async () => {
        console.log(`Checking status... (${Date.now()})`)
        let content = JSON.parse(fs.readFileSync(STATUS_FILE_PATH), 'utf-8')
        if (content.api.length > STATUS_CHECKING_CONFIG.MAX_LENGTH_UNTIL_DATA_REMOVAL) content.api.shift()
        if (content.scraper.length > STATUS_CHECKING_CONFIG.MAX_LENGTH_UNTIL_DATA_REMOVAL) content.scraper.shift()
        const apiStatus = await checkAPIStatus()
        content.api.push(apiStatus)

        const scraperStatus = await checkScraperStatus()
        content.scraper.push(scraperStatus)

        fs.writeFileSync(STATUS_FILE_PATH, JSON.stringify(content))

        console.log(`Successfully checked! (${Date.now()})`)
    }, STATUS_CHECKING_CONFIG.MILLISECONDS_TIL_NEXT_FETCH)
}

async function checkAPIStatus() {
    const timeBeforeFetch = performance.now()
    const res = await fetch(`${SITE_CONFIG.API_ROOT}`)
    const timeAfterFetch = performance.now()

    let uptime = { status: 0, time: Date.now() }

    // If it errors 😱
    if (res.status >= 400) {
        uptime.status = 2
        return uptime 
    }

    // If it takes a long time 🟡
    if (timeAfterFetch - timeBeforeFetch > STATUS_CHECKING_CONFIG.API_WARNING_TIME) {
        uptime.status = 1
        return uptime
    }

    // If its fine 🟢
    return uptime
}

async function checkScraperStatus() {
	const scraperUptime = JSON.parse(fs.readFileSync(STATUS_FILE_PATH), "utf8").scraper;
	const res = await fetch(`${SITE_CONFIG.API_ROOT}top/1`);
    const current_last_scraped = (await res.json())[0].last_scraped;
    const last_status = scraperUptime[scraperUptime.length - 1];

    let uptime = { status: 0, last_scraped: current_last_scraped, fetchTries: scraperErrorFetchTries, time: Date.now() }

    // If theres no last scraped entry on status data 🟢
    if (!last_status) return uptime
    // If db last scraped does not equal our last scraped 🟢
    if (current_last_scraped != last_status.last_scraped) {
        scraperErrorFetchTries = 0
        return uptime
    }
    if (current_last_scraped == last_status.last_scraped) {
        scraperErrorFetchTries++
        // If db last scraped is equal to our last scraped, maybe we checked too early 🟡
        if (scraperErrorFetchTries == 1) {
            uptime.status = 1
            uptime.fetchTries = scraperErrorFetchTries
        // If db last scraped still is equal to our last scraped 😱
        } else if (scraperErrorFetchTries > 1) {
            uptime.status = 2
            uptime.fetchTries = scraperErrorFetchTries
        }
        return uptime
    }
}