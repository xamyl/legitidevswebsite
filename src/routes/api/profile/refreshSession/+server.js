import { SITE_CONFIG } from '$lib/config';
import { json, redirect } from '@sveltejs/kit';

export const GET = async ({ url, cookies }) => {
    if (["authorization.sessionToken", "authorization.refreshToken", "profile.uuid"].some(key => !cookies.get(key))) {
        return redirect(302, "/profile/login")
    }

    const refreshRes = await fetch(`${SITE_CONFIG.API_ROOT}profile/refresh`, {
		method: "POST",
		headers: { "Refresh-Token": cookies.get("authorization.refreshToken") },
		body: JSON.stringify({ profile_uuid: cookies.get("profile.uuid") }),
	});

	if (!refreshRes.ok) return redirect(302, "api/profile/login")
	
	const { sessionToken, refreshToken } = await refreshRes.json()
	cookies.set("authorization.sessionToken", sessionToken, { path: "/" })
	cookies.set("authorization.refreshToken", refreshToken, { path: "/" })

	return json({ success: true })
}