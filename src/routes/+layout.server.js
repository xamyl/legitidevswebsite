import { getProfileData } from '$lib/utils.js';

export const load = async ({ cookies }) => {
	if (cookies.get("MCAUTH_ACCESS_TOKEN")) {
		const profile_data = await getProfileData(cookies.get("MCAUTH_ACCESS_TOKEN"))
		if (profile_data.error) {
			// Token expired.
			cookies.set("MCAUTH_ACCESS_TOKEN", "", { path: "/" });
			profile_data = null;
		};

		return {
			profile_data: profile_data,
			cookies: {
				MCAUTH_ACCESS_TOKEN: cookies.get("MCAUTH_ACCESS_TOKEN")
			}
		};
	}
};
