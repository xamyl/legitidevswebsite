import { SITE_CONFIG } from '$lib/config.js';
export const load = async ({ cookies, fetch }) => {
	if (cookies.get("profile.uuid")) {
		const checkSessionRes = await fetch(`${SITE_CONFIG.API_ROOT}profile/check-session`, {
			method: "POST",
			headers: { "Session-Token": cookies.get("authorization.sessionToken") },
			body: JSON.stringify({ profile_uuid: cookies.get("profile.uuid") }),
		});

		if (!checkSessionRes.ok) {
			const refresed = await (await fetch("/api/profile/refreshSession")).json()
			if (!refreshed) {
				cookies.set("authorization.sessionToken", "", { path: "/" });
				cookies.set("authorization.refreshToken", "", { path: "/" });
				cookies.set("profile.uuid", "", { path: "/" });
				return {
					profile: {},
					cookies: {},
				};
			}
		}

		const isValid = await checkSessionRes.json();
		if (!isValid.success) {
			const refresed = await (await fetch("/api/profile/refreshSession")).json()
			if (!refreshed) {
				cookies.set("authorization.sessionToken", "", { path: "/" });
				cookies.set("authorization.refreshToken", "", { path: "/" });
				cookies.set("profile.uuid", "", { path: "/" });
				return {
					profile: {},
					cookies: {},
				};
			}
		}

		return {
			cookies: {
				profile: { uuid: cookies.get("profile.uuid") },
				authorization: {
					sessionToken: cookies.get("authorization.sessionToken"),
					refreshToken: cookies.get("authorization.refreshToken"),
				},
			},
		};
	}

	return {
		cookies: {},
	};
};
