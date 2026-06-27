import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import {
  PUBLIC_ROUTES,
  PROTECTED_PREFIXES,
  ROLE_DASHBOARD_PATH,
  ROLE_MAP,
  type RoleId,
} from "@/lib/constants";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Refresh the Supabase session
  const { supabase, user, supabaseResponse } = await updateSession(request);

  // ── Public routes ────────────────────────────────────
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isPublicRoute) {
    // If already logged in and visiting login/register, redirect to dashboard
    if (user && (pathname === "/login" || pathname === "/register")) {
      const roleData = await getUserRole(supabase, user.id);
      if (roleData) {
        const dashboardUrl = ROLE_DASHBOARD_PATH[roleData.role];
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
      }
    }
    return supabaseResponse;
  }

  // ── Protected routes — require auth ──────────────────
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Role-based access control ────────────────────────
  const roleData = await getUserRole(supabase, user.id);

  if (!roleData) {
    // User exists in auth but not in our user table — send to login
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Instructors with pending status go to /pending
  if (roleData.accountStatus === "pending") {
    if (pathname !== "/pending") {
      return NextResponse.redirect(new URL("/pending", request.url));
    }
    return supabaseResponse;
  }

  // Check if user is accessing a protected role prefix
  const accessedPrefix = PROTECTED_PREFIXES.find(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

  if (accessedPrefix) {
    const expectedPrefix = ROLE_DASHBOARD_PATH[roleData.role];
    if (accessedPrefix !== expectedPrefix) {
      // Wrong role — redirect to their own dashboard
      return NextResponse.redirect(new URL(expectedPrefix, request.url));
    }
  }

  // Root path — redirect to role dashboard
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(ROLE_DASHBOARD_PATH[roleData.role], request.url)
    );
  }

  return supabaseResponse;
}

/**
 * Lightweight role lookup for middleware — uses the provided supabase client.
 */
async function getUserRole(
  supabase: Awaited<ReturnType<typeof updateSession>>["supabase"],
  authUserId: string
): Promise<{ role: RoleId; accountStatus: string } | null> {
  const { data } = await supabase
    .from("user")
    .select(
      `
      account_status,
      role:role_id (
        role_name
      )
    `
    )
    .eq("auth_user_id", authUserId)
    .single();

  if (!data) return null;

  const role = data.role as unknown as { role_name: string };
  const roleId = ROLE_MAP[role.role_name as keyof typeof ROLE_MAP];

  return {
    role: roleId,
    accountStatus: data.account_status,
  };
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
