import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
    const worldDataRes = await fetch(`https://api.legitimoose.net/world/${params.world} `)
    let worldData = await worldDataRes.json();
    if (!worldData) error(404, { message: `Invalid world UUID.` })

    return {
        page: {
            title: worldData.name,
        },
        world: worldData
    }
}
