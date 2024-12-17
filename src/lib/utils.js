let iconCache = {}

// const SPECIAL_CASES_getItemIcon_LOOKUP = {
//     "gold_block": "Block_of_Gold",
//     "quartz_block": "Block_of_Quartz",
//     "lapiz_block": "Block_of_Lapiz",
//     "emerald_block": "Block_of_Emerald",
//     "bamboo_block": "Block_of_Bamboo",
// }
export const getItemIcon = async (item_id) => {
    if (iconCache[item_id]) {
        return iconCache[item_id]
    }
    let final = item_id.replace(/^\w+:/, "").split("_");
    final = final
        .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join("_")
        .replace(/(?:_|^)(on|a|of|with)(?=_|$)/gi, (match) => match.toLowerCase())
        .replace(/(?:_|^)tnt(?=_|$)/gi, (match) => match.toUpperCase());

    const pngUrl = `https://minecraft.wiki/w/Special:FilePath/${final}.png`;
    const pngResponse = await fetch(pngUrl);

    if (pngResponse.ok) {
        iconCache[item_id] = pngResponse.url
        return pngResponse.url;
    }

    const gifUrl = `https://minecraft.wiki/w/Special:FilePath/${final}.gif`;
    const gifResponse = await fetch(gifUrl);

    if (gifResponse.ok) {
        iconCache[item_id] = gifResponse.url
        return gifResponse.url;
    }

    throw new SyntaxError(`'${item_id}' is not a valid item id.`);
}

export const getOwnerName = async (uuid) => {
    const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${uuid}`);
    const profile = await res.json()

    return profile.username
}