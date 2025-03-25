import { SITE_CONFIG } from '$lib/config.js';
import { getProfileData } from '$lib/utils.js';

export const load = async ({ cookies, fetch }) => {
	if (cookies.get("profile.uuid")) {
		const checkSessionRes = await fetch(`${SITE_CONFIG.API_ROOT}profile/check-session`, {
			method: "POST",
			headers: { "Session-Token": cookies.get("authorization.sessionToken") },
			body: JSON.stringify({ profile_uuid: cookies.get("profile.uuid") }),
		});

		const refreshSession = async () => {
			const refreshRes = await fetch(`${SITE_CONFIG.API_ROOT}profile/refresh`, {
				method: "POST",
				headers: { "Refresh-Token": cookies.get("authorization.refreshToken") },
				body: JSON.stringify({ profile_uuid: cookies.get("profile.uuid") }),
			});

			if (!refreshRes.ok) return false
			
			const { sessionToken, refreshToken } = await refreshRes.json()
			cookies.set("authorization.sessionToken", sessionToken, { path: "/" })
			cookies.set("authorization.refreshToken", refreshToken, { path: "/" })

			return true
		}

		if (!checkSessionRes.ok) {
			const refreshed = await refreshSession()
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
			const refreshed = await refreshSession();
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
