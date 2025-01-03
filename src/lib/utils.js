let iconCache = {}

export const getItemIcon = (item_id) => {
    if (iconCache[item_id]) return iconCache[item_id]
    let trimmedID = item_id.replace(/^\w+:/, "");

    const img = `https://raw.githubusercontent.com/jacobsjo/mcicons/refs/heads/icons/item/${trimmedID}.png`;
    iconCache[item_id] = img
    return img
}

export const getOwnerName = async (uuid) => {
    const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${uuid}`);
    const profile = await res.json()

    return profile.username
}