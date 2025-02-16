import "dotenv/config"
import { SITE_CONFIG } from "$lib/config";
import { redirect } from "@sveltejs/kit";

const AUTH_REQ_URL =
	`https://mc-auth.com/oAuth2/authorize` +
	`?client_id=${SITE_CONFIG.MCAUTH.CLIENT_ID}` +
	`&redirect_uri=${encodeURIComponent(SITE_CONFIG.MCAUTH.REDIRECT_URI)}` +
	`&scope=profile` +
	`&response_type=code`;

export const load = async ({ url, cookies }) => {
    const RAW_SEARCH_PARAMS = url.href.split("?")[1]
    const SEARCH_PARAMS = new URLSearchParams(RAW_SEARCH_PARAMS)

    // Client has already logged in.
    if (cookies.get("MCAUTH_ACCESS_TOKEN")) return redirect(302, "/profile")

    // Client hasnt logged in yet
    if (!SEARCH_PARAMS.get("code")) return redirect(302, AUTH_REQ_URL);
    
    // Client has redirected. We got the code.
    const TOKEN_POST_BODY = {
        client_id: SITE_CONFIG.MCAUTH.CLIENT_ID,
        client_secret: process.env.MCAUTH_CLIENT_SECRET,
        code: SEARCH_PARAMS.get("code"),
        redirect_uri: SITE_CONFIG.MCAUTH.REDIRECT_URI,
        grant_type: "authorization_code"
    }

    // pwease give me the access token
    const res = await fetch("https://mc-auth.com/oAuth2/token", {
		method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(TOKEN_POST_BODY)
	});

    const body = await res.json()
    cookies.set("MCAUTH_ACCESS_TOKEN", body.access_token, { path: "/" })
    // Client has successfully logged in.

    redirect(302, `/profile`);
}