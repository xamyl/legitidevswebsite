import { redirect } from '@sveltejs/kit'

export const GET = ({ cookies }) => {
    cookies.set("profile.uuid", "", { path: "/"} )
    cookies.set("authorization.sessionToken", "", { path: "/"} )
    cookies.set("authorization.refreshToken", "", { path: "/"} )
    return redirect(302, "/");
}