export const load = async ({ params }) => {
    const res = await fetch(`https://api.omrih.me/world/${params.world}`)
    const json = await res.json()

    if (!json) return {
        name: "wuh u doin",
        description: "give me a world not some random thing",
        world_uuid: "this aint valid",
    }

    return json
}