import { getProfileData } from '$lib/utils.js';

export const load = async ({ cookies }) => {
	if (cookies.get("MCAUTH_ACCESS_TOKEN")) {
		return {
			profile_data: await getProfileData(cookies.get("MCAUTH_ACCESS_TOKEN")),
		};
	}
};
