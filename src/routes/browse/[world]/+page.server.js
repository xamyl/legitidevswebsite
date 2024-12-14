import { error } from '@sveltejs/kit'
import { getItemIcon } from '$lib/getItemIcon.js';

export const load = async ({ params }) => {
    const res = await fetch(`https://api.omrih.me/world/${params.world}`)
    let worldData = await res.json();
    if (!worldData) error(404, { message: `Invalid world UUID.` })

    return worldData
}