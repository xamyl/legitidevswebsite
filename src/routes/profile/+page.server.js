export const load = async ({ cookies }) => {
    if (cookies.get("MCAUTH_ACCESS_TOKEN")) {
        // console.log("Client is already logged in.")
        const profile_res = await fetch("https://mc-auth.com/api/v2/profile", {
            headers: {
                Authorization: `Bearer ${cookies.get("MCAUTH_ACCESS_TOKEN")}`
            }
        });
        const profile_data = await profile_res.json()
        return {
            profile_data: profile_data
        }
    }
}