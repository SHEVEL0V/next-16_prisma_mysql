/** @format */

import { NextResponse, type NextRequest } from "next/server";
import { decrypt } from "./utils/session";

const PROTECTED_ROUTES = new Set(["/user", "/"]);
const PUBLIC_ROUTES = new Set(["/signin", "/signup"]);

export async function proxy(req: NextRequest) {
	const { pathname, origin } = req.nextUrl;

	const isPublicRoute = PUBLIC_ROUTES.has(pathname);

	const isProtectedRoute =
		PROTECTED_ROUTES.has(pathname) || pathname.startsWith("/user/");

	if (!isPublicRoute && !isProtectedRoute) {
		return NextResponse.next();
	}

	const cookie = req.cookies.get("session")?.value;
	const session = cookie ? await decrypt(cookie) : null;
	const isAuthenticated = !!session?.name;

	if (isAuthenticated) {
		if (isPublicRoute || pathname === "/") {
			return NextResponse.redirect(`${origin}/user/${session.name}/menu`);
		}
		return NextResponse.next();
	}

	if (isProtectedRoute && !isAuthenticated) {
		if (pathname === "/") {
			return NextResponse.redirect(`${origin}/signin`);
		}
		return NextResponse.redirect(`${origin}/signin`);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
