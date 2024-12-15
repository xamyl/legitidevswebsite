import { error } from '@sveltejs/kit'
import { getItemIcon } from '$lib/getItemIcon.js';

export const load = async ({ params }) => {
    const worldDataRes = await fetch(`https://api.omrih.me/world/${params.world}`)
    let worldData = await worldDataRes.json();
    if (!worldData) error(404, { message: `Invalid world UUID.` })

    return worldData
}