import { SITE_CONFIG } from '$lib/config.js';
import { error } from '@sveltejs/kit'

export const load = async ({ params, fetch }) => {
    const worldDataRes = await fetch(`${SITE_CONFIG.API_ROOT}world/${params.world} `)
    if (!worldDataRes.ok) error(404, { message: `Invalid world UUID.` })
    const worldData = await worldDataRes.json();

    return {
        page: {
            title: worldData.name,
        },
        world: worldData
    }
}
