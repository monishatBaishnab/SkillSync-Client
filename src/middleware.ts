import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "./services/auth";

const ROLE_BASED_ROUTES: Record<string, RegExp[]> = {
  TEACHER: [/^\/profile/],
  ADMIN: [/^\/dashboard/, /^\/profile/],
};

type Role = keyof typeof ROLE_BASED_ROUTES;
type User = { role?: Role; email?: string } | null;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user: User = await getCurrentUser();

  if (!user?.role) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  const normalizedRole = user.role?.toUpperCase() as Role;
  const roleRoutes = ROLE_BASED_ROUTES[normalizedRole];

  if (roleRoutes?.some((route) => route.test(pathname))) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/profile", "/profile/:path*", "/dashboard", "/dashboard/:path*"],
};
