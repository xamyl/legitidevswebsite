import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
    const res = await fetch(`https://api.omrih.me/world/${params.world}`)
    const json = await res.json()

    if (!json) error(404, { message: `Invalid world UUID.` })

    return json
}