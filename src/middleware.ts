import { NextResponse } from "next/server";
import { verifyJwt } from "./lib/auth";

export async function middleware(req: { cookies: { get: (arg0: string) => { (): any; new(): any; value: any; }; }; nextUrl: { pathname: string; }; url: string | URL | undefined; }) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const valid = await verifyJwt(token);
    if (!valid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
