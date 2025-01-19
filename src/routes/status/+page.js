export const load = async ({ fetch }) => {
    const res = await fetch(`/uptime`)
    const uptime = await res.json()
    return {
        page: {
            title: "Status"
        },
        uptimes: uptime
    }
}