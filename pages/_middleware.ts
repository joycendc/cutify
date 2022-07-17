import { NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/library", "/plans"];

export default function middleware(req) {
  if (signedInPages.find((page) => page === req.nextUrl.pathname)) {
    const token = req.cookies.CUTIFY_ACCESS_TOKEN;

    if (!token) return NextResponse.redirect("/signin");
  }
}
