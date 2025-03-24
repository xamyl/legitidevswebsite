import { invalidateAll } from '$app/navigation';
import { redirect } from '@sveltejs/kit'

export const load = ({ cookies }) => {
    cookies.set("profile.uuid", "", { path: "/"} )
    cookies.set("authorization.sessionToken", "", { path: "/"} )
    cookies.set("authorization.refreshToken", "", { path: "/"} )
    return redirect(302, "/");
}