import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "./lib/types/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname === "/account" && !session) {
    // Redirect to the absolute login URL
    return NextResponse.redirect(new URL("/auth", req.url));
  } else if (req.nextUrl.pathname === "/auth" && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/auth", "/account"],
};
