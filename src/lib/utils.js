import { redirect } from "@sveltejs/kit";
import { SITE_CONFIG } from "./config";
import { alerts, iconCache, usernameCache } from "./stores";
import { invalidateAll } from "$app/navigation";
import { get } from "svelte/store";

export const getItemIcon = (item_id) => {
    if (get(iconCache)[item_id]) return get(iconCache)[item_id]
    let trimmedID = item_id.replace(/^\w+:/, "");

    const img = `https://raw.githubusercontent.com/jacobsjo/mcicons/refs/heads/icons/item/${trimmedID}.png`;
    iconCache.set({...get(iconCache), [item_id]: img})
    return img
}

export const getOwnerName = async (uuid) => {
    if (get(usernameCache)[uuid]) return get(usernameCache)[uuid]
    const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${uuid}`);
    const profile = await res.json()

    usernameCache.set({...get(usernameCache), [uuid]: profile.username})
    return profile.username
}

export const rehyphenateUUID = (uuid) => {
    return uuid.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
}

export const showAlert = (message, level, duration) => {
    alerts.update(running => [...running, { message, level, duration }])
    setTimeout(() => { alerts.update(running => running.slice(1)) }, duration)
}

export const refreshSession = async (warn) => {
    await fetch("/api/profile/refreshSession")
    await invalidateAll()
    if (warn) showAlert("Refreshed session, Please try again.", "warning", 2000);
}