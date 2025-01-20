export const load = async ({ fetch }) => {
    const res = await fetch(`/uptime`)
    const uptime = await res.json()
    return {
        page: {
            title: "Meet The Team"
        },
        uptimes: uptime
    }
}