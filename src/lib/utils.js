let iconCache = {}

const SPECIAL_CASES_getItemIcon_LOOKUP = {
    "calibrated_sculk_sensor": "0_2",
    "chain_command_block": "0_10",
    "command_block": "0_10",
    "crimson_hyphae": "0_10",
    "crimson_stem": "0_10",
    "magma_block": "0_8",
    "prismarine": "0_300",
    "prismarine_slab": "0_300",
    "prismarine_stairs": "0_300",
    "prismarine_wall": "0_300",
}
export const getItemIcon = (item_id) => {
    if (iconCache[item_id]) return iconCache[item_id]
    let trimmedID = item_id.replace(/^\w+:/, "");

    if (trimmedID in SPECIAL_CASES_getItemIcon_LOOKUP) {
        const img = `https://raw.githubusercontent.com/edayot/renders/refs/heads/renders/resourcepack/assets/minecraft/textures/render/items/${trimmedID}/${SPECIAL_CASES_getItemIcon_LOOKUP[trimmedID]}.png`;
        iconCache[item_id] = img
        return img
    }

    const img = `https://raw.githubusercontent.com/edayot/renders/refs/heads/renders/resourcepack/assets/minecraft/textures/render/items/${trimmedID}.png`;
    iconCache[item_id] = img
    return img
}

export const getOwnerName = async (uuid) => {
    const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${uuid}`);
    const profile = await res.json()

    return profile.username
}