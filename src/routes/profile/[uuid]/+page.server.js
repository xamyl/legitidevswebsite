import { getOwnerName } from '$lib/utils.js'
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    if (params.uuid.length <= 16) return error(404, { message: "Player does not exist." })
    const ownerName = await getOwnerName(params.uuid);
    if (!ownerName) return error(404, { message: "Player does not exist." })
    return {
        page: { title: ownerName },
        profileOwnerUUID: params.uuid,
        profileOwnerName: ownerName
    }
}